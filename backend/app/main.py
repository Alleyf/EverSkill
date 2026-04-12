from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.db.session import engine, Base
from app.api import health, auth, users, skills, materials


# 创建数据库表
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


def create_application() -> FastAPI:
    """创建 FastAPI 应用"""
    
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="万物蒸馏 Skill 平台 API",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS 配置
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 异常处理
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal server error: {str(exc)}"},
        )

    # 注册路由
    app.include_router(health.router, prefix="/api/health", tags=["健康检查"])
    app.include_router(auth.router, prefix="/api/auth", tags=["用户认证"])
    app.include_router(users.router, prefix="/api/users", tags=["用户管理"])
    app.include_router(skills.router, prefix="/api/skills", tags=["Skill 管理"])
    app.include_router(materials.router, prefix="/api/materials", tags=["材料管理"])
    
    # 生命周期事件
    @app.on_event("startup")
    async def startup_event():
        await create_tables()
        print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} started!")

    @app.on_event("shutdown")
    async def shutdown_event():
        print(f"👋 {settings.APP_NAME} shutting down...")

    return app


app = create_application()
