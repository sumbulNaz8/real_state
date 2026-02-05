import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import { authenticateUser } from '../../../../middleware/auth';

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
      return await handleGetProjects(req, res, currentUser);

    case 'POST':
      // Only admin roles can create projects
      if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create projects'
        });
      }
      return await handleCreateProject(req, res, currentUser);

    default:
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
  }
}

async function handleGetProjects(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { skip = 0, limit = 10, search, builder_id, status } = req.query;

    // Build query based on user permissions
    let whereClause: any = {};

    // Apply filters based on user role
    if (currentUser.role === 'MASTER_ADMIN') {
      // Master admin can see all projects, can filter by builder
      if (builder_id) {
        whereClause.builder_id = String(builder_id);
      }
    } else {
      // Super admin, admin, and other roles can only see projects in their builder
      whereClause.builder_id = currentUser.builder_id;
    }

    // Apply additional filters
    if (search) {
      whereClause = {
        AND: [
          whereClause,
          {
            OR: [
              { name: { contains: String(search) } },
              { location: { contains: String(search) } }
            ]
          }
        ]
      };
    }

    if (status) {
      whereClause = {
        AND: [
          whereClause,
          { status: String(status) }
        ]
      };
    }

    // Count total for pagination
    const total = await prisma.project.count({ where: whereClause });

    // Apply pagination
    const projects = await prisma.project.findMany({
      where: whereClause,
      skip: parseInt(skip as string, 10) || 0,
      take: Math.min(parseInt(limit as string, 10) || 10, 100),
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        total_units: true,
        available_units: true,
        status: true,
        builder_id: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects,
        pagination: {
          skip: parseInt(skip as string, 10) || 0,
          limit: Math.min(parseInt(limit as string, 10) || 10, 100),
          total,
          pages: Math.ceil(total / (parseInt(limit as string, 10) || 10))
        }
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while retrieving projects',
    });
  }
}

async function handleCreateProject(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { name, description, location, total_units, builder_id } = req.body;

    // Check if user has permission to create projects
    if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create projects'
      });
    }

    // Validate required fields
    if (!name || !location || !total_units || !builder_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify builder exists and belongs to current user's organization
    const builder = await prisma.builder.findUnique({
      where: { id: String(builder_id) }
    });

    if (!builder) {
      return res.status(400).json({
        success: false,
        message: 'Builder not found'
      });
    }

    if (currentUser.role !== 'MASTER_ADMIN' && builder.id !== currentUser.builder_id) {
      return res.status(403).json({
        success: false,
        message: 'Cannot create project for different builder organization'
      });
    }

    // Check if builder has reached project limit
    const projectCount = await prisma.project.count({
      where: {
        builder_id: builder.id,
        status: { not: 'cancelled' }
      }
    });

    if (projectCount >= builder.max_projects) {
      return res.status(400).json({
        success: false,
        message: `Maximum project limit (${builder.max_projects}) reached for this builder`
      });
    }

    // Create project
    const newProject = await prisma.project.create({
      data: {
        name,
        description: description || '',
        location,
        total_units: parseInt(total_units, 10),
        available_units: parseInt(total_units, 10), // Initially all units are available
        builder_id: String(builder_id),
        status: 'active',
        created_by_id: currentUser.id
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        total_units: true,
        available_units: true,
        status: true,
        builder_id: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while creating project',
    });
  }
}