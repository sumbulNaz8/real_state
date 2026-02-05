# Software Requirements Specification (SRS)
## Kings Builder - Real Estate Management System

**Document Version:** 1.0
**Date:** January 27, 2026
**Project:** Kings Builder - Property Management System
**Prepared by:** Real Estate Management Team

---

## 1. EXECUTIVE SUMMARY

### 1.1 Project Purpose and Scope
The Kings Builder Real Estate Management System is a comprehensive multi-tenant platform designed specifically for the Karachi property market. The system enables efficient management of real estate assets including plots, files, flats, villas, and commercial units across multiple builder organizations. The platform supports a hierarchical structure with Master Admin (ScitForte) managing multiple Builder accounts, each managing their own projects and inventory.

**Key Objectives:**
- Streamline real estate inventory management
- Enable secure booking and payment processing
- Support investor participation with consent mechanisms
- Provide comprehensive reporting and analytics
- Facilitate property transfers and installment management

### 1.2 Key Stakeholders
- **Master Admin (ScitForte):** System owner, manages Builder accounts
- **Super Admin (Kings Builder):** Primary Builder account (ID: KB-BLD-001)
- **Builder Administrators:** Manage individual builder organizations
- **Sales Agents:** Handle day-to-day sales activities
- **Investors:** Property stakeholders with consent rights
- **Customers:** End buyers of properties

### 1.3 Success Criteria
- Efficient inventory management across multiple property types
- Secure and auditable booking processes
- Real-time status tracking (Available/Green, On Hold/Yellow, Booked/Red)
- Investor consent integration
- Comprehensive reporting and analytics
- Scalable architecture supporting multiple tenants

---

## 2. SYSTEM ARCHITECTURE

### 2.1 High-Level Architecture Description
The system follows a modern microservices architecture with a Python-based backend API serving a Next.js frontend application. The architecture consists of:

- **Presentation Layer:** Next.js frontend with responsive UI
- **API Gateway:** RESTful API layer with authentication and rate limiting
- **Business Logic Layer:** Python services handling core functionality
- **Data Layer:** PostgreSQL database with Redis for caching
- **Integration Layer:** Payment gateways, email services, and third-party APIs
- **Security Layer:** Authentication, authorization, and audit logging

### 2.2 Technology Stack
- **Backend:** Python 3.9+ with FastAPI/Django REST Framework
- **Frontend:** Next.js 14+ with TypeScript
- **Database:** PostgreSQL 14+
- **Caching:** Redis
- **Authentication:** JWT with refresh tokens
- **File Storage:** AWS S3 or similar cloud storage
- **Message Queue:** Celery with Redis/RabbitMQ
- **Monitoring:** Prometheus + Grafana
- **Deployment:** Docker containers with Kubernetes orchestration

### 2.3 Authentication & Authorization Flow
1. User authenticates via username/password or social login
2. JWT token is generated with user role and permissions
3. Token is validated on each API request
4. Role-based access control (RBAC) enforces permissions
5. Session management with refresh token rotation
6. Multi-factor authentication for admin roles

### 2.4 API Architecture
- **RESTful API Design:** Standard HTTP methods and status codes
- **Versioning:** API version in URL path (e.g., /api/v1/)
- **Rate Limiting:** Per-user and per-IP rate limiting
- **Pagination:** Standard pagination for list endpoints
- **Filtering & Sorting:** Query parameters for data manipulation
- **Error Handling:** Consistent error response format

---

## 3. USER ROLES & PERMISSIONS

### 3.1 Master Admin (ScitForte)
- **Description:** System owner with highest privileges
- **Permissions:**
  - Create/delete builder accounts
  - System-wide configuration
  - Access to all reports across builders
  - User management across the system

### 3.2 Super Admin (Builder)
- **Description:** Primary builder account (KB-BLD-001)
- **Permissions:**
  - Full access to their builder organization
  - Create/manage projects and inventory
  - Manage users within their organization
  - Financial reporting and analytics

### 3.3 Admin
- **Description:** Organization-level administrator
- **Permissions:**
  - Manage projects and inventory within assigned builder
  - Manage sales agents and lower-level users
  - Access to financial reports
  - Configure business rules and settings

### 3.4 Sales Agent
- **Description:** Frontline sales personnel
- **Permissions:**
  - View and book inventory
  - Manage customer relationships
  - Process payments and installments
  - Generate basic reports

### 3.5 Investor (Read-Only)
- **Description:** Property stakeholder
- **Permissions:**
  - View assigned inventory
  - Approve/deny hold requests
  - View payment status for their investments
  - Limited reporting access

### 3.6 Access Matrix

| Feature | Master Admin | Super Admin | Admin | Sales Agent | Investor |
|---------|--------------|-------------|-------|-------------|----------|
| User Management | Full | Full | Partial | None | None |
| Project Management | View All | Full | Full | Read | Read |
| Inventory Management | View All | Full | Full | Create Hold | View Assigned |
| Booking Management | View All | Full | Full | Full | Consent Required |
| Payment Processing | View All | Full | Full | Full | View Only |
| Reporting | All Reports | All Reports | Most Reports | Basic Reports | Limited Reports |
| Investor Management | View All | Full | Full | None | Self-View |

---

## 4. COMPLETE DATABASE SCHEMA

### 4.1 users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL, -- 'master_admin', 'super_admin', 'admin', 'sales_agent', 'investor'
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'suspended'
    builder_id UUID REFERENCES builders(id),
    investor_id UUID REFERENCES investors(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_builder_id ON users(builder_id);
CREATE INDEX idx_users_role ON users(role);
```

### 4.2 builders Table
```sql
CREATE TABLE builders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    max_projects INTEGER DEFAULT 10,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'suspended', 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_builders_name ON builders(name);
CREATE INDEX idx_builders_registration ON builders(registration_number);
```

### 4.3 projects Table
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    builder_id UUID NOT NULL REFERENCES builders(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location TEXT,
    city VARCHAR(100),
    total_units INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'completed', 'cancelled'
    start_date DATE,
    expected_completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_projects_builder_id ON projects(builder_id);
CREATE INDEX idx_projects_name ON projects(name);
CREATE INDEX idx_projects_city ON projects(city);
```

### 4.4 phases_blocks Table
```sql
CREATE TABLE phases_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    name VARCHAR(255) NOT NULL, -- e.g., "Phase 1", "Block A"
    description TEXT,
    total_units INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_phases_blocks_project_id ON phases_blocks(project_id);
```

### 4.5 inventory Table
```sql
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    phase_block_id UUID REFERENCES phases_blocks(id),
    unit_number VARCHAR(50),
    unit_type VARCHAR(50) NOT NULL, -- 'plot', 'file', 'flat', 'villa', 'commercial'
    category VARCHAR(50), -- 'residential', 'commercial', 'agricultural'
    size DECIMAL(10,2), -- in square feet or marlas
    price DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available', -- 'available', 'on_hold', 'booked', 'sold'
    hold_expiry_date TIMESTAMP WITH TIME ZONE,
    booked_by UUID REFERENCES users(id),
    investor_locked BOOLEAN DEFAULT FALSE,
    investor_id UUID REFERENCES investors(id),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_inventory_project_id ON inventory(project_id);
CREATE INDEX idx_inventory_phase_block_id ON inventory(phase_block_id);
CREATE INDEX idx_inventory_unit_type ON inventory(unit_type);
CREATE INDEX idx_inventory_status ON inventory(status);
CREATE INDEX idx_inventory_price ON inventory(price);
CREATE INDEX idx_inventory_investor_id ON inventory(investor_id);
```

### 4.6 investors Table
```sql
CREATE TABLE investors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    cnic VARCHAR(15) UNIQUE,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_investors_name ON investors(name);
CREATE INDEX idx_investors_cnic ON investors(cnic);
```

### 4.7 investor_inventory_assignments Table
```sql
CREATE TABLE investor_inventory_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID NOT NULL REFERENCES investors(id),
    inventory_id UUID NOT NULL REFERENCES inventory(id),
    percentage_share DECIMAL(5,2) NOT NULL, -- e.g., 50.00 for 50%
    consent_required BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    UNIQUE(investor_id, inventory_id)
);

-- Indexes
CREATE INDEX idx_investor_inv_assign_investor_id ON investor_inventory_assignments(investor_id);
CREATE INDEX idx_investor_inv_assign_inventory_id ON investor_inventory_assignments(inventory_id);
```

### 4.8 bookings Table
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID NOT NULL REFERENCES inventory(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    booking_amount DECIMAL(15,2) NOT NULL,
    booking_status VARCHAR(20) NOT NULL DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'completed'
    booking_type VARCHAR(20) NOT NULL DEFAULT 'sale', -- 'hold', 'booking', 'sale'
    booking_reference VARCHAR(100) UNIQUE,
    approved_by UUID REFERENCES users(id),
    cancelled_by UUID REFERENCES users(id),
    cancellation_reason TEXT,
    cancellation_date TIMESTAMP WITH TIME ZONE,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_bookings_inventory_id ON bookings(inventory_id);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_booking_status ON bookings(booking_status);
CREATE INDEX idx_bookings_booking_type ON bookings(booking_type);
```

### 4.9 customers Table
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100),
    cnic VARCHAR(15) UNIQUE,
    contact_number VARCHAR(20) NOT NULL,
    alternate_contact VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    occupation VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_customers_cnic ON customers(cnic);
CREATE INDEX idx_customers_contact_number ON customers(contact_number);
CREATE INDEX idx_customers_full_name ON customers(first_name, last_name);
```

### 4.10 payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'cash', 'cheque', 'bank_transfer', 'online'
    payment_date DATE NOT NULL,
    reference_number VARCHAR(100),
    cheque_number VARCHAR(50),
    bank_name VARCHAR(100),
    payment_status VARCHAR(20) NOT NULL DEFAULT 'received', -- 'received', 'pending', 'rejected'
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_payment_method ON payments(payment_method);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);
CREATE INDEX idx_payments_payment_status ON payments(payment_status);
```

### 4.11 installments Table
```sql
CREATE TABLE installments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    installment_number INTEGER NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) GENERATED ALWAYS AS (amount - paid_amount) STORED,
    due_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'overdue', 'waived'
    paid_date DATE,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    UNIQUE(booking_id, installment_number)
);

