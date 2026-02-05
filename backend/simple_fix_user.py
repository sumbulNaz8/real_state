#!/usr/bin/env python3
"""
Simple script to fix user password hash issue by directly executing SQL
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
from core.security import pwd_context
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool

def fix_user_password():
    print("Connecting to database directly...")

    # Create a sync engine to execute raw SQL
    engine = create_engine(
        settings.DATABASE_URL.replace('postgresql+asyncpg://', 'postgresql://'),
        poolclass=NullPool,
        connect_args={"server_settings": {"sslmode": "require"}} if "neon.tech" in settings.DATABASE_URL else {}
    )

    try:
        print("Creating password hash...")

        # Create a new password hash using a simple password
        test_password = "Pass2026"
        try:
            hashed = pwd_context.hash(test_password)
            print("Password hash created successfully!")
        except Exception as e:
            print(f"Error creating hash: {e}")
            # Try with a shorter password to avoid bcrypt 72-byte limit
            test_password = "Pass123"
            hashed = pwd_context.hash(test_password)
            print("Password hash created with shorter password!")

        with engine.connect() as conn:
            # Check if master admin user exists
            result = conn.execute(
                text("SELECT id, username, email FROM users WHERE role = 'master_admin' LIMIT 1")
            )

            user_row = result.fetchone()

            if user_row:
                user_id, username, email = user_row
                print(f"Found master admin user: {username} ({email})")

                # Update the password hash
                update_result = conn.execute(
                    text("UPDATE users SET password_hash = :hash WHERE id = :user_id"),
                    {"hash": hashed, "user_id": user_id}
                )

                conn.commit()

                print(f"Updated password hash for user {username}")
                print("Login should now work with username 'scitforte' and password 'Pass2026' or 'Pass123'")
            else:
                print("No master admin user found. Creating one...")

                # Insert a new master admin user
                insert_result = conn.execute(
                    text("""
                        INSERT INTO users (username, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
                        VALUES (:username, :email, :password_hash, :first_name, :last_name, :role, :status, NOW(), NOW())
                    """),
                    {
                        "username": settings.MASTER_ADMIN_USERNAME,
                        "email": settings.MASTER_ADMIN_EMAIL,
                        "password_hash": hashed,
                        "first_name": "Master",
                        "last_name": "Admin",
                        "role": "master_admin",
                        "status": "active"
                    }
                )

                conn.commit()

                print(f"Created new master admin user: {settings.MASTER_ADMIN_USERNAME}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    fix_user_password()