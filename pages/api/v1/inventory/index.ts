import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/database';
import { authenticateUser } from '../../../../middleware/auth';
import { settings } from '../../../../config/server';

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
      return await handleGetInventory(req, res, currentUser);

    case 'POST':
      // Only admin roles can create inventory
      if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create inventory'
        });
      }
      return await handleCreateInventory(req, res, currentUser);

    default:
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
  }
}

async function handleGetInventory(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { skip = 0, limit = 10, project_id, phase_block_id, unit_type, status, min_price, max_price, search } = req.query;

    // Build query based on user permissions
    let whereClause: any = {};

    // Apply filters based on user role
    if (currentUser.role === 'MASTER_ADMIN') {
      // Master admin can see all inventory
    } else if (currentUser.role === 'INVESTOR') {
      // Investor can only see their assigned inventory
      whereClause.investor_id = currentUser.investor_id;
    } else {
      // Other roles can see inventory in their builder's projects
      whereClause = {
        project: {
          builder_id: currentUser.builder_id
        }
      };
    }

    // Apply additional filters
    if (project_id) {
      whereClause.project_id = String(project_id);
    }

    if (phase_block_id) {
      whereClause.phase_block_id = String(phase_block_id);
    }

    if (unit_type) {
      whereClause.unit_type = String(unit_type);
    }

    if (status) {
      whereClause.status = String(status);
    }

    if (min_price) {
      whereClause.price = {
        gte: parseFloat(min_price as string)
      };
    }

    if (max_price) {
      whereClause.price = {
        ...whereClause.price,
        lte: parseFloat(max_price as string)
      };
    }

    if (search) {
      whereClause = {
        AND: [
          whereClause,
          {
            OR: [
              { unit_number: { contains: String(search) } },
              { unit_type: { contains: String(search).toLowerCase() } }
            ]
          }
        ]
      };
    }

    // Count total for pagination
    const total = await prisma.inventory.count({ where: whereClause });

    // Apply pagination
    const inventoryItems = await prisma.inventory.findMany({
      where: whereClause,
      skip: parseInt(skip as string, 10) || 0,
      take: Math.min(parseInt(limit as string, 10) || 10, 100),
      include: {
        project: true,
        phase_block: true,
        investor: true
      }
    });

    // Format the response to match the expected structure
    const formattedItems = inventoryItems.map(item => ({
      id: item.id,
      unit_number: item.unit_number,
      unit_type: item.unit_type,
      category: item.category,
      size: item.size,
      price: item.price,
      status: item.status,
      project_id: item.project_id,
      phase_block_id: item.phase_block_id,
      investor_locked: item.investor_locked,
      hold_expiry_date: item.hold_expiry_date,
      remarks: item.remarks,
      created_at: item.created_at,
      updated_at: item.updated_at,
      project: {
        id: item.project.id,
        name: item.project.name,
        location: item.project.location
      },
      phase_block: item.phase_block ? {
        id: item.phase_block.id,
        name: item.phase_block.name
      } : null,
      investor: item.investor ? {
        id: item.investor.id,
        name: item.investor.name
      } : null
    }));

    return res.status(200).json({
      success: true,
      message: 'Inventory retrieved successfully',
      data: {
        inventory: formattedItems,
        pagination: {
          skip: parseInt(skip as string, 10) || 0,
          limit: Math.min(parseInt(limit as string, 10) || 10, 100),
          total,
          pages: Math.ceil(total / (parseInt(limit as string, 10) || 10))
        }
      }
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while retrieving inventory',
    });
  }
}

async function handleCreateInventory(req: NextApiRequest, res: NextApiResponse, currentUser: any) {
  try {
    const { 
      unit_number, 
      unit_type, 
      category, 
      size, 
      price, 
      project_id, 
      phase_block_id, 
      investor_locked, 
      investor_id, 
      remarks 
    } = req.body;

    // Check if user has permission to create inventory
    if (!['MASTER_ADMIN', 'SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create inventory'
      });
    }

    // Validate required fields
    if (!unit_number || !unit_type || !price || !project_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify project exists and belongs to current user's builder
    const project = await prisma.project.findUnique({
      where: { id: String(project_id) }
    });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (currentUser.role !== 'MASTER_ADMIN' && project.builder_id !== currentUser.builder_id) {
      return res.status(403).json({
        success: false,
        message: 'Cannot create inventory for project in different builder organization'
      });
    }

    // Verify phase block exists if provided
    if (phase_block_id) {
      const phaseBlock = await prisma.phaseBlock.findUnique({
        where: { id: String(phase_block_id) }
      });

      if (!phaseBlock || phaseBlock.project_id !== project_id) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phase block for this project'
        });
      }
    }

    // Verify investor exists if provided
    if (investor_id) {
      const investor = await prisma.investor.findUnique({
        where: { id: String(investor_id) }
      });

      if (!investor || investor.builder_id !== project.builder_id) {
        return res.status(400).json({
          success: false,
          message: 'Invalid investor for this builder'
        });
      }
    }

    // Create inventory item
    const newInventory = await prisma.inventory.create({
      data: {
        unit_number,
        unit_type,
        category: category || 'residential', // default category
        size: size || '',
        price: parseFloat(price),
        project_id: String(project_id),
        phase_block_id: phase_block_id ? String(phase_block_id) : null,
        investor_locked: Boolean(investor_locked),
        investor_id: investor_id ? String(investor_id) : null,
        remarks: remarks || '',
        status: 'available', // default status
        created_by_id: currentUser.id
      },
      include: {
        project: true,
        phase_block: true,
        investor: true
      }
    });

    // Format the response to match the expected structure
    const formattedItem = {
      id: newInventory.id,
      unit_number: newInventory.unit_number,
      unit_type: newInventory.unit_type,
      category: newInventory.category,
      size: newInventory.size,
      price: newInventory.price,
      status: newInventory.status,
      project_id: newInventory.project_id,
      phase_block_id: newInventory.phase_block_id,
      investor_locked: newInventory.investor_locked,
      hold_expiry_date: newInventory.hold_expiry_date,
      remarks: newInventory.remarks,
      created_at: newInventory.created_at,
      updated_at: newInventory.updated_at,
      project: {
        id: newInventory.project.id,
        name: newInventory.project.name,
        location: newInventory.project.location
      },
      phase_block: newInventory.phase_block ? {
        id: newInventory.phase_block.id,
        name: newInventory.phase_block.name
      } : null,
      investor: newInventory.investor ? {
        id: newInventory.investor.id,
        name: newInventory.investor.name
      } : null
    };

    return res.status(201).json({
      success: true,
      message: 'Inventory item created successfully',
      data: formattedItem
    });
  } catch (error) {
    console.error('Create inventory error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while creating inventory',
    });
  }
}