-- Indexes
CREATE INDEX idx_installments_booking_id ON installments(booking_id);
CREATE INDEX idx_installments_due_date ON installments(due_date);
CREATE INDEX idx_installments_due_status ON installments(due_status);
```

### 4.12 transfers Table
```sql
CREATE TABLE transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID NOT NULL REFERENCES inventory(id),
    from_customer_id UUID NOT NULL REFERENCES customers(id),
    to_customer_id UUID NOT NULL REFERENCES customers(id),
    transfer_date DATE NOT NULL,
    transfer_fee DECIMAL(10,2),
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
    approved_by UUID REFERENCES users(id),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_transfers_inventory_id ON transfers(inventory_id);
CREATE INDEX idx_transfers_from_customer_id ON transfers(from_customer_id);
CREATE INDEX idx_transfers_to_customer_id ON transfers(to_customer_id);
CREATE INDEX idx_transfers_status ON transfers(status);
```

### 4.13 audit_logs Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    entity_type VARCHAR(50) NOT NULL, -- e.g., 'inventory', 'booking', 'payment'
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'view'
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## 5. COMPLETE API SPECIFICATIONS

### 5.1 Authentication APIs

#### POST /api/v1/auth/login
**Description:** Authenticate user and return JWT token
**Authentication:** None

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "string",
    "refresh_token": "string",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "role": "string",
      "builder_id": "uuid"
    }
  },
  "message": "Login successful"
}
```

**Response Body (401):**
```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "Username or password is incorrect"
}
```

**Status Codes:**
- 200: Login successful
- 400: Invalid request format
- 401: Invalid credentials
- 429: Too many attempts

#### POST /api/v1/auth/refresh
**Description:** Refresh access token using refresh token
**Authentication:** None

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "string"
  },
  "message": "Token refreshed successfully"
}
```

**Status Codes:**
- 200: Token refreshed
- 400: Invalid refresh token
- 401: Refresh token expired

### 5.2 Builder Management APIs

#### GET /api/v1/builders
**Description:** Get list of builders
**Authentication:** Master Admin

**Query Parameters:**
- page: integer (default: 1)
- limit: integer (default: 10)
- search: string
- status: string ('active', 'suspended', 'inactive')

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "builders": [
      {
        "id": "uuid",
        "name": "string",
        "registration_number": "string",
        "contact_person": "string",
        "contact_email": "string",
        "contact_phone": "string",
        "address": "string",
        "city": "string",
        "country": "string",
        "logo_url": "string",
        "max_projects": 10,
        "status": "string",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "Builders retrieved successfully"
}
```

#### POST /api/v1/builders
**Description:** Create new builder
**Authentication:** Master Admin

**Request Body:**
```json
{
  "name": "string",
  "registration_number": "string",
  "contact_person": "string",
  "contact_email": "string",
  "contact_phone": "string",
  "address": "string",
  "city": "string",
  "country": "string",
  "max_projects": 10
}
```

