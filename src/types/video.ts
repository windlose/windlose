export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: string
  views: number
  likes: number
  uploadDate: string
  channel: {
    name: string
    avatar: string
    subscribers: number
  }
  category: string
  tags: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface SearchFilters {
  category?: string
  duration?: 'short' | 'medium' | 'long'
  sortBy?: 'relevance' | 'uploadDate' | 'views' | 'likes'
}