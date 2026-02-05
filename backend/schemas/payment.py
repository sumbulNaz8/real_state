from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import date
import uuid
from schemas.base import BaseSchema
from models.payment import PaymentMethod, PaymentStatus

class PaymentBase(BaseModel):
    booking_id: uuid.UUID
    customer_id: uuid.UUID
    amount: Decimal
    payment_method: PaymentMethod
    payment_date: date
    reference_number: Optional[str] = None
    remarks: Optional[str] = None

class PaymentCreate(PaymentBase):
    booking_id: uuid.UUID
    customer_id: uuid.UUID
    amount: Decimal
    payment_method: PaymentMethod
    payment_date: date

class PaymentUpdate(BaseModel):
    amount: Optional[Decimal] = None
    payment_method: Optional[PaymentMethod] = None
    payment_date: Optional[date] = None
    reference_number: Optional[str] = None
    cheque_number: Optional[str] = None
    bank_name: Optional[str] = None
    payment_status: Optional[PaymentStatus] = None
    remarks: Optional[str] = None

class PaymentInDB(PaymentBase, BaseSchema):
    payment_status: PaymentStatus = "received"
    cheque_number: Optional[str] = None
    bank_name: Optional[str] = None
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class PaymentPublic(BaseSchema):
    booking_id: uuid.UUID
    customer_id: uuid.UUID
    amount: Decimal
    payment_method: PaymentMethod
    payment_date: date
    reference_number: Optional[str]
    cheque_number: Optional[str]
    bank_name: Optional[str]
    payment_status: PaymentStatus
    remarks: Optional[str]