**Response Body (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "registration_number": "string",
    "contact_person": "string",
    "contact_email": "string",
    "contact_phone": "string",
    "address": "string",
    "city": "string",
    "country": "string",
    "logo_url": "string",
    "max_projects": 10,
    "status": "active",
    "created_at": "datetime",
    "updated_at": "datetime"
  },
  "message": "Builder created successfully"
}
```

### 5.3 Project Management APIs

#### GET /api/v1/projects
**Description:** Get list of projects
**Authentication:** Builder Admin or higher

**Query Parameters:**
- page: integer (default: 1)
- limit: integer (default: 10)
- search: string
- builder_id: uuid (for Master Admin)
- status: string ('active', 'completed', 'cancelled')

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "uuid",
        "builder_id": "uuid",
        "name": "string",
        "description": "string",
        "location": "string",
        "city": "string",
        "total_units": 100,
        "status": "string",
        "start_date": "date",
        "expected_completion_date": "date",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "Projects retrieved successfully"
}
```

#### POST /api/v1/projects
**Description:** Create new project
**Authentication:** Builder Admin or higher

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "location": "string",
  "city": "string",
  "total_units": 100,
  "start_date": "date",
  "expected_completion_date": "date"
}
```

### 5.4 Inventory Management APIs

#### GET /api/v1/inventory
**Description:** Get list of inventory items
**Authentication:** Authenticated user

**Query Parameters:**
- page: integer (default: 1)
- limit: integer (default: 10)
- project_id: uuid
- phase_block_id: uuid
- unit_type: string ('plot', 'file', 'flat', 'villa', 'commercial')
- status: string ('available', 'on_hold', 'booked', 'sold')
- min_price: decimal
- max_price: decimal
- search: string

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "inventory": [
      {
        "id": "uuid",
        "project_id": "uuid",
        "phase_block_id": "uuid",
        "unit_number": "string",
        "unit_type": "string",
        "category": "string",
        "size": 1200.00,
        "price": 5000000.00,
        "status": "string",
        "hold_expiry_date": "datetime",
        "investor_locked": false,
        "remarks": "string",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "Inventory retrieved successfully"
}
```

#### POST /api/v1/inventory
**Description:** Create new inventory item
**Authentication:** Admin or higher

**Request Body:**
```json
{
  "project_id": "uuid",
  "phase_block_id": "uuid",
  "unit_number": "string",
  "unit_type": "string",
  "category": "string",
  "size": 1200.00,
  "price": 5000000.00,
  "remarks": "string"
}
```

### 5.5 Sales/Booking APIs

#### POST /api/v1/bookings
**Description:** Create new booking
**Authentication:** Sales Agent or higher

**Request Body:**
```json
{
  "inventory_id": "uuid",
  "customer_id": "uuid",
  "booking_amount": 500000.00,
  "booking_type": "string",
  "remarks": "string"
}
```

**Response Body (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "inventory_id": "uuid",
    "customer_id": "uuid",
    "booking_date": "datetime",
    "booking_amount": 500000.00,
    "booking_status": "confirmed",
    "booking_type": "booking",
    "booking_reference": "string",
    "approved_by": "uuid",
    "remarks": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  },
  "message": "Booking created successfully"
}
```

### 5.6 Investor Management APIs

#### GET /api/v1/investors
**Description:** Get list of investors
**Authentication:** Admin or higher

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "investors": [
      {
        "id": "uuid",
        "name": "string",
        "company_name": "string",
        "cnic": "string",
        "contact_person": "string",
        "contact_email": "string",
        "contact_phone": "string",
        "address": "string",
        "city": "string",
        "country": "string",
        "status": "string",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "Investors retrieved successfully"
}
```

### 5.7 Payment/Installment APIs

#### POST /api/v1/payments
**Description:** Record new payment
**Authentication:** Sales Agent or higher

**Request Body:**
```json
{
  "booking_id": "uuid",
  "amount": 500000.00,
  "payment_method": "string",
  "payment_date": "date",
  "reference_number": "string",
  "remarks": "string"
}
```

### 5.8 Transfer APIs

#### POST /api/v1/transfers
**Description:** Create transfer request
**Authentication:** Customer or authorized agent

**Request Body:**
```json
{
  "inventory_id": "uuid",
  "from_customer_id": "uuid",
  "to_customer_id": "uuid",
  "transfer_fee": 50000.00,
  "remarks": "string"
}
```

### 5.9 Reports APIs

#### GET /api/v1/reports/sales-summary
**Description:** Get sales summary report
**Authentication:** Admin or higher

**Query Parameters:**
- start_date: date
- end_date: date
- project_id: uuid
- builder_id: uuid (Master Admin only)

**Response Body (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_sales": 10000000.00,
      "total_bookings": 10,
      "total_payments": 8000000.00,
      "pending_installments": 2000000.00
    },
    "details": [
      {
        "date": "date",
        "sales_amount": 1000000.00,
        "bookings_count": 2
      }
    ]
  },
  "message": "Sales summary report retrieved successfully"
}
```

---

## 6. BUSINESS RULES & VALIDATION

### 6.1 Builder Project Limits
- Each builder has a maximum project limit defined in their account
- Master Admin can modify these limits based on subscription tier
- New projects cannot be created if limit is reached
- Exception process requires Master Admin approval

### 6.2 Inventory Status Transitions
- **Available → On Hold:** Requires investor consent if locked
- **On Hold → Booked:** Within hold expiry period or extended with approval
- **Booked → Sold:** After full payment or agreed payment schedule
- **Any → Cancelled:** With proper cancellation process and refunds
- Status changes must be logged in audit trail

### 6.3 Hold Expiry Rules
- Default hold expiry: 7 days from hold creation
- Extensions possible with admin approval
- Maximum extension: 14 additional days
- Automatic release after expiry if not extended
- Investor notification required for hold extensions

### 6.4 Investor Consent Requirements
- Investor must approve any hold request on locked inventory
- Consent must be obtained within 24 hours
- Automatic denial if no response within timeframe
- Investor can withdraw consent before booking confirmation
- Multiple investors require unanimous consent

### 6.5 Payment Validation Rules
- Payment amounts cannot exceed remaining balance
- Installment due dates cannot be in the past
- Late payment fees calculated automatically
- Partial payments allowed with proper allocation
- Payment methods validated against system settings

### 6.6 Transfer Rules
- Property must be in "Booked" or "Sold" status
- Both parties must provide valid identification
- Transfer fee calculation based on property value
- Approval required from designated authority
- Existing payments transferred to new owner

### 6.7 Cancellation & Refund Rules
- Cancellation fees apply based on timeline
- Refunds processed within 7-14 business days
- Documentation required for all cancellations
- Partial refunds calculated based on completed payments
- Company reserves right to deny cancellation in certain cases

---

## 7. USER STORIES

### 7.1 Builder Creation Stories
- **As a** Master Admin, **I want to** create new builder accounts, **so that** they can manage their own real estate projects independently.
- **As a** Master Admin, **I want to** set project limits for each builder, **so that** system resources are allocated appropriately.
- **As a** Master Admin, **I want to** suspend builder accounts when needed, **so that** I can maintain system integrity.

### 7.2 Project Creation Stories
- **As a** Super Admin, **I want to** create new projects with details, **so that** I can organize my inventory effectively.
- **As an** Admin, **I want to** assign phases and blocks to projects, **so that** inventory can be organized systematically.
- **As a** Sales Agent, **I want to** view project information, **so that** I can provide accurate information to customers.

### 7.3 Inventory Management Stories
- **As an** Admin, **I want to** add new inventory items with all details, **so that** they can be sold to customers.
- **As a** Sales Agent, **I want to** search and filter inventory, **so that** I can find suitable properties for customers quickly.
- **As an** Investor, **I want to** see properties assigned to me, **so that** I can monitor my investments.

### 7.4 Sales & Booking Stories
- **As a** Sales Agent, **I want to** place holds on available properties, **so that** customers can consider them without losing availability.
- **As a** Sales Agent, **I want to** create formal bookings, **so that** sales can be processed officially.
- **As a** Customer, **I want to** make payments toward my booking, **so that** I can fulfill my purchase commitment.

### 7.5 Investor Management Stories
- **As an** Investor, **I want to** approve or deny hold requests, **so that** I maintain control over my investments.
- **As an** Admin, **I want to** assign inventory to investors, **so that** profit sharing can be managed correctly.
- **As an** Investor, **I want to** view payment status for my assigned properties, **so that** I can track returns.

### 7.6 Reporting Stories
- **As a** Super Admin, **I want to** generate sales reports, **so that** I can analyze business performance.
- **As an** Admin, **I want to** view inventory status reports, **so that** I can plan marketing strategies.
- **As a** Sales Agent, **I want to** see my sales performance, **so that** I can track my achievements.

---

## 8. DATA FLOW DIAGRAMS

### 8.1 Builder Creation Process
1. Master Admin accesses builder management interface
2. Fills in builder details (name, contact info, limits)
3. System validates input data
4. Creates builder record in database
5. Generates unique builder ID (KB-BLD-XXX format)
6. Sends welcome notification to builder contact
7. Builder can now create projects within limits

### 8.2 Project Creation Process
1. Builder Admin accesses project creation interface
2. Enters project details (name, location, specifications)
3. System checks project limit against builder quota
4. Validates input data and creates project record
5. Assigns unique project ID
6. Updates builder project count
7. Project becomes available for inventory assignment

### 8.3 Inventory Creation Process
1. Admin accesses inventory management interface
2. Selects project and phase/block for new inventory
3. Enters property details (type, size, price, unit number)
4. System validates pricing against market standards
5. Creates inventory record with "Available" status
6. Assigns unique inventory ID
7. Property becomes available for sales activities

### 8.4 Booking Process (Available → Hold → Booked)
1. Sales Agent identifies available property for customer
2. Places hold request (status changes to "On Hold")
3. System checks if investor consent required
4. If required, sends consent request to investor
5. Investor approves or denies hold request
6. If approved, hold remains active until expiry
7. Sales Agent creates formal booking before expiry
8. Status changes to "Booked" with booking details
9. Customer proceeds with payment schedule

### 8.5 Transfer Process
1. Current owner initiates transfer request
2. Specifies new owner and property details
3. System validates property status (must be booked/sold)
4. Calculates transfer fees based on property value
5. Both parties provide required documentation
6. Transfer request submitted for approval
7. Authorized personnel reviews and approves
8. Ownership transferred in system
9. Payments reassigned to new owner

### 8.6 Payment/Installment Process
1. Customer accesses payment portal or visits office
2. System retrieves outstanding payment schedule
3. Customer selects installment to pay
4. Payment processed through selected method
5. System updates payment record and balances
6. Receipt generated and sent to customer
7. Installment status updated (paid/overdue)
8. Reports updated with new payment information

---

## 9. SECURITY REQUIREMENTS

### 9.1 Authentication Mechanism
- JWT (JSON Web Tokens) with refresh token rotation
- Strong password policies (minimum 8 characters, mixed case, numbers, symbols)
- Multi-factor authentication for admin roles
- Account lockout after multiple failed attempts
- Session timeout after inactivity periods

### 9.2 Password Policies
- Minimum 8 characters with uppercase, lowercase, number, and symbol
- Password history: Prevent reuse of last 5 passwords
- Password expiration: 90 days
- Prohibit common passwords and dictionary words
- Force password change on first login

### 9.3 Role-Based Access Control (RBAC)
- Hierarchical role structure with inheritance
- Principle of least privilege
- Regular access reviews and audits
- Temporary access grants with expiration
- Segregation of duties for sensitive operations

### 9.4 API Security
- Rate limiting to prevent abuse
- Input validation and sanitization
- SQL injection prevention
- Cross-site scripting (XSS) protection
- Cross-site request forgery (CSRF) protection
- Secure transmission with HTTPS/TLS

### 9.5 Data Encryption
- At-rest encryption for sensitive data (PII, financial)
- In-transit encryption for all communications
- Encryption key management with rotation
- Secure storage of API keys and credentials
- Database connection encryption

### 9.6 Audit Logging
- Comprehensive audit trail for all operations
- Immutable logs with tamper-evident measures
- Regular log review and monitoring
- Compliance reporting capabilities
- Integration with SIEM tools

---

## 10. REPORTING REQUIREMENTS

### 10.1 Sales Performance Report
- **Filters:** Date range, project, sales agent, product type
- **Data Fields:** Total sales, units sold, average price, commission
- **Export Formats:** PDF, Excel, CSV
- **Frequency:** Daily, weekly, monthly

### 10.2 Inventory Status Report
- **Filters:** Project, phase/block, status, property type
- **Data Fields:** Total units, available, on hold, booked, sold
- **Export Formats:** PDF, Excel
- **Frequency:** Real-time, daily summary

### 10.3 Customer Ledger Report
- **Filters:** Customer, date range, project
- **Data Fields:** Outstanding balance, payment history, booking details
- **Export Formats:** PDF, Excel
- **Frequency:** On-demand

### 10.4 Payment Collection Report
- **Filters:** Date range, payment method, project
- **Data Fields:** Total collections, pending payments, overdue amounts
- **Export Formats:** PDF, Excel, CSV
- **Frequency:** Daily, weekly, monthly

### 10.5 Investor Profit Share Report
- **Filters:** Investor, date range, property
- **Data Fields:** Profit share, payment status, investment percentage
- **Export Formats:** PDF, Excel
- **Frequency:** Monthly, quarterly

### 10.6 Commission Report
- **Filters:** Sales agent, date range, project
- **Data Fields:** Sales amount, commission rate, commission earned
- **Export Formats:** PDF, Excel
- **Frequency:** Bi-weekly, monthly

### 10.7 Transfer Activity Report
- **Filters:** Date range, property type, status
- **Data Fields:** Transfer fees, parties involved, approval status
- **Export Formats:** PDF, Excel
- **Frequency:** Weekly, monthly

---

## 11. NON-FUNCTIONAL REQUIREMENTS

### 11.1 Performance Requirements
- Page load time: Under 2 seconds for 95% of requests
- API response time: Under 500ms for 95% of requests
- Database query time: Under 200ms for simple queries
- Concurrent user support: 1000+ simultaneous users
- Search functionality: Results in under 1 second

### 11.2 Scalability Requirements
- Horizontal scaling capability
- Support for 10,000+ concurrent users
- Handle 1 million+ inventory records
- Auto-scaling based on demand
- Load balancing across multiple instances

### 11.3 Availability Requirements
- System uptime: 99.9% annually
- Planned maintenance windows: 4 hours monthly
- Disaster recovery: RTO < 4 hours, RPO < 1 hour
- Backup frequency: Daily with point-in-time recovery
- Geographic redundancy for critical data

### 11.4 Browser Compatibility
- Chrome: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions
- Mobile browsers: iOS Safari, Android Chrome

### 11.5 Mobile Responsiveness
- Responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized for mobile performance
- Progressive Web App (PWA) capabilities
- Offline functionality for essential features

---

## 12. ASSUMPTIONS & CONSTRAINTS

### 12.1 Technical Assumptions
- Stable internet connectivity at all user locations
- Modern browsers with JavaScript enabled
- Adequate server infrastructure for expected load
- Third-party services (payment gateways) remain available
- Cloud storage providers maintain service availability

### 12.2 Business Assumptions
- Karachi real estate market regulations remain stable
- Builder organizations will adopt digital processes
- Customers prefer online payment methods
- Investor participation model will be accepted
- Property documentation will be digitized

### 12.3 Known Limitations
- Initial version supports only Karachi market terminology
- Currency support limited to Pakistani Rupee (PKR)
- Language support initially English only
- Integration with legacy systems may require custom development
- Advanced reporting features may need premium licensing

---

## 13. GLOSSARY

### 13.1 Karachi Market Terminology
- **Plot:** Land parcel for residential/commercial construction
- **File:** Pre-approved property document with possession rights
- **Marla:** Traditional land measurement unit (272.25 sq ft)
- **Kanal:** Larger land measurement unit (20 Marlas)
- **Possession:** Actual physical handover of property
- **Allotment:** Assignment of property to buyer
- **Mutation:** Legal transfer of property ownership
- **Development Charges:** Fees for infrastructure development
- **Utility Bills:** Water, electricity, gas connection charges

### 13.2 Technical Terms
- **API:** Application Programming Interface
- **JWT:** JSON Web Token for authentication
- **RBAC:** Role-Based Access Control
- **SaaS:** Software as a Service
- **PWA:** Progressive Web Application
- **RTO:** Recovery Time Objective
- **RPO:** Recovery Point Objective
- **SQL:** Structured Query Language
- **SSL:** Secure Sockets Layer

### 13.3 Abbreviations
- **SRS:** Software Requirements Specification
- **UI:** User Interface
- **UX:** User Experience
- **DB:** Database
- **HTTP:** Hypertext Transfer Protocol
- **HTTPS:** HTTP Secure
- **SSL:** Secure Sockets Layer
- **TLS:** Transport Layer Security
- **API:** Application Programming Interface
- **CRM:** Customer Relationship Management

---

**Document Revision History:**
- Version 1.0 (Jan 27, 2026): Initial release
