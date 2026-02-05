import jwt from 'jsonwebtoken';
import { settings } from '../config/server';

interface AccessTokenPayload {
  userId: string;
  username: string;
  role: string;
  builderId: string | null;
}

interface RefreshTokenPayload {
  userId: string;
  username: string;
}

export function createAccessJWT(payload: AccessTokenPayload): string {
  return jwt.sign(payload, settings.SECRET_KEY, {
    expiresIn: `${settings.ACCESS_TOKEN_EXPIRE_MINUTES}m`,
  });
}

export function createRefreshJWT(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, settings.SECRET_KEY, {
    expiresIn: `${settings.REFRESH_TOKEN_EXPIRE_DAYS}d`,
  });
}

export function verifyAccessJWT(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, settings.SECRET_KEY) as AccessTokenPayload;
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

export function verifyRefreshJWT(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, settings.SECRET_KEY) as RefreshTokenPayload;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}