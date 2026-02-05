/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // For development, proxy to the external backend
    if (process.env.NODE_ENV === 'development' && !process.env.USE_VERCEL_BACKEND) {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_DESTINATION_URL || 'http://localhost:8000/api/v1/:path*',
        },
      ];
    }
    // In production (Vercel) or when USE_VERCEL_BACKEND is set, no rewrites needed
    // as API calls will go directly to the Vercel API routes
    return [];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || (process.env.USE_VERCEL_BACKEND ? '/api/v1' : 'http://localhost:8000/api/v1'),
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;