from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
from starlette.exceptions import HTTPException as StarletteHTTPException
import uvicorn
import os
from dotenv import load_dotenv
import traceback

# Load environment variables first, before importing modules that depend on settings
load_dotenv()

# Import settings after environment is loaded
from core.config import settings

# Import routers
from api.v1.routers import auth, users, builders, projects, inventory, investors, bookings, customers, payments, installments, transfers, reports
from api.v1.routers.dev_auth import router as dev_auth_router
# Import other modules after settings are loaded
from core.security import pwd_context
from utils.logger import logger
from middleware.logging_middleware import LoggingMiddleware
from exceptions import *
from core.database import Base, init_database
from core.database import engine as db_engine
from models.user import User, UserRole
from sqlalchemy import select, insert

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager
    """
    # Startup
    logger.info("Initializing Kings Builder backend...")

    try:
        # Initialize the database engine
        init_database()

        # Test database connection
        try:
            from core.database import engine
            from sqlalchemy import text
            async with engine.connect() as conn:
                result = await conn.execute(text("SELECT 1"))
                print("SUCCESS: DATABASE CONNECTED SUCCESSFULLY")
        except Exception as e:
            print(f"ERROR: DATABASE CONNECTION FAILED: {e}")
            raise

        # Check if tables exist
        try:
            from core.database import engine
            from sqlalchemy import inspect
            async with engine.connect() as conn:
                inspector = inspect(conn)
                tables = inspector.get_table_names()
                print(f"TABLES IN DATABASE: {tables}")
        except Exception as e:
            print(f"ERROR: TABLE CHECK FAILED: {e}")

        # Import the updated engine after initialization
        from core.database import engine
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        # Create default super admin if not exists
        logger.info("Checking for master admin user...")
        async with engine.begin() as conn:
            result = await conn.execute(
                select(User).where(User.username == settings.MASTER_ADMIN_USERNAME)
            )
            existing_user = result.scalar_one_or_none()

            if not existing_user:
                logger.info("Creating master admin user...")
                try:
                    hashed_password = pwd_context.hash(settings.MASTER_ADMIN_PASSWORD)
                    super_admin = User(
                        username=settings.MASTER_ADMIN_USERNAME,
                        email=settings.MASTER_ADMIN_EMAIL,
                        password_hash=hashed_password,
                        first_name="Master",
                        last_name="Admin",
                        role=UserRole.MASTER_ADMIN,
                        status="active"
                    )
                    # Insert the new user
                    from sqlalchemy import insert
                    stmt = insert(User).values(
                        username=super_admin.username,
                        email=super_admin.email,
                        password_hash=super_admin.password_hash,
                        first_name=super_admin.first_name,
                        last_name=super_admin.last_name,
                        role=super_admin.role,
                        status=super_admin.status
                    )
                    await conn.execute(stmt)
                    await conn.commit()
                    logger.info(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' created successfully")
                except Exception as e:
                    logger.error(f"Error creating master admin: {e}")
                    logger.warning("Master admin creation failed, may need to create manually")
            else:
                logger.info(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' already exists")

        logger.info("Database tables created and super admin initialized")
    except Exception as e:
        logger.error(f"Error during application startup: {e}")
        logger.warning("Continuing startup despite database initialization error")
        # Re-raise the exception to prevent the app from starting with a broken database
        raise

    yield

    # Shutdown
    logger.info("Shutting down Kings Builder backend...")

# Initialize FastAPI app
app = FastAPI(
    title="Kings Builder Real Estate Management System",
    description="Complete backend for managing real estate properties in Karachi market",
    version="1.0.0",
    lifespan=lifespan
)

# Add custom middleware
app.add_middleware(LoggingMiddleware)

# Add CORS middleware with logging
logger.info(f"CORS Origins configured: {settings.BACKEND_CORS_ORIGINS}")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS if settings.BACKEND_CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose custom headers
    expose_headers=["Access-Control-Allow-Origin", "Authorization"]
)

# Exception handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": f"HTTP {exc.status_code} error occurred"
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(f"Validation Error: {exc}")
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation error",
            "message": "Request validation failed",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"General Exception: {str(exc)}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "message": str(exc),  # This will show EXACT error
            "traceback": traceback.format_exc()  # This shows where error is
        }
    )

# Custom exception handlers for business logic
@app.exception_handler(BuilderLimitExceededException)
async def handle_builder_limit_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Builder project limit exceeded"
        }
    )

@app.exception_handler(InvestorConsentRequiredException)
async def handle_investor_consent_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Investor consent required"
        }
    )

@app.exception_handler(HoldExpiredException)
async def handle_hold_expired_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Hold period expired"
        }
    )

@app.exception_handler(InvalidStatusTransitionException)
async def handle_invalid_status_transition_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Invalid status transition"
        }
    )

@app.exception_handler(DoubleBookingException)
async def handle_double_booking_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Double booking attempt"
        }
    )

# Include API routes
logger.info("Registering authentication routes...")
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
logger.info("Auth router registered at /api/v1/auth")

app.include_router(dev_auth_router, prefix="/api/v1/dev-auth", tags=["Development Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(builders.router, prefix="/api/v1/builders", tags=["Builders"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["Inventory"])
app.include_router(investors.router, prefix="/api/v1/investors", tags=["Investors"])
app.include_router(bookings.router, prefix="/api/v1/bookings", tags=["Bookings"])
app.include_router(customers.router, prefix="/api/v1/customers", tags=["Customers"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(installments.router, prefix="/api/v1/installments", tags=["Installments"])
app.include_router(transfers.router, prefix="/api/v1/transfers", tags=["Transfers"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])

# Log registered routes for debugging
logger.info("Registered routes:")
for route in app.routes:
    if hasattr(route, 'methods') and hasattr(route, 'path'):
        logger.info(f"  {route.methods} {route.path}")

@app.get("/")
async def root():
    """Root endpoint - redirects to API documentation"""
    return RedirectResponse(url="/docs")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Kings Builder Backend"}

@app.get("/debug/routes")
async def debug_routes():
    """Debug endpoint to list all registered routes"""
    routes_info = []
    for route in app.routes:
        if hasattr(route, 'methods') and hasattr(route, 'path'):
            routes_info.append({
                "methods": list(route.methods),
                "path": route.path
            })
    return {"routes": routes_info}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )