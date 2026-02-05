#!/usr/bin/env python3
"""
Script to create the master admin user if it doesn't exist
"""

import asyncio
import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine
from core.config import settings
from core.database import Base
from core.security import pwd_context
from models.user import User
from utils.logger import logger

async def create_master_admin():
    """Create master admin user if it doesn't exist"""

    # Create database engine
    engine = create_async_engine(settings.DATABASE_URL)

    async with engine.begin() as conn:
        # Create tables if they don't exist
        await conn.run_sync(Base.metadata.create_all)

        # Check if master admin exists
        result = await conn.execute(
            select(User).where(User.username == settings.MASTER_ADMIN_USERNAME)
        )
        existing_user = result.scalar_one_or_none()

        if not existing_user:
            print(f"Creating master admin user: {settings.MASTER_ADMIN_USERNAME}")

            # Hash the password
            hashed_password = pwd_context.hash(settings.MASTER_ADMIN_PASSWORD)

            # Create master admin user
            master_admin = User(
                username=settings.MASTER_ADMIN_USERNAME,
                email=settings.MASTER_ADMIN_EMAIL,
                password_hash=hashed_password,
                first_name="Master",
                last_name="Admin",
                role="master_admin",
                status="active"
            )

            # Insert the user
            from sqlalchemy import insert
            stmt = insert(User).values(
                username=master_admin.username,
                email=master_admin.email,
                password_hash=master_admin.password_hash,
                first_name=master_admin.first_name,
                last_name=master_admin.last_name,
                role=master_admin.role,
                status=master_admin.status
            )
            await conn.execute(stmt)
            await conn.commit()

            print(f"SUCCESS: Master admin '{settings.MASTER_ADMIN_USERNAME}' created successfully!")
        else:
            print(f"INFO: Master admin '{settings.MASTER_ADMIN_USERNAME}' already exists!")

if __name__ == "__main__":
    print("Initializing Master Admin User...")
    asyncio.run(create_master_admin())
    print("Initialization complete!")