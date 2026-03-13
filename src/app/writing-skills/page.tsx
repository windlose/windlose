import Link from 'next/link'
import type { Metadata } from 'next'
import { writingSkillRepos, repoTypeLabels, reusabilityLabels } from '@/data/writing-skills'
import type { RepoType, ReusabilityRating } from '@/types/writing-skill'

export const metadata: Metadata = {
  title: '小说写作 Skills Top 20 | GitHub 精选',
  description:
    'GitHub 上 Stars 最高的前 20 个小说/创意写作 skill/prompt/workflow 仓库精选，附可复用路径与评级。',
}

const repoTypeColors: Record<RepoType, string> = {
  workflow: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'prompt-template': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'agent-skill': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  tool: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  dataset: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'resource-list': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
}

const reusabilityColors: Record<ReusabilityRating, string> = {
  high: 'text-emerald-400',
  medium: 'text-amber-400',
  low: 'text-rose-400',
}

const reusabilityIcons: Record<ReusabilityRating, string> = {
  high: '⚡',
  medium: '✓',
  low: '△',
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export default function WritingSkillsPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#161b22]">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
            ← 返回首页
          </Link>
          <span className="text-xs text-white/40">数据截止 2026-03-13</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-3">
            📖 小说写作 Skills — GitHub Top 20
          </h1>
          <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
            按 Stars 降序排列，仅保留包含可复用 skill / prompt / workflow 文件的仓库，
            剔除弱相关的纯论文列表和通用文本编辑器。每项附实际可复用路径。
          </p>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
            {(Object.keys(repoTypeColors) as RepoType[]).map((t) => (
              <span
                key={t}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${repoTypeColors[t]}`}
              >
                {repoTypeLabels[t]}
              </span>
            ))}
          </div>
        </div>

        {/* Repo list */}
        <ol className="space-y-3">
          {writingSkillRepos.map((repo) => (
            <li
              key={repo.fullName}
              className="rounded-xl border border-white/10 bg-[#161b22] hover:border-white/20 transition-colors"
            >
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4"
              >
                <div className="flex items-start gap-3">
                  {/* Rank */}
                  <span className="shrink-0 w-8 text-center text-lg font-mono font-bold text-white/30 pt-0.5">
                    {repo.rank}
                  </span>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-base truncate">
                        {repo.fullName}
                      </span>
                      {/* Type badge */}
                      <span
                        className={`hidden sm:inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs ${repoTypeColors[repo.repoType]}`}
                      >
                        {repoTypeLabels[repo.repoType]}
                      </span>
                      {/* Reusability */}
                      <span
                        className={`shrink-0 text-xs font-medium ${reusabilityColors[repo.reusabilityRating]}`}
                      >
                        {reusabilityIcons[repo.reusabilityRating]}{' '}
                        {reusabilityLabels[repo.reusabilityRating]}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/70 mb-2 line-clamp-2">
                      {repo.description}
                    </p>

                    {/* Reusable paths */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {repo.reusablePaths.map((p) => (
                        <code
                          key={p}
                          className="text-xs bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white/60"
                        >
                          {p}
                        </code>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span className="font-semibold text-yellow-400">
                        ⭐ {formatStars(repo.stars)}
                      </span>
                      {repo.forks > 0 && (
                        <span>🔀 {formatStars(repo.forks)}</span>
                      )}
                      {repo.language && (
                        <span className="text-white/50">{repo.language}</span>
                      )}
                      <span>更新 {repo.updatedAt}</span>
                      {/* Topics (first 3) */}
                      {repo.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-white/30">
          数据来源：GitHub API 搜索（2026-03-13），按实际 stargazers_count 降序。
          仅保留含明确 skill / prompt / workflow 文件且与小说/创意写作强相关的仓库。
        </p>
      </main>
    </div>
  )
}
