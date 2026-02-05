import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import { verifyRefreshJWT, createAccessJWT } from '../../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Refresh token is required' 
    });
  }

  try {
    // Verify the refresh token
    const payload = verifyRefreshJWT(refresh_token);

    if (!payload) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired refresh token' 
      });
    }

    // Find user by username from the token
    const user = await prisma.user.findUnique({
      where: { 
        username: payload.username 
      },
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // Create new access token
    const accessToken = createAccessJWT({
      userId: user.id,
      username: user.username,
      role: user.role,
      builderId: user.builder_id || null,
    });

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        access_token: accessToken,
        token_type: 'bearer',
      },
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred during token refresh',
    });
  }
}