#!/usr/bin/env node
/**
 * Vercel Deployment Preparation Script
 *
 * This script checks for common issues that might prevent successful deployment to Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking project for Vercel deployment readiness...\n');

// Check 1: Verify package.json exists and has required scripts
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const requiredScripts = ['dev', 'build', 'start'];

console.log('✅ package.json found');
for (const script of requiredScripts) {
  if (!packageJson.scripts[script]) {
    console.warn(`⚠️ Missing script: ${script}`);
  } else {
    console.log(`✅ Script "${script}" found`);
  }
}

// Check 2: Verify Next.js configuration
const nextConfigPath = path.join(__dirname, 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.error('❌ next.config.js not found!');
  process.exit(1);
}

console.log('✅ next.config.js found');

// Check 3: Check for API routes that might conflict
const apiDir = path.join(__dirname, 'pages', 'api');
const appApiDir = path.join(__dirname, 'app', 'api');

if (fs.existsSync(apiDir)) {
  console.log('⚠️ Found API routes in pages/api. These will be deployed as serverless functions.');
} else {
  console.log('✅ No legacy API routes found in pages/api');
}

if (fs.existsSync(appApiDir)) {
  console.log('⚠️ Found API routes in app/api. These will be deployed as serverless functions.');
} else {
  console.log('✅ No API routes found in app/api');
}

// Check 4: Verify environment variables
const envFiles = ['.env.local', '.env'];
let envFound = false;

for (const envFile of envFiles) {
  const envPath = path.join(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    console.log(`✅ Environment file found: ${envFile}`);
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Check for required environment variables
    if (envContent.includes('NEXT_PUBLIC_API_URL')) {
      console.log('✅ NEXT_PUBLIC_API_URL found in environment file');
    } else {
      console.warn('⚠️ NEXT_PUBLIC_API_URL not found in environment file');
    }

    envFound = true;
  }
}

if (!envFound) {
  console.log('ℹ️ No environment files found (this is OK for Vercel deployment)');
}

// Check 5: Check for build dependencies
const hasBuildScript = !!packageJson.scripts.build;
if (hasBuildScript) {
  console.log('✅ Build script found');
} else {
  console.error('❌ Build script not found in package.json!');
  process.exit(1);
}

// Check 6: Check for TypeScript configuration
const tsConfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsConfigPath)) {
  console.log('✅ tsconfig.json found');
} else {
  console.log('ℹ️ tsconfig.json not found (using JavaScript)');
}

// Check 7: Check for Vercel configuration
const vercelConfigPath = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  console.log('✅ vercel.json found');

  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  if (vercelConfig.env && vercelConfig.env.NEXT_PUBLIC_API_URL) {
    console.log('✅ NEXT_PUBLIC_API_URL found in vercel.json');
  } else {
    console.warn('⚠️ NEXT_PUBLIC_API_URL not found in vercel.json');
  }
} else {
  console.log('ℹ️ vercel.json not found (Vercel will auto-detect configuration)');
}

console.log('\n✅ Project appears ready for Vercel deployment!');
console.log('\n📝 Next steps:');
console.log('1. Make sure your backend API is deployed and accessible');
console.log('2. Set NEXT_PUBLIC_API_URL environment variable in Vercel dashboard');
console.log('3. Deploy using "vercel" command or connect your GitHub repo to Vercel');
console.log('4. Refer to VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions');