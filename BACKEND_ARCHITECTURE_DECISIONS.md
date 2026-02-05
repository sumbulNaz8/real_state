# Architecture Decision Records: Kings Builder Backend

## ADR-001: FastAPI Framework Selection

### Status
Accepted

### Date
January 27, 2026

### Context
The Kings Builder Real Estate Management System requires a modern, high-performance Python web framework that supports asynchronous operations, has excellent documentation capabilities, and provides built-in data validation.

### Decision
We have selected FastAPI as the primary web framework for the backend.

### Options Considered
1. **FastAPI** (Chosen)
   - Pros: Automatic API documentation, excellent performance, built-in data validation with Pydantic, async/await support, type hints
   - Cons: Relatively newer framework, smaller ecosystem than Django

2. **Django REST Framework**
   - Pros: Mature, extensive documentation, built-in admin panel, ORM
   - Cons: Heavier framework, synchronous by default, more boilerplate code

3. **Flask**
   - Pros: Lightweight, flexible, minimalistic
   - Cons: Requires more setup for features, no automatic documentation, manual validation

### Rationale
FastAPI was chosen for its automatic OpenAPI documentation generation, excellent performance due to Starlette and Pydantic, built-in data validation, and modern async/await support. The framework's type hinting capabilities provide better developer experience and fewer runtime errors.

### Consequences
Positive:
- Automatic interactive API documentation
- Better performance for I/O bound operations
- Built-in request validation and serialization
- Modern Python features support

Negative:
- Learning curve for team members unfamiliar with type hints
- Potentially less community support than older frameworks

---

## ADR-002: Async Database Operations

### Status
Accepted

### Date
January 27, 2026

### Context
The system needs to handle multiple concurrent requests efficiently, particularly for read-heavy operations like property searches and reporting.

### Decision
Implement async database operations using SQLAlchemy 2.0 with asyncpg driver.

### Options Considered
1. **Async SQLAlchemy with asyncpg** (Chosen)
   - Pros: Non-blocking I/O, better concurrency, integrates well with FastAPI
   - Cons: More complex error handling, fewer examples in community

2. **Traditional Sync SQLAlchemy**
   - Pros: Simpler code, more examples, easier debugging
   - Cons: Blocking operations, lower concurrency

3. **Alternative ORMs (SQLModel, Tortoise ORM)**
   - Pros: Designed for async, simpler syntax
   - Cons: Less mature, smaller community

### Rationale
Async database operations align with FastAPI's async nature and will provide better performance under concurrent load, which is important for a real estate system with multiple users accessing inventory simultaneously.

### Consequences
Positive:
- Better concurrent performance
- Efficient resource utilization
- Scales better with multiple users

Negative:
- More complex code patterns
- Requires careful handling of async contexts

---

## ADR-003: Multi-Tenant Data Isolation Strategy

### Status
Accepted

### Date
January 27, 2026

### Context
The system must support multiple builder organizations with proper data isolation while maintaining operational efficiency.

### Decision
Implement a shared database with row-level security using a builder_id foreign key in all tenant-specific tables.

### Options Considered
1. **Shared Database with Row-Level Security** (Chosen)
   - Pros: Cost-effective, easier maintenance, good performance, allows system-wide reporting
   - Cons: More complex application logic, potential for data leakage if not implemented correctly

2. **Separate Database per Tenant**
   - Pros: Strong isolation, easier compliance, independent scaling
   - Cons: Higher operational overhead, complex management, difficult system-wide operations

3. **Schema-per-Tenant**
   - Pros: Moderate isolation, balanced operational complexity
   - Cons: Maintenance complexity, resource usage between extremes

### Rationale
The shared database approach was chosen to balance cost-effectiveness with functionality. Since the Master Admin (ScitForte) needs visibility across all builders for reporting and management, this approach allows for system-wide analytics while maintaining appropriate data access controls.

### Consequences
Positive:
- Lower infrastructure costs
- Simplified backup and maintenance
- Ability to perform system-wide analytics

Negative:
- Need for strict enforcement of tenant isolation in application logic
- Potential performance impact as tenant count increases

---

## ADR-004: Authentication and Authorization Strategy

### Status
Accepted

### Date
January 27, 2026

### Context
The system requires secure authentication and fine-grained authorization to protect sensitive real estate and financial data across multiple user roles.

### Decision
Implement JWT-based authentication with role-based access control (RBAC) and refresh token rotation.

### Options Considered
1. **JWT with Refresh Tokens** (Chosen)
   - Pros: Stateless, scalable, good for distributed systems, built-in expiration
   - Cons: Cannot be revoked mid-session without additional complexity

2. **Session-based Authentication**
   - Pros: Easy revocation, simpler to implement
   - Cons: Requires server-side storage, less scalable, not ideal for microservices

3. **OAuth 2.0 Integration**
   - Pros: Industry standard, supports third-party authentication
   - Cons: More complex setup, potential over-engineering for internal system

### Rationale
JWT tokens provide the scalability needed for the distributed nature of the system while allowing for stateless operation. The refresh token rotation provides security against token theft while maintaining user convenience.

### Consequences
Positive:
- Scalable authentication across services
- Reduced server-side session storage requirements
- Better mobile application support

Negative:
- Complexity in token management and refresh logic
- Need for secure token storage on clients
- Challenges in immediate token revocation

---

## ADR-005: Database Choice - PostgreSQL

### Status
Accepted

### Date
January 27, 2026

### Context
The system requires a reliable, feature-rich database that can handle complex real estate relationships and financial transactions.

### Decision
Use PostgreSQL as the primary database for its reliability, advanced features, and strong consistency guarantees.

### Options Considered
1. **PostgreSQL** (Chosen)
   - Pros: ACID compliance, advanced data types, JSON support, extensibility, strong consistency
   - Cons: Can be slower than NoSQL for certain operations

2. **MySQL**
   - Pros: Wide adoption, good performance, strong replication
   - Cons: Less advanced features than PostgreSQL

3. **MongoDB**
   - Pros: Flexible schema, horizontal scaling, document-oriented
   - Cons: Eventual consistency, less structured for financial data

### Rationale
PostgreSQL was chosen for its reliability and ACID compliance, crucial for financial transactions and property ownership records. Its JSON support allows for flexible data storage while maintaining relational integrity for core entities.

### Consequences
Positive:
- Strong data consistency and integrity
- Excellent support for complex queries
- JSON support for flexible data needs

Negative:
- Potentially slower performance for simple key-value operations
- More complex setup than some alternatives

---