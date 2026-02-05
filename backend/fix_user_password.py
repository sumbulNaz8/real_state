#!/usr/bin/env python3
"""
Script to fix user password hash issue
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from core.database import Base, init_database
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import User
from core.security import pwd_context

async def fix_user_password():
    print("Initializing database connection...")

    # Initialize the database engine
    init_database()

    # Import the engine after initialization
    from core.database import engine

    print("Connecting to database...")
    async with AsyncSession(engine) as session:
        print("Querying for master admin user...")

        # Find the master admin user
        result = await session.execute(
            select(User).filter(User.role == "master_admin")
        )
        user = result.scalars().first()

        if user:
            print(f"Found user: {user.username} with role: {user.role}")

            # Check if we can hash a simple password
            try:
                test_password = "Pass2026"
                print("Testing password hash...")

                # Try to hash the password
                hashed = pwd_context.hash(test_password)
                print("Password hash successful!")

                # Update the user's password hash
                user.password_hash = hashed
                await session.commit()

                print(f"Updated password hash for user {user.username}")

            except Exception as e:
                print(f"Error hashing password: {e}")
                import traceback
                traceback.print_exc()
        else:
            print("No master admin user found. Creating one...")

            # Create a new master admin user
            try:
                test_password = "Pass2026"
                hashed = pwd_context.hash(test_password)

                new_user = User(
                    username=settings.MASTER_ADMIN_USERNAME,
                    email=settings.MASTER_ADMIN_EMAIL,
                    password_hash=hashed,
                    first_name="Master",
                    last_name="Admin",
                    role="master_admin",
                    status="active"
                )

                session.add(new_user)
                await session.commit()

                print(f"Created new master admin user: {new_user.username}")

            except Exception as e:
                print(f"Error creating user: {e}")
                import traceback
                traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(fix_user_password())