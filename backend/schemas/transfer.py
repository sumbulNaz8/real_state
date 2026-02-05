from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import date
import uuid
from schemas.base import BaseSchema
from models.transfer import TransferStatus

class TransferBase(BaseModel):
    inventory_id: uuid.UUID
    booking_id: uuid.UUID
    from_customer_id: uuid.UUID
    to_customer_id: uuid.UUID
    transfer_fee: Optional[Decimal] = None
    remarks: Optional[str] = None

class TransferCreate(TransferBase):
    inventory_id: uuid.UUID
    booking_id: uuid.UUID
    from_customer_id: uuid.UUID
    to_customer_id: uuid.UUID

class TransferUpdate(BaseModel):
    transfer_date: Optional[date] = None
    transfer_fee: Optional[Decimal] = None
    status: Optional[TransferStatus] = None
    remarks: Optional[str] = None

class TransferInDB(TransferBase, BaseSchema):
    transfer_date: date
    status: TransferStatus = "pending"
    approved_by_id: Optional[uuid.UUID] = None
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class TransferPublic(BaseSchema):
    inventory_id: uuid.UUID
    booking_id: uuid.UUID
    from_customer_id: uuid.UUID
    to_customer_id: uuid.UUID
    transfer_date: date
    transfer_fee: Optional[Decimal]
    status: TransferStatus
    approved_by_id: Optional[uuid.UUID]
    remarks: Optional[str]