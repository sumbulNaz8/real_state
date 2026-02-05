import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import bcrypt from 'bcryptjs';
import { settings } from '../../../../config/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Check if master admin already exists
    const existingMasterAdmin = await prisma.user.findUnique({
      where: { username: settings.MASTER_ADMIN_USERNAME },
    });

    if (existingMasterAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Master admin already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(settings.MASTER_ADMIN_PASSWORD, 12);

    // Create the master admin user
    const masterAdmin = await prisma.user.create({
      data: {
        username: settings.MASTER_ADMIN_USERNAME,
        email: settings.MASTER_ADMIN_EMAIL,
        password_hash: hashedPassword,
        first_name: 'Master',
        last_name: 'Admin',
        role: 'MASTER_ADMIN',
        status: 'active',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Master admin created successfully',
      data: {
        id: masterAdmin.id,
        username: masterAdmin.username,
        email: masterAdmin.email,
        role: masterAdmin.role,
      },
    });
  } catch (error) {
    console.error('Create master admin error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while creating master admin',
    });
  }
}