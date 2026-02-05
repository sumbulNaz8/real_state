# Kings Builder Real Estate Management System

This is a full-stack application for managing real estate properties in the Karachi market. The application has been configured for deployment on Vercel with both frontend and backend components.

## Architecture

- **Frontend**: Next.js 14 application with TypeScript
- **Backend**: Converted FastAPI endpoints to Vercel-compatible API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication

## Deployment to Vercel

### Prerequisites

1. Have a Vercel account
2. Install the Vercel CLI: `npm i -g vercel`
3. Have your PostgreSQL database URL ready

### Environment Variables

Set the following environment variables in your Vercel project:

```
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_jwt_secret_key
MASTER_ADMIN_USERNAME=scitforte
MASTER_ADMIN_EMAIL=admin@scitforte.com
MASTER_ADMIN_PASSWORD=your_secure_password
```

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. During the project setup, add the environment variables listed above
3. Make sure the build command is set to `npm run build`
4. The output directory should be set automatically

### Manual Deployment

If deploying manually via CLI:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## API Endpoints

The following API endpoints are available:

- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/refresh` - Token refresh
- `GET|POST /api/v1/users` - User management
- `GET|POST /api/v1/projects` - Project management
- `GET|POST /api/v1/inventory` - Inventory management
- `POST /api/v1/admin/create-master-admin` - Create master admin (run once)

## Database Setup

The application will automatically create the necessary database tables on first run. Make sure your database connection string is properly configured.

## Troubleshooting

If you encounter issues during deployment:

1. Check that all environment variables are properly set
2. Verify that your database connection string is correct
3. Ensure that your database allows connections from Vercel's IP addresses
4. Check the Vercel logs for specific error messages

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Run Prisma migrations
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000