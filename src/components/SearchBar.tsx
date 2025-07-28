'use client'

import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: any) => void
}

export function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索视频..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {showFilters && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <h3 className="mb-3 text-sm font-medium text-gray-900">筛选选项</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                分类
              </label>
              <select
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">全部分类</option>
                <option value="technology">科技</option>
                <option value="education">教育</option>
                <option value="music">音乐</option>
                <option value="gaming">游戏</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                时长
              </label>
              <select
                onChange={(e) => onFilterChange({ duration: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">全部时长</option>
                <option value="short">短视频 (0-4分钟)</option>
                <option value="medium">中等 (4-20分钟)</option>
                <option value="long">长视频 (20分钟+)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                排序
              </label>
              <select
                onChange={(e) => onFilterChange({ sortBy: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="relevance">相关度</option>
                <option value="uploadDate">上传时间</option>
                <option value="views">观看次数</option>
                <option value="likes">点赞数</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}