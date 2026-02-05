# Kings Builder - Vercel Full Stack Setup

This document outlines how to adapt your existing FastAPI backend to work with Vercel's serverless functions while keeping your Next.js frontend.

## Overview

Instead of converting your entire FastAPI backend, we'll create a bridge that allows your existing backend logic to work in Vercel's serverless environment.

## Step 1: Install Required Dependencies

First, install dependencies needed for serverless deployment:

```bash
npm install @vercel/node
```

## Step 2: Create API Routes Directory

Create the following directory structure to mirror your API endpoints:

```
api/
├── v1/
│   ├── auth/
│   │   ├── login.ts
│   │   └── register.ts
│   ├── users/
│   │   ├── index.ts
│   │   └── [id].ts
│   ├── projects/
│   │   ├── index.ts
│   │   └── [id].ts
│   ├── bookings/
│   │   ├── index.ts
│   │   └── create.ts
│   ├── customers/
│   │   ├── index.ts
│   │   └── create.ts
│   ├── inventory/
│   │   ├── index.ts
│   │   └── create.ts
│   ├── payments/
│   │   ├── index.ts
│   │   └── create.ts
│   └── health.ts
```

## Step 3: Example API Route Implementation

Here's how to implement one of your API routes. Create `pages/api/v1/health.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Health check logic
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

## Step 4: Database Connection for Serverless

Create `lib/db.ts` for database operations:

```typescript
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances in development
declare const global: typeof global & {
  prisma?: PrismaClient;
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// For PostgreSQL connection pooling in serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export { pool };
```

## Step 5: Update Environment Variables

Update your `vercel.json` to include build-time environment variables:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "withTurbo": false
      }
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "/api/v1"
  }
}
```

## Step 6: Update API Service for Vercel Compatibility

Update your `services/api.ts` to work with Vercel:

```typescript
import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Browser environment - relative path works for same-origin API routes
    return '';
  }
  // Server environment - use environment variable
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/v1`
    : process.env.NEXT_PUBLIC_API_URL || '/api/v1';
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increase timeout for serverless functions
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status}`);
    return response;
  },
  async (error) => {
    console.error('API Response Error:', error);
    
    // Handle unauthorized access
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

## Step 7: Create a Migration Script

Create `scripts/migrate.ts` to handle database migrations:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database migration...');
  
  // Add your migration logic here
  // This would typically involve creating tables, seeding data, etc.
  
  console.log('Database migration completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## Step 8: Update Package.json Scripts

Update your `package.json` to include Vercel-specific scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "vercel-build": "prisma generate && prisma migrate deploy && next build",
    "migrate": "ts-node scripts/migrate.ts"
  }
}
```

## Step 9: Add Prisma Configuration (if using Prisma)

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define your models here based on your existing database schema
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  password  String
  firstName String
  lastName  String
  role      String
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Step 10: Final Vercel Configuration

Update your `vercel.json` with the correct build settings:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "withTurbo": false
      }
    }
  ],
  "routes": [
    {
      "src": "/api/v1/(.*)",
      "dest": "/api/v1/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "/api/v1"
  },
  "github": {
    "enabled": true
  }
}
```

## Deployment Steps

1. Make sure your database is accessible from the internet (e.g., using a cloud database service)
2. Set up your environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your database connection string
   - `SECRET_KEY`: Your JWT secret
   - Any other environment variables your backend needs
3. Push your changes to GitHub
4. Import your project in the Vercel dashboard
5. Deploy!

This approach allows you to keep your existing backend logic while making it compatible with Vercel's serverless architecture.