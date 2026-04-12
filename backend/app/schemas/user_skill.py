from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Skill Schemas
class SkillBase(BaseModel):
    name: str
    description: Optional[str] = None
    slug: str


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    status: str
    creator_id: int
    download_count: int
    test_count: int
    rating_avg: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Material Schemas
class MaterialBase(BaseModel):
    name: str
    file_type: str


class MaterialCreate(MaterialBase):
    skill_id: Optional[int] = None


class MaterialResponse(MaterialBase):
    id: int
    file_path: str
    file_size: Optional[int]
    parsed: bool
    embedded: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str
