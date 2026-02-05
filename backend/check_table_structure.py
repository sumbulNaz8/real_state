#!/usr/bin/env python3
"""
Script to check the users table structure
"""

import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from sqlalchemy import create_engine, text, MetaData, Table
from sqlalchemy.pool import NullPool

def check_table_structure():
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
            # Query to see table structure
            result = conn.execute(text("""
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = 'users'
                ORDER BY ordinal_position;
            """))

            print("Users table structure:")
            for row in result:
                print(f"  {row[0]}: {row[1]}, nullable: {row[2]}, default: {row[3]}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_table_structure()