from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

router = APIRouter()


@router.get("/")
async def list_skills(db: AsyncSession = Depends(get_db)):
    """获取 Skill 列表 (TODO: 实现)"""
    return {"message": "Not implemented yet"}


@router.post("/")
async def create_skill(db: AsyncSession = Depends(get_db)):
    """创建 Skill (TODO: 实现)"""
    return {"message": "Not implemented yet"}


@router.get("/{skill_id}")
async def get_skill(skill_id: int, db: AsyncSession = Depends(get_db)):
    """获取单个 Skill (TODO: 实现)"""
    return {"message": "Not implemented yet"}


@router.post("/{skill_id}/distill")
async def distill_skill(skill_id: int, db: AsyncSession = Depends(get_db)):
    """开始蒸馏 Skill (TODO: 实现)"""
    return {"message": "Distillation started", "skill_id": skill_id}


@router.get("/{skill_id}/test")
async def test_skill(skill_id: int, db: AsyncSession = Depends(get_db)):
    """测试 Skill (TODO: 实现)"""
    return {"message": "Not implemented yet"}
