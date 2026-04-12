from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db

router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    skill_id: int = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """上传文件 (TODO: 实现)"""
    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "content_type": file.content_type
    }


@router.post("/upload/multiple")
async def upload_multiple_files(
    files: List[UploadFile] = File(...),
    skill_id: int = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """批量上传文件 (TODO: 实现)"""
    return {
        "message": f"{len(files)} files uploaded successfully",
        "files": [{"filename": f.filename, "content_type": f.content_type} for f in files]
    }
