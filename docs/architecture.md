# SkillDistill 架构设计文档

## 系统概述

SkillDistill 是一个万物蒸馏 Skill 平台，允许用户将多模态背景材料转化为结构化的数字 Skill。

## 技术架构

### 整体架构

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │────▶│    Backend   │────▶│   AI Engine │
│  Next.js 14 │     │   FastAPI    │     │  LangChain  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  TailwindCSS│     │  PostgreSQL  │     │   Milvus    │
│   Zustand   │     │    SQLite    │     │  (Vector)   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     MinIO    │
                    │   (Storage)  │
                    └──────────────┘
```

## 核心模块

### 1. 前端模块 (Frontend)

**技术栈**:
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Zustand (状态管理)
- Axios + React Query (数据请求)
- React Dropzone (文件上传)

**主要页面**:
- `/` - 首页
- `/auth/login` - 登录
- `/auth/register` - 注册
- `/create` - 创建向导
- `/skills/[id]` - Skill 详情
- `/skills/[id]/test` - 测试沙箱
- `/marketplace` - Skill 市场
- `/profile` - 个人中心

### 2. 后端模块 (Backend)

**技术栈**:
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (数据验证)
- Celery (任务队列)
- Redis (缓存)

**API 路由**:
- `/api/auth/*` - 认证相关
- `/api/users/*` - 用户管理
- `/api/skills/*` - Skill 管理
- `/api/materials/*` - 材料管理
- `/api/health/*` - 健康检查

### 3. 数据存储层

**关系型数据库**:
- 开发环境：SQLite
- 生产环境：PostgreSQL

**向量数据库**: Milvus
- 用于存储材料嵌入向量
- 支持语义搜索和相似度匹配

**对象存储**: MinIO/S3
- 存储上传的多模态文件
- 存储生成的 Skill 包

### 4. AI 引擎

**核心功能**:
- 多模态材料解析
- 信息抽取与结构化
- Persona 生成
- Memory 构建
- Rule/Skill 生成

**依赖服务**:
- LangChain (LLM 编排)
- OpenAI/Claude API (大模型)

## 数据模型

### User (用户)
```python
id: int
email: str
username: str
hashed_password: str
is_active: bool
created_at: datetime
```

### Skill (技能)
```python
id: int
name: str
description: str
slug: str
status: str  # draft, processing, published
creator_id: int
persona_path: str
memory_path: str
rules_path: str
skill_md_path: str
created_at: datetime
```

### Material (材料)
```python
id: int
name: str
file_type: str
file_path: str
parsed: bool
parsed_content: str
embedded: bool
vector_ids: str  # JSON
skill_id: int
created_at: datetime
```

## 蒸馏流程

```
1. 信息采集
   └─▶ 用户输入目标对象信息
   
2. 材料上传
   └─▶ 多模态文件上传到 MinIO
   
3. 材料解析
   ├─▶ 文本：直接提取
   ├─▶ 图片：OCR + 描述生成
   ├─▶ 音频：语音转文字
   └─▶ 视频：抽帧 + 语音识别
   
4. 向量化
   └─▶ 使用 Embedding 模型生成向量
   └─▶ 存储到 Milvus
   
5. AI 蒸馏
   ├─▶ 信息抽取 (实体/关系/事件)
   ├─▶ Persona 生成
   ├─▶ Memory 构建
   └─▶ Rules/Skill 生成
   
6. 质量评估
   └─▶ 一致性检查
   └─▶ 完整性评估
   
7. 发布
   └─▶ 生成 Skill 包
   └─▶ 公开到平台
```

## 安全设计

### 认证授权
- JWT Token 认证
- OAuth2 支持 (可选)
- 密码 bcrypt 加密

### 数据安全
- 文件上传类型限制
- 文件大小限制
- SQL 注入防护 (参数化查询)
- XSS 防护 (输入验证)

### 隐私保护
- 敏感信息脱敏
- 用户数据隔离
- GDPR 合规考虑

## 部署架构

### 开发环境
```yaml
services:
  - frontend (localhost:3000)
  - backend (localhost:8000)
  - milvus (localhost:19530)
  - redis (localhost:6379)
  - minio (localhost:9000)
```

### 生产环境
- Docker Compose / Kubernetes
- Nginx 反向代理
- Let's Encrypt SSL
- Prometheus + Grafana 监控
- ELK 日志收集

## 性能优化

### 前端
- 代码分割 (Code Splitting)
- 懒加载 (Lazy Loading)
- 图片优化
- CDN 加速

### 后端
- 异步 IO
- 数据库连接池
- Redis 缓存
- Celery 异步任务

### 数据库
- 索引优化
- 查询优化
- 读写分离 (生产)

## 扩展性设计

### 水平扩展
- 无状态服务设计
- Redis 共享 Session
- 负载均衡

### 功能扩展
- 插件系统 (未来)
- Webhook 支持
- API 开放平台

## 监控与运维

### 监控指标
- API 响应时间
- 错误率
- 资源使用率
- 业务指标 (Skill 数量、用户活跃度)

### 日志系统
- 结构化日志
- 日志分级
- 集中式日志收集

### 告警机制
- 错误率阈值告警
- 资源使用告警
- 服务宕机告警

---

*文档版本：v0.1.0*
*最后更新：2024*
