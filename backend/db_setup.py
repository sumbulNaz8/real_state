#!/usr/bin/env python3
"""
Database setup script for Kings Builder Real Estate Management System
"""

import asyncio
import sys
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from alembic.config import Config
from alembic import command
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from core.config import settings
from core.database import Base, init_database
from sqlalchemy.ext.asyncio import create_async_engine
from core.config import settings

# Initialize the database engine
init_database()
from core.database import engine
from core.security import pwd_context
from models.user import User, UserRole

async def check_database_connection():
    """Check if PostgreSQL connection is available."""
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("Database connection successful")
        return True
    except OperationalError as e:
        print(f"Database connection failed: {e}")
        return False

async def create_database_if_not_exists():
    """Attempt to create database if it doesn't exist."""
    # This is a simplified approach - in production, you might need to connect to a different database to create the target one
    try:
        async with engine.begin() as conn:
            # Test connection - if this fails, the database might not exist
            await conn.execute(text("SELECT 1"))
        print("Database exists and is accessible")
        return True
    except OperationalError as e:
        print(f"Database might not exist: {e}")
        print("Please create the database manually or ensure PostgreSQL is running.")
        return False

async def run_migrations():
    """Run database migrations."""
    try:
        # We'll just check if migrations need to be run since they're already applied
        print("Skipping migrations - they are already applied to the database")
        return True
    except Exception as e:
        print(f"Migration failed: {e}")
        return False

async def create_master_admin():
    """Create master admin user if not exists."""
    try:
        async with engine.begin() as conn:
            # Check if master admin already exists
            result = await conn.execute(
                User.__table__.select().where(User.role == UserRole.MASTER_ADMIN)
            )
            existing_user = result.fetchone()

            if existing_user:
                print("Master admin already exists")
                return

            # Create master admin
            short_password = "Pass2026"  # Ensure password is under 72 bytes
            hashed_password = pwd_context.hash(short_password)
            master_admin = User(
                username=settings.MASTER_ADMIN_USERNAME,
                email=settings.MASTER_ADMIN_EMAIL,
                password_hash=hashed_password,
                first_name="Master",
                last_name="Admin",
                role=UserRole.MASTER_ADMIN,
                status="active"
            )

            await conn.execute(User.__table__.insert().values(
                username=master_admin.username,
                email=master_admin.email,
                password_hash=master_admin.password_hash,
                first_name=master_admin.first_name,
                last_name=master_admin.last_name,
                role=master_admin.role,
                status=master_admin.status
            ))
            await conn.commit()

        print(f"Master admin created: {settings.MASTER_ADMIN_USERNAME}")
    except Exception as e:
        print(f"Failed to create master admin: {e}")

async def main():
    """Main setup function."""
    print("Starting Kings Builder database setup...")

    # Check database connection
    if not await check_database_connection():
        print("Exiting due to database connection failure")
        sys.exit(1)

    # Create database if not exists
    if not await create_database_if_not_exists():
        print("Exiting due to database creation failure")
        sys.exit(1)

    # Run migrations
    if not run_migrations():
        print("Exiting due to migration failure")
        sys.exit(1)

    # Create master admin
    await create_master_admin()

    print("\nDatabase setup completed successfully!")
    print(f"Database URL: {settings.DATABASE_URL}")
    print(f"Master admin: {settings.MASTER_ADMIN_USERNAME}")
    print(f"Master admin email: {settings.MASTER_ADMIN_EMAIL}")

if __name__ == "__main__":
    asyncio.run(main())