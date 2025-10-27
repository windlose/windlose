# MusicApp - 现代化音乐播放器

一个使用 Next.js、React、TypeScript 和 Tailwind CSS 构建的现代化音乐播放器应用。

## 🎵 功能特性

### 核心功能
- **音乐播放控制**: 播放、暂停、上一首、下一首
- **播放列表管理**: 显示歌曲列表，支持搜索和筛选
- **音频控制**: 音量调节、静音、进度条拖拽
- **收藏功能**: 喜欢/取消喜欢歌曲
- **响应式设计**: 适配不同屏幕尺寸

### 用户体验
- **现代化UI**: 渐变背景、毛玻璃效果、流畅动画
- **实时反馈**: 播放状态指示、进度显示
- **交互动画**: 专辑封面旋转、悬停效果、过渡动画
- **搜索功能**: 实时搜索歌曲和艺术家

### 技术特性
- **TypeScript**: 完整的类型安全
- **组件化**: 模块化的组件设计
- **状态管理**: React Hooks 状态管理
- **音频API**: 原生 HTML5 Audio API
- **动画**: Framer Motion 动画库

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📁 项目结构

```
src/
├── app/
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 应用布局
│   └── page.tsx             # 主页面
├── components/
│   ├── ui/                  # UI 组件
│   │   ├── button.tsx       # 按钮组件
│   │   ├── input.tsx        # 输入框组件
│   │   ├── slider.tsx       # 滑块组件
│   │   └── progress.tsx     # 进度条组件
│   ├── MusicPlayer.tsx      # 音乐播放器组件
│   └── Playlist.tsx         # 播放列表组件
└── lib/
    └── utils.ts             # 工具函数
```

## 🎨 设计特色

### 视觉设计
- **渐变背景**: 紫色到蓝色的渐变背景
- **毛玻璃效果**: 半透明背景和模糊效果
- **圆角设计**: 现代化的圆角元素
- **阴影效果**: 深度感和层次感

### 交互设计
- **悬停效果**: 按钮和卡片的悬停状态
- **动画过渡**: 平滑的状态转换
- **视觉反馈**: 播放状态的视觉指示
- **手势友好**: 触摸友好的界面设计

## 🎵 示例歌曲

应用包含以下示例歌曲：
- Blinding Lights - The Weeknd
- Dance Monkey - Tones and I
- Shape of You - Ed Sheeran
- Uptown Funk - Mark Ronson ft. Bruno Mars
- Bad Guy - Billie Eilish
- Old Town Road - Lil Nas X

## 🔧 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **UI组件**: Radix UI
- **图标**: Lucide React

## 📱 响应式设计

应用完全响应式，支持：
- 桌面端 (1024px+)
- 平板端 (768px - 1023px)
- 移动端 (< 768px)

## 🎯 未来计划

- [ ] 添加更多音频格式支持
- [ ] 实现播放历史记录
- [ ] 添加播放列表创建功能
- [ ] 集成音乐API
- [ ] 添加歌词显示
- [ ] 实现音频可视化
- [ ] 添加主题切换功能

## 📄 许可证

MIT License

---

享受你的音乐之旅！🎵
