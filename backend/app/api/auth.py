from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

router = APIRouter()


@router.post("/register")
async def register(db: AsyncSession = Depends(get_db)):
    """用户注册 (TODO: 实现)"""
    return {"message": "Not implemented yet"}


@router.post("/login")
async def login(db: AsyncSession = Depends(get_db)):
    """用户登录 (TODO: 实现)"""
    return {"message": "Not implemented yet"}


@router.post("/logout")
async def logout():
    """用户登出"""
    return {"message": "Logged out successfully"}
