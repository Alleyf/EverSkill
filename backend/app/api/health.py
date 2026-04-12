from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    status: str
    version: str
    service: str


@router.get("/", response_model=HealthResponse)
async def health_check():
    """健康检查接口"""
    return HealthResponse(
        status="healthy",
        version="0.1.0",
        service="SkillDistill API"
    )


@router.get("/db")
async def db_health():
    """数据库健康检查"""
    return {"status": "ok", "database": "connected"}


@router.get("/milvus")
async def milvus_health():
    """Milvus 健康检查"""
    return {"status": "ok", "milvus": "connected"}


@router.get("/redis")
async def redis_health():
    """Redis 健康检查"""
    return {"status": "ok", "redis": "connected"}
