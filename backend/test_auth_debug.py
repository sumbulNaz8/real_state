#!/usr/bin/env python3
"""
Debug script to test authentication process
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
from core.security import verify_password

async def test_auth():
    print("Testing authentication process...")

    # Initialize the database engine
    init_database()

    # Import the engine after initialization
    from core.database import engine

    async with AsyncSession(engine) as session:
        # Find a user to test with
        result = await session.execute(
            select(User).filter(User.username == "admin")
        )
        user = result.scalars().first()

        if user:
            print(f"Found user: {user.username}")
            print(f"User role: {user.role}")
            print(f"Password hash starts with: {user.password_hash[:10] if user.password_hash else 'None'}...")

            # Test password verification
            test_password = "admin123"
            try:
                is_valid = verify_password(test_password, user.password_hash)
                print(f"Password verification result: {is_valid}")

                if is_valid:
                    print("Login would be successful!")
                else:
                    print("Password verification failed")

            except Exception as e:
                print(f"Error during password verification: {e}")
                import traceback
                traceback.print_exc()
        else:
            print("No user found with username 'admin'")

            # Try to find any user
            result = await session.execute(select(User))
            users = result.scalars().all()
            print(f"Total users in database: {len(users)}")
            for u in users:
                print(f"  - {u.username} ({u.role})")

if __name__ == "__main__":
    asyncio.run(test_auth())