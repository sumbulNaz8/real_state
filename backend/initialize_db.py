import asyncio
import sqlite3
from core.config import settings
from core.security import pwd_context
import os

def init_sqlite_db():
    """Initialize SQLite database and create master admin user"""

    # Create database file if it doesn't exist
    db_path = "kings_builder_test.db"

    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create users table (basic structure)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        role TEXT,
        status TEXT DEFAULT 'active',
        builder_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()  # Commit table creation

    # Check if master admin already exists
    cursor.execute("SELECT id FROM users WHERE username = ?", (settings.MASTER_ADMIN_USERNAME,))
    existing_user = cursor.fetchone()

    if existing_user:
        print(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' already exists!")
    else:
        # Hash the password - handle bcrypt issues
        try:
            hashed_password = pwd_context.hash(settings.MASTER_ADMIN_PASSWORD)
        except Exception as e:
            print(f"Bcrypt error: {e}. Using plain password for testing only!")
            # For testing purposes only - in production, proper hashing is essential
            hashed_password = settings.MASTER_ADMIN_PASSWORD

        # Insert master admin user
        cursor.execute("""
        INSERT INTO users (username, email, password_hash, first_name, last_name, role, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            settings.MASTER_ADMIN_USERNAME,
            settings.MASTER_ADMIN_EMAIL,
            hashed_password,
            "Master",
            "Admin",
            "master_admin",
            "active"
        ))

        conn.commit()
        print(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' created successfully!")

    conn.close()
    print("Database initialized!")

if __name__ == "__main__":
    init_sqlite_db()