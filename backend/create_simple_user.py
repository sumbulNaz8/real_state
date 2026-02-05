#!/usr/bin/env python3
"""
Script to create a simple user with a basic hash (avoiding bcrypt issues)
"""

import asyncio
import sys
import os
import uuid
from dotenv import load_dotenv
import hashlib

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool

def create_simple_user():
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

    try:
        # Create a simple SHA-256 hash (for testing purposes only)
        # In a real application, we'd use bcrypt, but we're having compatibility issues
        password = "admin123"  # Simple password for testing
        simple_hash = hashlib.sha256(password.encode()).hexdigest()

        print(f"Created simple hash for password '{password}'")

        with engine.connect() as conn:
            # Check if any admin user exists (using correct enum values)
            result = conn.execute(
                text("SELECT id, username, email, role FROM users WHERE role IN ('MASTER_ADMIN', 'ADMIN') LIMIT 1")
            )

            user_row = result.fetchone()

            if user_row:
                user_id, username, email = user_row
                print(f"Found admin user: {username} ({email}) - Updating password...")

                # Update the password hash
                conn.execute(
                    text("UPDATE users SET password_hash = :hash WHERE id = :user_id"),
                    {"hash": f"sha256:{simple_hash}", "user_id": user_id}
                )

                conn.commit()
                print(f"Updated password hash for user {username}")
                print(f"Login with username: {username}, password: {password}")
            else:
                print("No admin user found. Creating one with simple hash...")

                # Generate a new UUID for the user
                user_id = str(uuid.uuid4())

                # Insert a new master admin user with simple hash
                conn.execute(
                    text("""
                        INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
                        VALUES (:id, :username, :email, :password_hash, :first_name, :last_name, :role, :status, NOW(), NOW())
                    """),
                    {
                        "id": user_id,
                        "username": "admin",
                        "email": "admin@kingsbuilder.com",
                        "password_hash": f"sha256:{simple_hash}",
                        "first_name": "System",
                        "last_name": "Admin",
                        "role": "MASTER_ADMIN",
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
    create_simple_user()