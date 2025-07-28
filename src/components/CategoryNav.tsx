'use client'

import { Category } from '@/types/video'
import { categories } from '@/data/videos'

interface CategoryNavProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryNav({ selectedCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-base">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}