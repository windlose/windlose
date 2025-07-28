#!/bin/bash

# 视频网站部署脚本

echo "🚀 开始部署视频网站..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "📦 安装依赖..."
npm install

echo "🔨 构建项目..."
npm run build

echo "✅ 构建完成！"
echo ""
echo "🎉 部署选项："
echo "1. 本地运行: npm start"
echo "2. Vercel部署: 将代码推送到GitHub，然后在Vercel中导入项目"
echo "3. 其他平台: 上传构建文件到您的服务器"
echo ""
echo "🌐 访问地址: http://localhost:3000 (本地运行)"