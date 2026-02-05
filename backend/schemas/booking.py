from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import datetime, date
import uuid
from schemas.base import BaseSchema
from models.booking import BookingStatus, BookingType

class BookingBase(BaseModel):
    inventory_id: uuid.UUID
    customer_id: uuid.UUID
    booking_amount: Decimal
    booking_type: Optional[BookingType] = "sale"
    remarks: Optional[str] = None

class BookingCreate(BookingBase):
    inventory_id: uuid.UUID
    customer_id: uuid.UUID
    booking_amount: Decimal

class BookingUpdate(BaseModel):
    booking_amount: Optional[Decimal] = None
    booking_status: Optional[BookingStatus] = None
    booking_type: Optional[BookingType] = None
    remarks: Optional[str] = None
    cancellation_reason: Optional[str] = None

class BookingInDB(BookingBase, BaseSchema):
    booking_date: Optional[datetime] = datetime.utcnow()
    booking_status: BookingStatus = "confirmed"
    booking_reference: Optional[str] = None
    approved_by_id: Optional[uuid.UUID] = None
    cancelled_by_id: Optional[uuid.UUID] = None
    cancellation_reason: Optional[str] = None
    cancellation_date: Optional[datetime] = None
    project_id: uuid.UUID
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class BookingPublic(BaseSchema):
    inventory_id: uuid.UUID
    customer_id: uuid.UUID
    booking_date: datetime
    booking_amount: Decimal
    booking_status: BookingStatus
    booking_type: BookingType
    booking_reference: Optional[str]
    approved_by_id: Optional[uuid.UUID]
    cancelled_by_id: Optional[uuid.UUID]
    cancellation_reason: Optional[str]
    cancellation_date: Optional[datetime]
    remarks: Optional[str]
    project_id: uuid.UUID