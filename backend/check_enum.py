#!/usr/bin/env python3
"""
Script to check the available enum values in the database
"""

import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool

def check_enum_values():
    print("Connecting to database...")

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
        with engine.connect() as conn:
            # Query to see available enum values
            result = conn.execute(text("""
                SELECT unnest(enum_range(NULL::userrole)) as enum_value;
            """))

            print("Available enum values in userrole enum:")
            for row in result:
                if row[0] is not None:  # Skip the NULL value
                    print(f"  - '{row[0]}'")

            print("\nChecking all user records:")
            result = conn.execute(text("SELECT id, username, email, role, first_name, last_name, status FROM users"))
            for row in result:
                print(f"  ID: {row[0]}, Username: {row[1]}, Role: {row[3]}, Status: {row[6]}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_enum_values()