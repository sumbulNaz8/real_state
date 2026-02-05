from typing import Generator
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import random
import string

async def generate_unique_builder_id(db: AsyncSession) -> str:
    """Generate unique builder ID in KB-BLD-001 format"""
    # Find the highest existing number to ensure uniqueness
    from models.builder import Builder
    result = await db.execute(select(Builder).order_by(Builder.external_id.desc()).limit(1))
    last_builder = result.scalar_one_or_none()

    if last_builder and last_builder.external_id and last_builder.external_id.startswith("KB-BLD-"):
        try:
            last_number = int(last_builder.external_id.replace("KB-BLD-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"KB-BLD-{new_number:03d}"

async def generate_unique_project_id(db: AsyncSession) -> str:
    """Generate unique project ID in KB-PRJ-HS-001 format"""
    # Find the highest existing number to ensure uniqueness
    from models.project import Project
    result = await db.execute(select(Project).order_by(Project.external_id.desc()).limit(1))
    last_project = result.scalar_one_or_none()

    if last_project and last_project.external_id and last_project.external_id.startswith("KB-PRJ-"):
        try:
            # Extract the number from format like KB-PRJ-HS-001
            parts = last_project.external_id.split("-")
            if len(parts) >= 3:
                last_number = int(parts[-1])  # Last part should be the number
                new_number = last_number + 1
            else:
                new_number = 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    # Use fixed HS for Housing Society as per example format
    return f"KB-PRJ-HS-{new_number:03d}"

async def generate_unique_inventory_id(db: AsyncSession) -> str:
    """Generate unique inventory ID with custom format"""
    from models.inventory import Inventory
    result = await db.execute(select(Inventory).order_by(Inventory.external_id.desc()).limit(1))
    last_inventory = result.scalar_one_or_none()

    if last_inventory and last_inventory.external_id and last_inventory.external_id.startswith("INV-"):
        try:
            last_number = int(last_inventory.external_id.replace("INV-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"INV-{new_number:04d}"

async def generate_unique_booking_id(db: AsyncSession) -> str:
    """Generate unique booking ID with custom format"""
    from models.booking import Booking
    result = await db.execute(select(Booking).order_by(Booking.external_id.desc()).limit(1))
    last_booking = result.scalar_one_or_none()

    if last_booking and last_booking.external_id and last_booking.external_id.startswith("BOOK-"):
        try:
            last_number = int(last_booking.external_id.replace("BOOK-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"BOOK-{new_number:05d}"

async def generate_unique_customer_id(db: AsyncSession) -> str:
    """Generate unique customer ID with custom format"""
    from models.customer import Customer
    result = await db.execute(select(Customer).order_by(Customer.external_id.desc()).limit(1))
    last_customer = result.scalar_one_or_none()

    if last_customer and last_customer.external_id and last_customer.external_id.startswith("CUST-"):
        try:
            last_number = int(last_customer.external_id.replace("CUST-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"CUST-{new_number:05d}"

async def generate_unique_payment_id(db: AsyncSession) -> str:
    """Generate unique payment ID with custom format"""
    from models.payment import Payment
    result = await db.execute(select(Payment).order_by(Payment.external_id.desc()).limit(1))
    last_payment = result.scalar_one_or_none()

    if last_payment and last_payment.external_id and last_payment.external_id.startswith("PMT-"):
        try:
            last_number = int(last_payment.external_id.replace("PMT-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"PMT-{new_number:05d}"

async def generate_unique_installment_id(db: AsyncSession) -> str:
    """Generate unique installment ID with custom format"""
    from models.installment import Installment
    result = await db.execute(select(Installment).order_by(Installment.external_id.desc()).limit(1))
    last_installment = result.scalar_one_or_none()

    if last_installment and last_installment.external_id and last_installment.external_id.startswith("INST-"):
        try:
            last_number = int(last_installment.external_id.replace("INST-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"INST-{new_number:05d}"

async def generate_unique_transfer_id(db: AsyncSession) -> str:
    """Generate unique transfer ID with custom format"""
    from models.transfer import Transfer
    result = await db.execute(select(Transfer).order_by(Transfer.external_id.desc()).limit(1))
    last_transfer = result.scalar_one_or_none()

    if last_transfer and last_transfer.external_id and last_transfer.external_id.startswith("XFER-"):
        try:
            last_number = int(last_transfer.external_id.replace("XFER-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"XFER-{new_number:05d}"

async def generate_unique_investor_id(db: AsyncSession) -> str:
    """Generate unique investor ID with custom format"""
    from models.investor import Investor
    result = await db.execute(select(Investor).order_by(Investor.external_id.desc()).limit(1))
    last_investor = result.scalar_one_or_none()

    if last_investor and last_investor.external_id and last_investor.external_id.startswith("INVSTR-"):
        try:
            last_number = int(last_investor.external_id.replace("INVSTR-", ""))
            new_number = last_number + 1
        except ValueError:
            new_number = 1
    else:
        new_number = 1

    return f"INVSTR-{new_number:04d}"