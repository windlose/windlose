'use client'

import { useParams } from 'next/navigation'
import { VideoPlayer } from '@/components/VideoPlayer'
import { VideoCard } from '@/components/VideoCard'
import { videos } from '@/data/videos'
import { Heart, ThumbsUp, Share, Download, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoPage() {
  const params = useParams()
  const videoId = params.id as string
  
  const video = videos.find(v => v.id === videoId)
  const relatedVideos = videos.filter(v => v.id !== videoId && v.category === video?.category).slice(0, 4)

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">视频未找到</h1>
          <p className="text-gray-600 mb-4">您访问的视频不存在或已被删除</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`
    }
    return likes.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              视频网站
            </Link>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                登录
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                注册
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：视频播放器和信息 */}
          <div className="lg:col-span-2">
            {/* 视频播放器 */}
            <div className="mb-6">
              <VideoPlayer video={video} />
            </div>

            {/* 视频信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {video.title}
              </h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{formatViews(video.views)} 次观看</span>
                  <span>•</span>
                  <span>{video.uploadDate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {formatLikes(video.likes)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    收藏
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* 频道信息 */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={video.channel.avatar}
                    alt={video.channel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{video.channel.name}</h3>
                  <p className="text-sm text-gray-600">
                    {video.channel.subscribers.toLocaleString()} 位订阅者
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  订阅
                </Button>
              </div>

              {/* 视频描述 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">视频描述</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {video.description}
                </p>
                
                {/* 标签 */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：相关视频 */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">相关视频</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard key={relatedVideo.id} video={relatedVideo} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}