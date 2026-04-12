# SkillDistill - 万物蒸馏 Skill 平台 TODO

## 🎯 项目目标
构建一个通用的万物蒸馏 Skill 网站，用户可以导入多模态背景材料，平台基于非结构化材料和用户目标生成专属 Skill，所有 Skill 公开支持下载、分享、测试。

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 + React 18
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand
- **HTTP 客户端**: Axios + React Query
- **文件上传**: React Dropzone
- **Markdown 渲染**: react-markdown

### 后端
- **框架**: FastAPI (Python 3.11+)
- **数据库**: SQLite (开发) / PostgreSQL (生产) - 轻量级首选
- **缓存**: Redis
- **向量数据库**: Milvus
- **对象存储**: MinIO (本地) / AWS S3 (生产)
- **任务队列**: Celery + Redis
- **AI 集成**: LangChain + Claude/GPT-4 API

### 基础设施
- **容器化**: Docker + Docker Compose
- **API 文档**: Swagger/OpenAPI
- **认证**: JWT + OAuth2

---

## 📋 实施阶段

### Phase 1: 项目脚手架 (本周)
- [ ] **1.1** 初始化项目目录结构
- [ ] **1.2** 配置 Docker Compose (Milvus, Redis, SQLite/PostgreSQL, MinIO)
- [ ] **1.3** 搭建 Next.js 前端项目
- [ ] **1.4** 搭建 FastAPI 后端项目
- [ ] **1.5** 配置基础 CI/CD 流程
- [ ] **1.6** 编写项目文档 (README, CONTRIBUTING)

### Phase 2: 核心数据层 (第 2 周)
- [ ] **2.1** 设计数据库 Schema (Users, Skills, Materials, Sessions)
- [ ] **2.2** 实现 SQLAlchemy 模型层
- [ ] **2.3** 配置 Milvus 集合结构 (向量索引)
- [ ] **2.4** 实现数据访问层 (Repository Pattern)
- [ ] **2.5** 编写数据库迁移脚本 (Alembic)
- [ ] **2.6** 单元测试数据层

### Phase 3: 后端 API 开发 (第 3-4 周)
- [ ] **3.1** 实现用户认证系统 (注册/登录/JWT)
- [ ] **3.2** 实现文件上传接口 (多模态支持)
- [ ] **3.3** 实现材料解析服务 (文本/图片/音频/视频)
- [ ] **3.4** 实现向量嵌入服务 (接入 Milvus)
- [ ] **3.5** 实现 Skill 蒸馏引擎核心逻辑
- [ ] **3.6** 实现 Skill  CRUD 接口
- [ ] **3.7** 实现 Skill 测试沙箱接口
- [ ] **3.8** 实现分享与下载接口
- [ ] **3.9** API 文档完善与测试

### Phase 4: 前端界面开发 (第 5-6 周)
- [ ] **4.1** 实现首页与导航布局
- [ ] **4.2** 实现用户认证页面 (登录/注册)
- [ ] **4.3** 实现创建向导流程 (多步骤表单)
- [ ] **4.4** 实现多模态文件上传组件
- [ ] **4.5** 实现材料管理与预览界面
- [ ] **4.6** 实现蒸馏进度实时展示
- [ ] **4.7** 实现 Skill 编辑与预览界面
- [ ] **4.8** 实现 Skill 市场/探索页面
- [ ] **4.9** 实现 Skill 测试沙箱界面
- [ ] **4.10** 实现个人中心与技能管理
- [ ] **4.11** 响应式适配与性能优化

### Phase 5: 蒸馏引擎深化 (第 7 周)
- [ ] **5.1** 实现多模态材料解析器 (文本提取/OCR/语音转文字)
- [ ] **5.2** 实现智能信息抽取 (实体/关系/事件)
- [ ] **5.3** 实现 Persona 生成算法
- [ ] **5.4** 实现 Memory 构建逻辑
- [ ] **5.5** 实现 Skill 规则与约束生成
- [ ] **5.6** 实现质量评估与优化建议
- [ ] **5.7** 实现增量更新与进化机制

### Phase 6: 社区与运营功能 (第 8 周)
- [ ] **6.1** 实现评论与评分系统
- [ ] **6.2** 实现收藏与关注功能
- [ ] **6.3** 实现搜索与推荐系统
- [ ] **6.4** 实现内容审核机制
- [ ] **6.5** 实现举报与反馈系统
- [ ] **6.6** 实现数据统计看板

### Phase 7: 测试与部署 (第 9 周)
- [ ] **7.1** 端到端测试 (E2E)
- [ ] **7.2** 性能压力测试
- [ ] **7.3** 安全审计与漏洞修复
- [ ] **7.4** 生产环境配置
- [ ] **7.5** 监控与日志系统 (Prometheus + Grafana)
- [ ] **7.6** 备份与恢复策略
- [ ] **7.7** MVP 版本发布

### Phase 8: 迭代优化 (持续)
- [ ] **8.1** 用户反馈收集与分析
- [ ] **8.2** 功能优化与 Bug 修复
- [ ] **8.3** 新特性开发 (Skill 进化/协作编辑等)
- [ ] **8.4** 性能优化与成本降低
- [ ] **8.5** 生态建设 (插件系统/API 开放)

---

## 📁 关键文件结构

```
skill-distill/
├── frontend/                 # Next.js 前端
│   ├── src/
│   │   ├── app/             # App Router 页面
│   │   ├── components/      # 可复用组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── stores/          # Zustand 状态管理
│   │   ├── services/        # API 服务
│   │   └── utils/           # 工具函数
│   ├── public/
│   └── package.json
│
├── backend/                  # FastAPI 后端
│   ├── app/
│   │   ├── api/             # API 路由
│   │   ├── core/            # 核心配置
│   │   ├── models/          # SQLAlchemy 模型
│   │   ├── schemas/         # Pydantic 模型
│   │   ├── services/        # 业务逻辑
│   │   ├── engines/         # 蒸馏引擎
│   │   ├── parsers/         # 材料解析器
│   │   └── db/              # 数据库连接
│   ├── tests/
│   └── requirements.txt
│
├── infrastructure/           # 基础设施配置
│   ├── docker/
│   ├── milvus/
│   └── scripts/
│
├── docs/                     # 项目文档
│   ├── architecture.md
│   ├── api.md
│   └── deployment.md
│
├── docker-compose.yml
├── README.md
└── todo.md                  # 本文件
```

---

## 🚀 立即开始：Phase 1 任务

### 当前优先级
1. 初始化项目目录结构
2. 配置 Docker Compose (Milvus, Redis, SQLite, MinIO)
3. 搭建 Next.js 前端项目
4. 搭建 FastAPI 后端项目
5. 编写基础文档

---

## 📝 备注
- 向量数据库采用 **Milvus** (替代原计划的 Qdrant)
- 关系型数据库优先使用 **SQLite** (开发环境)，生产环境可切换 **PostgreSQL**
- 参考项目：[ex-skill](https://github.com/therealXiaomanChu/ex-skill), [colleague-skill](https://github.com/titanwings/colleague-skill)
- 所有生成的 Skill 默认公开，支持知识共享协议

---

*最后更新: $(date +%Y-%m-%d)*
