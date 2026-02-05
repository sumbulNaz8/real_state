from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import date
import uuid
from schemas.base import BaseSchema
from models.installment import InstallmentDueStatus

class InstallmentBase(BaseModel):
    booking_id: uuid.UUID
    installment_number: int
    due_date: date
    amount: Decimal
    remarks: Optional[str] = None

class InstallmentCreate(InstallmentBase):
    booking_id: uuid.UUID
    installment_number: int
    due_date: date
    amount: Decimal

class InstallmentUpdate(BaseModel):
    due_date: Optional[date] = None
    amount: Optional[Decimal] = None
    paid_amount: Optional[Decimal] = None
    due_status: Optional[InstallmentDueStatus] = None
    paid_date: Optional[date] = None
    remarks: Optional[str] = None

class InstallmentInDB(InstallmentBase, BaseSchema):
    paid_amount: Decimal = 0
    due_status: InstallmentDueStatus = "pending"
    paid_date: Optional[date] = None
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class InstallmentPublic(BaseSchema):
    booking_id: uuid.UUID
    installment_number: int
    due_date: date
    amount: Decimal
    paid_amount: Decimal
    balance_amount: Decimal
    due_status: InstallmentDueStatus
    paid_date: Optional[date]
    remarks: Optional[str]