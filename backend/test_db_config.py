#!/usr/bin/env python3
"""
Test script to diagnose database configuration issues
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

print("Environment loaded. Checking DATABASE_URL:")
from core.config import settings
print(f"DATABASE_URL: {settings.DATABASE_URL}")

# Test engine creation
from sqlalchemy.ext.asyncio import create_async_engine
try:
    print("Attempting to create async engine...")
    engine = create_async_engine(settings.DATABASE_URL)
    print("Engine created successfully!")
    print(f"Engine class: {type(engine)}")
    print(f"Engine URL: {engine.url}")

    # Try to inspect the URL to see the driver name
    print(f"Driver name: {engine.url.drivername}")

except Exception as e:
    print(f"Engine creation failed: {e}")
    import traceback
    traceback.print_exc()