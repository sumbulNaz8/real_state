import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import bcrypt from 'bcryptjs';
import { requireAuth, authenticateUser, AuthenticatedUser } from '../../../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await authenticateUser(req);

  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header missing or invalid'
    });
  }

  switch (req.method) {
    case 'GET':
      return await handleGetUsers(req, res, currentUser);

    case 'POST':
      // Only admin roles can create users
      if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create users'
        });
      }
      return await handleCreateUser(req, res, currentUser);

    default:
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
  }
}

async function handleGetUsers(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { skip = 0, limit = 10, search, role, builder_id } = req.query;

    // Build query based on user permissions
    let whereClause: any = {};

    // Apply filters based on user role
    if (currentUser.role === 'MASTER_ADMIN') {
      // Master admin can see all users
      if (builder_id) {
        whereClause.builder_id = String(builder_id);
      }
    } else if (currentUser.role === 'SUPER_ADMIN') {
      // Super admin can only see users in their builder organization
      whereClause.builder_id = currentUser.builder_id;
    } else {
      // Other roles can only see users in their builder and with same or lower role
      whereClause = {
        AND: [
          { builder_id: currentUser.builder_id },
          { 
            OR: [
              { role: 'SALES_AGENT' },
              { role: 'INVESTOR' },
              { id: currentUser.id } // Also allow viewing own profile
            ]
          }
        ]
      };
    }

    // Apply additional filters
    if (search) {
      whereClause = {
        AND: [
          whereClause,
          {
            OR: [
              { username: { contains: String(search) } },
              { email: { contains: String(search) } },
              { first_name: { contains: String(search) } },
              { last_name: { contains: String(search) } }
            ]
          }
        ]
      };
    }

    if (role) {
      whereClause = {
        AND: [
          whereClause,
          { role: String(role) }
        ]
      };
    }

    // Count total for pagination
    const total = await prisma.user.count({ where: whereClause });

    // Apply pagination
    const users = await prisma.user.findMany({
      where: whereClause,
      skip: parseInt(skip as string, 10) || 0,
      take: Math.min(parseInt(limit as string, 10) || 10, 100),
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        status: true,
        builder_id: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          skip: parseInt(skip as string, 10) || 0,
          limit: Math.min(parseInt(limit as string, 10) || 10, 100),
          total,
          pages: Math.ceil(total / (parseInt(limit as string, 10) || 10))
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while retrieving users',
    });
  }
}

async function handleCreateUser(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { username, email, password, first_name, last_name, phone, role, builder_id, investor_id } = req.body;

    // Check if user has permission to create users
    if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create users'
      });
    }

    // Validate required fields
    if (!username || !email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({
          success: false,
          message: 'Username already registered'
        });
      }
      if (existingUser.email === email) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
    }

    // Validate role assignment permissions
    if (!['SALES_AGENT', 'INVESTOR'].includes(role)) {
      // Only master admin can create admin roles
      if (currentUser.role !== 'MASTER_ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Only master admin can create admin roles'
        });
      }
    }

    // Set builder ID based on current user or provided data
    const userBuilderId = builder_id || currentUser.builder_id;

    // For non-master admins, ensure they're creating users for their own builder
    if (currentUser.role !== 'MASTER_ADMIN' && userBuilderId !== currentUser.builder_id) {
      return res.status(403).json({
        success: false,
        message: 'Cannot create user for different builder organization'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
        first_name,
        last_name,
        phone: phone || '',
        role,
        status: 'active',
        builder_id: userBuilderId,
        investor_id: investor_id || null,
        created_by_id: currentUser.id
      },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        status: true,
        builder_id: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while creating user',
    });
  }
}