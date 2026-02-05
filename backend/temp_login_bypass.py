#!/usr/bin/env python3
"""
Temporary login bypass for development
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from core.security import create_access_token, create_refresh_token
from datetime import timedelta
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
import uuid

def create_temp_token():
    """Create a temporary token for development access"""

    # Create access token
    access_token_expires = timedelta(minutes=60)  # 1 hour for development
    access_token = create_access_token(
        data={"sub": "admin_dev", "role": "MASTER_ADMIN"},
        expires_delta=access_token_expires
    )

    # Create refresh token
    refresh_token_expires = timedelta(days=7)  # 7 days for development
    refresh_token = create_refresh_token(
        data={"sub": "admin_dev", "role": "MASTER_ADMIN"},
        expires_delta=refresh_token_expires
    )

    token_response = {
        "success": True,
        "message": "Development login successful (temporary bypass)",
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": str(uuid.uuid4()),
                "username": "admin_dev",
                "email": "admin_dev@kingsbuilder.com",
                "first_name": "Dev",
                "last_name": "Admin",
                "role": "MASTER_ADMIN",
                "builder_id": None
            }
        }
    }

    print("Temporary Development Token Created:")
    print("=" * 50)
    print(f"Access Token: {access_token}")
    print(f"Refresh Token: {refresh_token}")
    print("Username: admin_dev")
    print("Role: MASTER_ADMIN")
    print("\nUse this token in your frontend development:")
    print("Authorization header: Bearer <access_token>")
    print("=" * 50)

    return token_response

if __name__ == "__main__":
    create_temp_token()