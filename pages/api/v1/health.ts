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