import { Video, Category } from '@/types/video'

export const categories: Category[] = [
  { id: 'all', name: '全部', icon: '🎬' },
  { id: 'music', name: '音乐', icon: '🎵' },
  { id: 'gaming', name: '游戏', icon: '🎮' },
  { id: 'education', name: '教育', icon: '📚' },
  { id: 'sports', name: '体育', icon: '⚽' },
  { id: 'technology', name: '科技', icon: '💻' },
  { id: 'comedy', name: '喜剧', icon: '😂' },
  { id: 'news', name: '新闻', icon: '📰' },
]

export const videos: Video[] = [
  {
    id: '1',
    title: 'React 18 新特性详解',
    description: '深入探讨React 18的新特性，包括并发渲染、自动批处理等',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '15:30',
    views: 125000,
    likes: 3200,
    uploadDate: '2024-01-15',
    channel: {
      name: '前端开发教程',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      subscribers: 150000
    },
    category: 'technology',
    tags: ['React', '前端', 'JavaScript', '教程']
  },
  {
    id: '2',
    title: 'JavaScript 异步编程完全指南',
    description: '从回调函数到async/await，全面掌握JavaScript异步编程',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '22:15',
    views: 89000,
    likes: 2100,
    uploadDate: '2024-01-10',
    channel: {
      name: '编程学习',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      subscribers: 89000
    },
    category: 'education',
    tags: ['JavaScript', '异步编程', 'Promise', 'async/await']
  },
  {
    id: '3',
    title: 'TypeScript 高级类型系统',
    description: '学习TypeScript的高级类型特性，提升代码质量',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '18:45',
    views: 67000,
    likes: 1800,
    uploadDate: '2024-01-08',
    channel: {
      name: 'TypeScript专家',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      subscribers: 120000
    },
    category: 'technology',
    tags: ['TypeScript', '类型系统', '前端开发']
  },
  {
    id: '4',
    title: 'Next.js 13 App Router 教程',
    description: '使用Next.js 13的新App Router构建现代化Web应用',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '25:10',
    views: 95000,
    likes: 2800,
    uploadDate: '2024-01-05',
    channel: {
      name: 'Next.js教程',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      subscribers: 200000
    },
    category: 'technology',
    tags: ['Next.js', 'React', 'App Router', '全栈开发']
  },
  {
    id: '5',
    title: 'Tailwind CSS 实用技巧',
    description: '掌握Tailwind CSS的高级技巧，提升开发效率',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '12:30',
    views: 78000,
    likes: 1900,
    uploadDate: '2024-01-03',
    channel: {
      name: 'CSS大师',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      subscribers: 95000
    },
    category: 'technology',
    tags: ['Tailwind CSS', 'CSS', '前端设计', '响应式']
  },
  {
    id: '6',
    title: 'Node.js 后端开发实战',
    description: '从零开始学习Node.js后端开发，构建RESTful API',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '35:20',
    views: 110000,
    likes: 3200,
    uploadDate: '2024-01-01',
    channel: {
      name: '后端开发',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      subscribers: 180000
    },
    category: 'technology',
    tags: ['Node.js', '后端', 'API', 'Express']
  }
]