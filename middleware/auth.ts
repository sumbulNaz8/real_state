import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccessJWT } from '../utils/auth';
import { prisma } from '../lib/database';

export interface AuthenticatedUser {
  id: string;
  username: string;
  role: string;
  builder_id: string | null;
  status: string;
}

export async function authenticateUser(req: NextApiRequest): Promise<AuthenticatedUser | null> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const decodedToken = verifyAccessJWT(token);

  if (!decodedToken) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { username: decodedToken.username },
    select: {
      id: true,
      username: true,
      role: true,
      builder_id: true,
      status: true
    }
  });

  if (!user || user.status !== 'active') {
    return null;
  }

  return user;
}

export function requireAuth(roles?: string[]) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const user = await authenticateUser(req);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized: Invalid or expired token' 
      });
    }

    if (roles && !roles.includes(user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Insufficient permissions' 
      });
    }

    // Attach user to request object
    (req as any).user = user;
    next();
  };
}