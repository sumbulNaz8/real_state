# Vercel Deployment Guide

This guide explains how to properly deploy your Kings Builder Real Estate Management System to Vercel.

## Prerequisites

1. Your backend API must be deployed and accessible from the internet
2. You need a Vercel account
3. Your frontend code should be hosted on GitHub, GitLab, or Bitbucket

## Step-by-Step Deployment

### 1. Prepare Your Backend

Before deploying the frontend to Vercel, you need to have your FastAPI backend deployed somewhere accessible from the internet. Options include:

- **Render**: https://render.com/
- **Railway**: https://railway.app/
- **AWS**: EC2, Lambda, ECS
- **Google Cloud Platform**
- **Azure**

Once deployed, note down your backend API URL (e.g., `https://your-backend.onrender.com/api/v1`).

### 2. Update Configuration

Update your `next.config.js` to work properly in production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only apply rewrites in development mode
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_DESTINATION_URL || 'http://localhost:8000/api/v1/:path*',
        },
      ];
    }
    // In production (Vercel), no rewrites needed as API calls will go directly to the backend URL
    return [];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  }
};

module.exports = nextConfig;
```

### 3. Deploy to Vercel

#### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run the deployment command:
```bash
vercel --prod
```

3. During setup, you'll be prompted to set environment variables:
   - `NEXT_PUBLIC_API_URL`: Set this to your deployed backend URL

#### Method 2: Connect GitHub Repository

1. Go to https://vercel.com/
2. Click "New Project"
3. Import your GitHub repository
4. In the project settings, go to "Environment Variables"
5. Add the following variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api/v1`)
6. Click "Deploy"

### 4. Configure Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain or use the free `.vercel.app` domain

## Troubleshooting Common Issues

### Issue: API calls returning 404 or CORS errors
**Solution**: Verify that your `NEXT_PUBLIC_API_URL` environment variable is correctly set to your deployed backend URL.

### Issue: Build failures on Vercel
**Solution**: Check that all dependencies are listed in `package.json` and that there are no build-time dependencies on local services.

### Issue: Environment variables not working
**Solution**: Ensure you're using `NEXT_PUBLIC_` prefix for client-side environment variables.

## Important Notes

1. **Backend URL**: Remember that once deployed to Vercel, your frontend will no longer be able to access `localhost:8000`. You must have your backend deployed elsewhere.

2. **CORS Configuration**: Make sure your backend allows requests from your Vercel deployment URL. Update the `BACKEND_CORS_ORIGINS` in your backend settings.

3. **Environment Variables**: All environment variables that need to be accessed client-side must be prefixed with `NEXT_PUBLIC_`.

4. **Build Process**: Vercel will run `npm run build` during deployment, so ensure your application builds successfully.

## Post-Deployment Checklist

- [ ] Verify that the frontend loads correctly
- [ ] Test API calls to ensure they reach your backend
- [ ] Check authentication flow
- [ ] Verify all pages are accessible
- [ ] Test form submissions and data updates
- [ ] Confirm that error handling works properly

## Scaling Considerations

As your application grows, consider:
- Setting up a proper database (instead of the current SQLite)
- Implementing caching strategies
- Optimizing images and assets
- Setting up monitoring and logging