# Kings Builder - Vercel Deployment Instructions

## Overview
This document provides step-by-step instructions to successfully deploy your Kings Builder Real Estate Management System frontend to Vercel.

## Prerequisites
1. Your FastAPI backend must be deployed and accessible from the internet
2. A Vercel account (sign up at https://vercel.com)
3. Your code pushed to a GitHub/GitLab/Bitbucket repository

## Backend Deployment (Prerequisite)
Before deploying the frontend, ensure your backend is deployed. You can deploy it to:
- Render (https://render.com/)
- Railway (https://railway.app/)
- AWS, Google Cloud, Azure, etc.

Take note of your backend's API URL (e.g., `https://your-backend.onrender.com/api/v1`)

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended for testing)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to your project directory:
```bash
cd C:\Users\AG Computer\Desktop\real_state
```

3. Run the deployment command:
```bash
vercel
```

4. Follow the prompts:
   - Set the project name (or press Enter for default)
   - Select your scope (team or personal)
   - When prompted for environment variables, set:
     - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api/v1`)

5. For production deployment, run:
```bash
vercel --prod
```

### Option 2: GitHub Integration (Recommended for ongoing development)

1. Push your latest code to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Go to https://vercel.com/dashboard and click "New Project"

3. Find and import your repository

4. On the "Configure Project" page:
   - Framework Preset: Next.js (should be auto-detected)
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `.next` (should be auto-detected)
   - Development Command: `next dev --port $PORT` (optional)

5. Add Environment Variables:
   - Click on "Environment Variables" section
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api/v1` (replace with your actual backend URL)

6. Click "Deploy"

## Configuration Files Updated

The following files have been prepared for Vercel deployment:

1. `next.config.js` - Modified to handle API rewrites only in development
2. `vercel.json` - Added Vercel-specific configuration
3. `README.md` - Updated with deployment instructions
4. `VERCEL_DEPLOYMENT_GUIDE.md` - Detailed deployment guide
5. `check_vercel_deployment.js` - Verification script

## Important Notes

1. **API URL**: The most critical step is setting the correct `NEXT_PUBLIC_API_URL` environment variable to point to your deployed backend.

2. **CORS**: Ensure your backend allows requests from your Vercel deployment URL. Update the `BACKEND_CORS_ORIGINS` in your backend settings accordingly.

3. **Environment Variables**: Remember that only variables prefixed with `NEXT_PUBLIC_` are available to client-side code.

4. **Testing**: After deployment, test all functionality, especially authentication and API-dependent features.

## Troubleshooting

### Common Issues:

1. **API calls failing**: Check that `NEXT_PUBLIC_API_URL` is correctly set in Vercel environment variables.

2. **Build failures**: Ensure all dependencies are in `package.json` and no local-specific configurations are in the code.

3. **CORS errors**: Update your backend's CORS settings to include your Vercel deployment URL.

4. **Authentication issues**: Verify that JWT tokens are handled correctly across domains.

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Login functionality works
- [ ] API calls to backend are successful
- [ ] All pages are accessible
- [ ] Forms submit correctly
- [ ] Error handling works properly
- [ ] Responsive design works on mobile

## Need Help?

Refer to `VERCEL_DEPLOYMENT_GUIDE.md` for more detailed information, or contact support if you encounter issues during deployment.