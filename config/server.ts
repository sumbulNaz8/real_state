// Server-side configuration
export const settings = {
  SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key-change-in-production',
  ACCESS_TOKEN_EXPIRE_MINUTES: parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '30', 10),
  REFRESH_TOKEN_EXPIRE_DAYS: parseInt(process.env.REFRESH_TOKEN_EXPIRE_DAYS || '7', 10),
  MASTER_ADMIN_USERNAME: process.env.MASTER_ADMIN_USERNAME || 'scitforte',
  MASTER_ADMIN_EMAIL: process.env.MASTER_ADMIN_EMAIL || 'admin@scitforte.com',
  MASTER_ADMIN_PASSWORD: process.env.MASTER_ADMIN_PASSWORD || 'Pass2026',
  DATABASE_URL: process.env.DATABASE_URL,
  DEFAULT_HOLD_EXPIRY_HOURS: parseInt(process.env.DEFAULT_HOLD_EXPIRY_HOURS || '168', 10), // 7 days in hours
};