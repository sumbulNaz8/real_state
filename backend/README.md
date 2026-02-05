# Kings Builder Real Estate Management System - Backend

This is the backend component of the Kings Builder Real Estate Management System, built with FastAPI and PostgreSQL.

## Overview

The Kings Builder backend is a comprehensive real estate management system designed specifically for the Karachi property market. It provides APIs for managing properties, bookings, payments, and more.

## Features

- **Multi-tenant architecture** supporting multiple builder organizations
- **Role-based access control** (Master Admin, Super Admin, Admin, Sales Agent, Investor)
- **Comprehensive property management** for plots, files, flats, villas, and commercial units
- **Booking and payment processing** with installment management
- **Investor consent system** for locked inventory
- **Transfer management** for property ownership changes
- **Reporting system** with various analytical reports
- **Auto-generated IDs** in Karachi market format (KB-BLD-001, KB-PRJ-HS-001, etc.)

## Technology Stack

- **Framework**: FastAPI (Python 3.9+)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with refresh tokens
- **Caching**: Redis (optional)
- **Documentation**: Automatic OpenAPI/Swagger docs

## Setup Instructions

### Prerequisites
- Python 3.9 or higher
- PostgreSQL database
- pip package manager

### How to run locally

1. Clone the repository:
```bash
git clone <repository-url>
cd kings-builder/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run database setup script:
```bash
python db_setup.py
```

6. Start the server:
```bash
uvicorn main:app --reload
```

## Database Setup Steps

1. Ensure PostgreSQL is installed and running
2. Create a database for the application
3. Update the DATABASE_URL in your .env file
4. Run the database setup script: `python db_setup.py`
5. The script will:
   - Check PostgreSQL connection
   - Create database tables if not exists
   - Run initial migrations
   - Create master admin user with credentials from .env

## Environment Variables Explanation

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql+asyncpg://username:password@localhost/kings_builder_db

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080,https://yourdomain.com

# Master Admin Credentials
MASTER_ADMIN_USERNAME=scitforte
MASTER_ADMIN_EMAIL=admin@scitforte.com
MASTER_ADMIN_PASSWORD=ScitForte@2026

# Business Rules
DEFAULT_HOLD_EXPIRY_HOURS=168
MAX_HOLD_EXTENSION_HOURS=336
TRANSFER_FEE_PERCENTAGE=2.0

# Email Configuration (Optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Upload Settings
MAX_FILE_SIZE=10485760
```

## API Documentation Link

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Project Structure

```
backend/
├── main.py                 # Main application file with middleware and error handling
├── db_setup.py             # Database setup script
├── core/                   # Core configurations and utilities
│   ├── config.py          # Application settings
│   ├── database.py        # Database configuration
│   └── security.py        # Authentication and authorization
├── models/                 # SQLAlchemy models
├── schemas/                # Pydantic schemas
├── api/
│   └── v1/
│       └── routers/        # API route definitions
├── utils/                  # Utility functions
├── middleware/             # Custom middleware
│   ├── cors_middleware.py # CORS handling
│   └── logging_middleware.py # Request logging
├── business_logic/         # Business rule implementations
│   └── inventory_rules.py # Inventory business logic
├── exceptions/             # Custom exception classes
├── alembic/               # Database migrations
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Database Models

The system includes the following main models:

- **User**: System users with different roles
- **Builder**: Builder organizations (managed by Master Admin) with KB-BLD-XXX format IDs
- **Project**: Real estate projects with KB-PRJ-HS-XXX format IDs
- **Inventory**: Properties (plots, files, flats, villas, commercial) with INV-XXXX format IDs
- **Customer**: Property buyers with CUST-XXXXX format IDs
- **Booking**: Property bookings with BOOK-XXXXX format IDs
- **Payment**: Payment records with PMT-XXXXX format IDs
- **Installment**: Installment schedules with INST-XXXXX format IDs
- **Investor**: Property investors with INVSTR-XXXX format IDs
- **Transfer**: Property transfers between customers with XFER-XXXXX format IDs

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Token refresh

### Users
- `GET /api/v1/users/` - List users
- `POST /api/v1/users/` - Create user
- `GET /api/v1/users/{id}` - Get user
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Deactivate user

### Builders (Master Admin only)
- `GET /api/v1/builders/` - List builders
- `POST /api/v1/builders/` - Create builder with KB-BLD-XXX format ID
- `GET /api/v1/builders/{id}` - Get builder
- `PUT /api/v1/builders/{id}` - Update builder
- `DELETE /api/v1/builders/{id}` - Deactivate builder

### Projects
- `GET /api/v1/projects/` - List projects
- `POST /api/v1/projects/` - Create project with KB-PRJ-HS-XXX format ID
- `GET /api/v1/projects/{id}` - Get project
- `PUT /api/v1/projects/{id}` - Update project
- `DELETE /api/v1/projects/{id}` - Cancel project

### Inventory
- `GET /api/v1/inventory/` - List inventory
- `POST /api/v1/inventory/` - Create inventory item with INV-XXXX format ID
- `GET /api/v1/inventory/{id}` - Get inventory item
- `PUT /api/v1/inventory/{id}` - Update inventory item
- `PATCH /api/v1/inventory/{id}/hold` - Place hold with auto-expiry
- `PATCH /api/v1/inventory/{id}/lock` - Lock/unlock for investor consent

### Bookings
- `GET /api/v1/bookings/` - List bookings
- `POST /api/v1/bookings/` - Create booking with BOOK-XXXXX format ID
- `GET /api/v1/bookings/{id}` - Get booking
- `PUT /api/v1/bookings/{id}` - Update booking
- `PATCH /api/v1/bookings/{id}/cancel` - Cancel booking

### Customers
- `GET /api/v1/customers/` - List customers
- `POST /api/v1/customers/` - Create customer with CUST-XXXXX format ID
- `GET /api/v1/customers/{id}` - Get customer
- `PUT /api/v1/customers/{id}` - Update customer

### Payments
- `GET /api/v1/payments/` - List payments
- `POST /api/v1/payments/` - Create payment with PMT-XXXXX format ID
- `GET /api/v1/payments/{id}` - Get payment
- `PUT /api/v1/payments/{id}` - Update payment

### Reports
- `GET /api/v1/reports/sales-summary` - Sales summary report
- `GET /api/v1/reports/inventory-status` - Inventory status report
- `GET /api/v1/reports/customer-ledger` - Customer ledger report
- `GET /api/v1/reports/payment-collection` - Payment collection report

## Business Logic Implemented

- **Auto-generate IDs**: KB-BLD-001, KB-PRJ-HS-001, INV-0001, BOOK-00001 formats
- **Builder project limit enforcement**: Prevents exceeding max_projects
- **Investor consent validation**: Requires approval for locked inventory
- **Hold auto-expiry logic**: Automatically expires holds after configured time
- **Status transition validation**: Enforces Available → Hold → Booked sequence
- **Prevent double booking**: Checks for existing bookings before allowing new ones

## Error Handling

- Custom exception handlers for business logic errors
- Proper HTTP status codes
- Validation error responses
- Database error handling
- Comprehensive error logging

## Middleware

- CORS configuration for cross-origin requests
- Request logging with timing and user agent info
- Error logging for debugging
- Authentication middleware for role-based access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.