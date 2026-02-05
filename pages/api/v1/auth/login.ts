import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import { createAccessJWT, createRefreshJWT } from '../../../../utils/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'HTTP 405 error occurred'
    });
  }

  // Handle both form data and JSON data
  let { username, password } = req.body;

  // If username and password are not in body, try to get from form data in query
  if (!username && !password && typeof req.query.username === 'string' && typeof req.query.password === 'string') {
    username = req.query.username;
    password = req.query.password;
  }

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }

    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Inactive user account'
      });
    }

    // Create access token
    const accessToken = createAccessJWT({
      userId: user.id,
      username: user.username,
      role: user.role,
      builderId: user.builder_id || null,
    });

    // Create refresh token
    const refreshToken = createRefreshJWT({
      userId: user.id,
      username: user.username,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: 'bearer',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          builder_id: user.builder_id || null,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred during authentication',
    });
  }
}