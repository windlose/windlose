export type ReusabilityRating = 'high' | 'medium' | 'low'

export type RepoType = 'workflow' | 'prompt-template' | 'agent-skill' | 'tool' | 'dataset' | 'resource-list'

export interface WritingSkillRepo {
  rank: number
  name: string
  fullName: string
  description: string
  url: string
  stars: number
  forks: number
  language: string | null
  topics: string[]
  repoType: RepoType
  reusabilityRating: ReusabilityRating
  /** Key reusable paths / entry points inside the repo */
  reusablePaths: string[]
  updatedAt: string
  createdAt: string
}
