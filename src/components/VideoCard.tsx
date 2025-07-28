'use client'

import { Video } from '@/types/video'
import { Play, Clock, Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
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
    <Link href={`/video/${video.id}`} className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Play className="h-6 w-6 text-gray-900" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {video.duration}
        </div>
      </div>
      
      <div className="mt-3 flex gap-3">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={video.channel.avatar}
            alt={video.channel.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
            {video.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{video.channel.name}</p>
          
          <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{formatViews(video.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{formatLikes(video.likes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{video.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}