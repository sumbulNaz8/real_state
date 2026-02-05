#!/usr/bin/env python3
"""
Script to create a proper user with bcrypt hash
"""

import asyncio
import sys
import os
import uuid
from dotenv import load_dotenv
from passlib.context import CryptContext

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool

def create_proper_user():
    print("Connecting to database directly...")

    # Create a sync engine to execute raw SQL
    base_url = settings.DATABASE_URL.replace('postgresql+asyncpg://', 'postgresql://')

    # Add sslmode to the connection string if needed
    if "neon.tech" in base_url and "sslmode" not in base_url:
        base_url += "?sslmode=require"

    engine = create_engine(
        base_url,
        poolclass=NullPool
    )

    # Create password hashing context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)

    try:
        # Create a bcrypt hash for a simple password
        password = "admin123"
        print(f"Creating bcrypt hash for password: {password}")

        try:
            hashed = pwd_context.hash(password)
            print("Bcrypt hash created successfully!")
        except Exception as e:
            print(f"Error creating bcrypt hash: {e}")
            # Fallback to simple hash if bcrypt fails
            import hashlib
            hashed = f"sha256:{hashlib.sha256(password.encode()).hexdigest()}"
            print("Using SHA-256 fallback hash")

        with engine.connect() as conn:
            # Check if admin user exists
            result = conn.execute(
                text("SELECT id, username, email, role FROM users WHERE username = 'admin' LIMIT 1")
            )

            user_row = result.fetchone()

            if user_row:
                user_id, username, email, role = user_row
                print(f"Found user: {username} ({email}) - Updating password...")

                # Update the password hash
                conn.execute(
                    text("UPDATE users SET password_hash = :hash WHERE username = :username"),
                    {"hash": hashed, "username": username}
                )

                conn.commit()
                print(f"Updated password hash for user {username}")
                print(f"Login with username: {username}, password: {password}")
            else:
                print("No admin user found. Creating one with bcrypt hash...")

                # Generate a new UUID for the user
                user_id = str(uuid.uuid4())

                # Insert a new master admin user with bcrypt hash
                conn.execute(
                    text("""
                        INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
                        VALUES (:id, :username, :email, :password_hash, :first_name, :last_name, :role, :status, NOW(), NOW())
                    """),
                    {
                        "id": user_id,
                        "username": "admin",
                        "email": "admin@kingsbuilder.com",
                        "password_hash": hashed,
                        "first_name": "System",
                        "last_name": "Admin",
                        "role": "MASTER_ADMIN",  # This should match the enum value
                        "status": "active"
                    }
                )

                conn.commit()
                print(f"Created new admin user: admin")
                print(f"Login with username: admin, password: {password}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    create_proper_user()