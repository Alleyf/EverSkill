# SkillDistill - 万物蒸馏 Skill 平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)

## 🎯 项目简介

**SkillDistill** 是一个通用的万物蒸馏 Skill 平台，用户可以将任意对象（历史人物、虚构角色、行业专家、亲友等）的多模态背景材料导入平台，AI 将自动解析并生成专属的 Skill。所有生成的 Skill 都公开在平台上，支持下载、分享和测试。

### 核心特性

- 🌊 **多模态输入**: 支持文本、图片、音频、视频等多种格式的背景材料
- 🤖 **AI 驱动**: 基于大语言模型自动提取特征、构建人设、生成技能规则
- 📦 **标准化输出**: 生成符合规范的 Skill 包（包含 persona、memory、rules 等）
- 🔍 **探索发现**: 浏览社区创造的 Skill，发现有趣的数字人格
- 🧪 **在线测试**: 在沙箱环境中与生成的 Skill 互动测试
- 📤 **一键分享**: 轻松分享你的创作到社交媒体
- 🔄 **持续进化**: 支持基于反馈迭代优化 Skill

### 参考项目

- [ex-skill](https://github.com/therealXiaomanChu/ex-skill) - CLI 形式的 Skill 生成工具
- [colleague-skill](https://github.com/titanwings/colleague-skill) - 同事技能模拟项目

## 🏗️ 技术架构

### 前端
- **框架**: Next.js 14 + React 18 (App Router)
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand
- **数据请求**: Axios + React Query

### 后端
- **框架**: FastAPI (Python 3.11+)
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **向量数据库**: Milvus
- **缓存**: Redis
- **对象存储**: MinIO / S3
- **任务队列**: Celery

### AI 引擎
- **框架**: LangChain
- **模型**: Claude / GPT-4 / 其他 LLM

## 🚀 快速开始

### 环境要求

- Docker & Docker Compose
- Node.js 18+
- Python 3.11+

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/your-org/skill-distill.git
cd skill-distill

# 启动所有服务 (Milvus, Redis, MinIO, Backend, Frontend)
docker-compose up -d

# 查看日志
docker-compose logs -f
```

访问 http://localhost:3000 开始使用！

## 📁 项目结构

```
skill-distill/
├── frontend/                 # Next.js 前端应用
│   ├── src/
│   │   ├── app/             # 页面路由
│   │   ├── components/      # UI 组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── stores/          # 状态管理
│   │   ├── services/        # API 客户端
│   │   └── utils/           # 工具函数
│   └── package.json
│
├── backend/                  # FastAPI 后端服务
│   ├── app/
│   │   ├── api/             # REST API 路由
│   │   ├── core/            # 核心配置
│   │   ├── models/          # 数据库模型
│   │   ├── schemas/         # Pydantic 模式
│   │   ├── services/        # 业务逻辑
│   │   ├── engines/         # 蒸馏引擎
│   │   ├── parsers/         # 材料解析器
│   │   └── db/              # 数据库连接
│   └── requirements.txt
│
├── infrastructure/           # 基础设施配置
│   ├── docker/
│   ├── milvus/
│   └── scripts/
│
├── docs/                     # 项目文档
├── docker-compose.yml
├── README.md
└── todo.md
```

## 📖 文档

- [架构设计](./docs/architecture.md)
- [API 文档](./docs/api.md)
- [部署指南](./docs/deployment.md)
- [贡献指南](./CONTRIBUTING.md)

## 🤝 参与贡献

我们欢迎各种形式的贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解如何参与。

## 📄 开源协议

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 📬 联系方式

- GitHub Issues: 报告 Bug 或提出新功能
- Discussions: 交流想法和问题

---

**让万物皆可蒸馏，创造属于你的数字 Skill！** ✨
