#!/usr/bin/env python3
"""
Server startup script with proper environment loading order
"""

import os
import sys

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

# Load environment variables FIRST, before any other imports
from dotenv import load_dotenv
load_dotenv()

# Now import and run the main application
if __name__ == "__main__":
    import uvicorn
    from main import app

    uvicorn.run(
        "server_starter:app",  # Use this module's app reference
        host="0.0.0.0",
        port=8000,
        reload=True
    )
else:
    # Import the main app after environment is loaded
    from main import app