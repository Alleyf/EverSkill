from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

router = APIRouter()


@router.get("/users")
async def list_users(db: AsyncSession = Depends(get_db)):
    """获取用户列表 (TODO: 实现)"""
    return {"message": "Not implemented yet"}
