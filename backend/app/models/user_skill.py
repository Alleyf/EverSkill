from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base


class User(Base):
    """用户模型"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 关系
    skills = relationship("Skill", back_populates="creator", cascade="all, delete-orphan")
    materials = relationship("Material", back_populates="owner", cascade="all, delete-orphan")


class Skill(Base):
    """Skill 模型"""
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    
    # 状态
    status = Column(String(50), default="draft")  # draft, processing, published, archived
    
    # 关联
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    creator = relationship("User", back_populates="skills")
    
    # 文件路径
    persona_path = Column(String(500))
    memory_path = Column(String(500))
    rules_path = Column(String(500))
    skill_md_path = Column(String(500))
    
    # 统计
    download_count = Column(Integer, default=0)
    test_count = Column(Integer, default=0)
    rating_avg = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 关系
    materials = relationship("Material", back_populates="skill", cascade="all, delete-orphan")


class Material(Base):
    """背景材料模型"""
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)  # text, image, audio, video, pdf, etc.
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer)
    
    # 解析状态
    parsed = Column(Boolean, default=False)
    parsed_content = Column(Text)  # 解析后的文本内容
    
    # 向量化状态
    embedded = Column(Boolean, default=False)
    vector_ids = Column(Text)  # JSON 数组，存储 Milvus 中的向量 ID
    
    # 关联
    skill_id = Column(Integer, ForeignKey("skills.id"))
    skill = relationship("Skill", back_populates="materials")
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="materials")
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Session(Base):
    """测试会话模型"""
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # 会话内容
    messages = Column(Text)  # JSON 格式存储对话历史
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
