#!/usr/bin/env python3
"""
Final script to create a user with proper bcrypt hash
"""

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

def create_final_user():
    print("Creating a final user with proper bcrypt hash...")

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
        with engine.connect() as conn:
            # Create a bcrypt hash for a simple password
            password = "admin123"
            print(f"Creating bcrypt hash for password: {password}")

            # Try to hash the password
            try:
                hashed = pwd_context.hash(password)
                print("✓ Bcrypt hash created successfully!")

                # Check if user already exists
                result = conn.execute(
                    text("SELECT id, username, email FROM users WHERE username = 'admin_test' LIMIT 1")
                )

                user_row = result.fetchone()

                if user_row:
                    # Update existing user
                    user_id, username, email = user_row
                    print(f"Updating existing user: {username}")

                    conn.execute(
                        text("UPDATE users SET password_hash = :hash WHERE username = :username"),
                        {"hash": hashed, "username": "admin_test"}
                    )
                else:
                    # Create new user
                    print("Creating new user: admin_test")

                    user_id = str(uuid.uuid4())
                    conn.execute(
                        text("""
                            INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
                            VALUES (:id, :username, :email, :password_hash, :first_name, :last_name, :role, :status, NOW(), NOW())
                        """),
                        {
                            "id": user_id,
                            "username": "admin_test",
                            "email": "admin_test@kingsbuilder.com",
                            "password_hash": hashed,
                            "first_name": "Test",
                            "last_name": "Admin",
                            "role": "ADMIN",  # Using ADMIN instead of MASTER_ADMIN
                            "status": "active"
                        }
                    )

                conn.commit()
                print("✓ User created/updated successfully!")
                print("✓ Try logging in with:")
                print("  Username: admin_test")
                print("  Password: admin123")

            except Exception as e:
                print(f"✗ Error creating bcrypt hash: {e}")
                print("This confirms the bcrypt issue on this system")

                # Try with SHA-256 fallback
                import hashlib
                sha_hash = f"sha256:{hashlib.sha256(password.encode()).hexdigest()}"
                print(f"✓ Created SHA-256 fallback hash")

                # Check if user already exists
                result = conn.execute(
                    text("SELECT id, username, email FROM users WHERE username = 'admin_fallback' LIMIT 1")
                )

                user_row = result.fetchone()

                if user_row:
                    # Update existing user
                    user_id, username, email = user_row
                    print(f"Updating existing fallback user: {username}")

                    conn.execute(
                        text("UPDATE users SET password_hash = :hash WHERE username = :username"),
                        {"hash": sha_hash, "username": "admin_fallback"}
                    )
                else:
                    # Create new user with SHA hash
                    print("Creating new fallback user: admin_fallback")

                    user_id = str(uuid.uuid4())
                    conn.execute(
                        text("""
                            INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
                            VALUES (:id, :username, :email, :password_hash, :first_name, :last_name, :role, :status, NOW(), NOW())
                        """),
                        {
                            "id": user_id,
                            "username": "admin_fallback",
                            "email": "admin_fallback@kingsbuilder.com",
                            "password_hash": sha_hash,
                            "first_name": "Fallback",
                            "last_name": "Admin",
                            "role": "ADMIN",
                            "status": "active"
                        }
                    )

                conn.commit()
                print("✓ Fallback user created/updated successfully!")
                print("✓ Try logging in with:")
                print("  Username: admin_fallback")
                print("  Password: admin123")

    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    create_final_user()