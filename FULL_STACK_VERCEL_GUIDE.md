# Vercel Deployment Guide - Full Stack (Frontend + Backend)

This guide explains how to deploy both your Next.js frontend and FastAPI backend to Vercel as a unified application.

## Overview

Vercel specializes in frontend deployments, but it also supports backend functions through Serverless Functions. To deploy your full-stack application to Vercel, we need to convert your FastAPI backend into Vercel-compatible API routes.

## Approach

We'll create a hybrid approach where:
1. The Next.js frontend remains as-is
2. The FastAPI backend is converted to Vercel API routes
3. Both are deployed together as a single application

## Step 1: Create API Routes for Vercel

We need to convert your FastAPI endpoints to Next.js API routes. Create the following directory structure:

```
api/
├── auth/
│   ├── [...auth].ts          # NextAuth endpoints
├── v1/
│   ├── auth/
│   │   ├── login.ts
│   │   ├── register.ts
│   │   └── [...nextauth].ts  # NextAuth API routes
│   ├── users/
│   │   ├── index.ts          # GET /users
│   │   ├── [id].ts           # GET /users/{id}
│   │   └── create.ts         # POST /users
│   ├── projects/
│   │   ├── index.ts          # GET /projects
│   │   ├── [id].ts           # GET /projects/{id}
│   │   └── create.ts         # POST /projects
│   ├── bookings/
│   │   ├── index.ts
│   │   └── create.ts
│   ├── payments/
│   │   ├── index.ts
│   │   └── create.ts
│   └── health.ts             # Health check endpoint
```

## Step 2: Convert FastAPI Logic to API Routes

For each endpoint, we'll need to convert the FastAPI logic to Next.js API routes. Here's an example of how to convert one endpoint:

### Example: Converting the health check endpoint

Create `pages/api/v1/health.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Perform any necessary health checks here
    // For example, check database connection, etc.
    
    res.status(200).json({ 
      status: 'healthy', 
      service: 'Kings Builder Backend',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      service: 'Kings Builder Backend',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

## Step 3: Update Database Connection

Since Vercel Functions are serverless, we need to ensure database connections are properly managed. Update your database connection to work in a serverless environment:

Create `lib/database.ts`:

```typescript
import { Pool } from 'pg'; // For PostgreSQL
// OR
import { createConnection } from 'mysql2/promise'; // For MySQL
// OR
import { PrismaClient } from '@prisma/client'; // For Prisma

// For PostgreSQL with connection pooling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

export { pool };

// For Prisma (recommended approach)
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
```

## Step 4: Update Environment Variables

Update your `.env.local` to include all necessary environment variables for Vercel:

```env
NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api/v1
NEXT_PUBLIC_APP_NAME=Kings Builder Real Estate Management System
NEXT_PUBLIC_COMPANY_NAME=Kings Builder
NEXT_PUBLIC_SUPPORT_EMAIL=support@kingsbuilder.com

# Backend configuration
DATABASE_URL=your_database_url_here
SECRET_KEY=your_secret_key_for_production
MASTER_ADMIN_USERNAME=scitforte
MASTER_ADMIN_EMAIL=admin@scitforte.com
MASTER_ADMIN_PASSWORD=your_secure_password
```

## Step 5: Update Next.js Configuration

Update your `next.config.js` to remove any development-specific rewrites:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable server components if needed
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  }
};

module.exports = nextConfig;
```

## Step 6: Update API Service

Update your `services/api.ts` to work with the new API routes:

```typescript
import axios from 'axios';

// Use relative paths in the browser, absolute paths during SSR
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    return '';
  }
  // Server environment
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || `${getBaseUrl()}/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Rest of the interceptor code remains the same
// ...
```

## Step 7: Create a Build Script

Add a build script to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "vercel-build": "next build"
  }
}
```

## Step 8: Deploy to Vercel

1. Push your changes to GitHub
2. Go to Vercel dashboard and import your project
3. Set environment variables in Vercel dashboard
4. Deploy

## Important Considerations

1. **Serverless Limitations**: Serverless functions have timeouts (typically 10 seconds on Hobby plan, up to 900 seconds on Pro). Make sure your API operations complete within these limits.

2. **Cold Starts**: Serverless functions may have cold start delays. Consider this for performance-critical operations.

3. **Database Connections**: Use connection pooling and properly manage database connections in serverless environment.

4. **Authentication**: Ensure your JWT authentication works properly with the new setup.

5. **File Uploads**: If you have file upload functionality, consider using Vercel Blob Storage or a third-party service like AWS S3.

## Alternative Approach: Separate Deployments

If converting the backend proves too complex, consider:

1. Deploy the backend to a service like Render, Railway, or AWS
2. Deploy the frontend to Vercel
3. Configure the frontend to connect to the externally hosted backend

This approach is often simpler and more reliable, especially for complex backends.