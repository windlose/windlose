# 视频网站

一个现代化的视频网站，使用 Next.js 14、TypeScript 和 Tailwind CSS 构建。

## 功能特性

- 🎬 **视频浏览** - 美观的视频网格布局
- 🔍 **智能搜索** - 支持标题、描述和标签搜索
- 📂 **分类筛选** - 按视频分类进行筛选
- 🎯 **高级过滤** - 支持时长、排序等过滤选项
- ▶️ **视频播放** - 完整的视频播放器功能
- 📱 **响应式设计** - 适配各种设备屏幕
- ⚡ **现代化UI** - 使用 Tailwind CSS 构建的美观界面

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Radix UI
- **图标**: Lucide React
- **工具**: class-variance-authority, clsx, tailwind-merge

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── video/[id]/        # 视频详情页面
│   └── globals.css        # 全局样式
├── components/             # React 组件
│   ├── ui/                # 基础UI组件
│   ├── VideoCard.tsx      # 视频卡片组件
│   ├── VideoPlayer.tsx    # 视频播放器
│   ├── SearchBar.tsx      # 搜索栏
│   └── CategoryNav.tsx    # 分类导航
├── data/                  # 模拟数据
│   └── videos.ts          # 视频数据
├── lib/                   # 工具函数
│   └── utils.ts           # 通用工具函数
└── types/                 # TypeScript 类型定义
    └── video.ts           # 视频相关类型
```

## 主要功能

### 1. 视频浏览
- 响应式视频网格布局
- 视频缩略图、标题、频道信息显示
- 观看次数、点赞数、上传时间显示

### 2. 搜索和筛选
- 实时搜索功能
- 分类筛选
- 时长筛选（短视频、中等、长视频）
- 排序选项（相关度、上传时间、观看次数、点赞数）

### 3. 视频播放
- 完整的视频播放器
- 播放/暂停控制
- 音量控制
- 进度条控制
- 全屏支持

### 4. 视频详情页
- 视频播放器
- 视频信息展示
- 频道信息
- 相关视频推荐
- 点赞、收藏、分享功能

## 自定义配置

### 添加新视频
在 `src/data/videos.ts` 文件中添加新的视频数据：

```typescript
{
  id: 'unique-id',
  title: '视频标题',
  description: '视频描述',
  thumbnail: '缩略图URL',
  videoUrl: '视频文件URL',
  duration: 'MM:SS',
  views: 观看次数,
  likes: 点赞数,
  uploadDate: 'YYYY-MM-DD',
  channel: {
    name: '频道名称',
    avatar: '头像URL',
    subscribers: 订阅者数量
  },
  category: '分类',
  tags: ['标签1', '标签2']
}
```

### 添加新分类
在 `src/data/videos.ts` 的 `categories` 数组中添加新分类：

```typescript
{
  id: 'category-id',
  name: '分类名称',
  icon: '🎬'
}
```

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

```bash
npm run build
npm start
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
