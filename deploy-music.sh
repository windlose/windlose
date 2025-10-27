#!/bin/bash

# MusicApp 部署脚本
echo "🎵 MusicApp 部署脚本"
echo "=================="

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安装"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
    echo "🚀 启动生产服务器..."
    echo "访问 http://localhost:3000 查看应用"
    echo ""
    echo "📝 其他命令:"
    echo "  npm run dev    - 启动开发服务器"
    echo "  npm run build  - 构建生产版本"
    echo "  npm start      - 启动生产服务器"
    echo ""
    echo "🎵 享受你的音乐之旅！"
    
    # 启动生产服务器
    npm start
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi