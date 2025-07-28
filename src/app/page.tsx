'use client'

import { useState, useMemo } from 'react'
import { VideoCard } from '@/components/VideoCard'
import { SearchBar } from '@/components/SearchBar'
import { CategoryNav } from '@/components/CategoryNav'
import { videos } from '@/data/videos'
import { Video, SearchFilters } from '@/types/video'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filters, setFilters] = useState<SearchFilters>({})

  const filteredVideos = useMemo(() => {
    let filtered = videos

    // 搜索过滤
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    // 其他过滤条件
    if (filters.category && filters.category !== '') {
      filtered = filtered.filter(video => video.category === filters.category)
    }

    if (filters.duration) {
      filtered = filtered.filter(video => {
        const duration = video.duration.split(':').map(Number)
        const minutes = duration[0] * 60 + duration[1]
        
        switch (filters.duration) {
          case 'short':
            return minutes <= 4
          case 'medium':
            return minutes > 4 && minutes <= 20
          case 'long':
            return minutes > 20
          default:
            return true
        }
      })
    }

    // 排序
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'uploadDate':
            return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          case 'views':
            return b.views - a.views
          case 'likes':
            return b.likes - a.likes
          default:
            return 0
        }
      })
    }

    return filtered
  }, [searchQuery, selectedCategory, filters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">视频网站</h1>
            </div>
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
        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>

        {/* 分类导航 */}
        <div className="mb-8">
          <CategoryNav 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {/* 视频网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">
              没有找到相关视频
            </div>
            <div className="text-gray-400 text-sm">
              尝试调整搜索条件或分类
            </div>
          </div>
        )}
      </main>
    </div>
  )
}