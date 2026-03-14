import Link from "next/link";
import { notFound } from "next/navigation";
import { problems } from "@/data/problems";
import { Difficulty } from "@/types/problem";

const difficultyColors: Record<Difficulty, string> = {
  简单: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  中等: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  困难: "text-red-400 bg-red-400/10 border-red-400/20",
};

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return problems.map((p) => ({ id: String(p.id) }));
}

export default async function ProblemPage({ params }: Props) {
  const { id } = await params;
  const problem = problems.find((p) => p.id === Number(id));

  if (!problem) notFound();

  const acceptRate = Math.round((problem.accepted / problem.submissions) * 100);
  const currentIndex = problems.findIndex((p) => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem =
    currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/problems"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              ← 题目列表
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {prevProblem && (
              <Link
                href={`/problems/${prevProblem.id}`}
                className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                ← 上一题
              </Link>
            )}
            {nextProblem && (
              <Link
                href={`/problems/${nextProblem.id}`}
                className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                下一题 →
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: Problem description */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <div className="mb-2 flex items-center gap-3 flex-wrap">
                <span className="text-sm text-white/40">#{problem.id}</span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
                <span className="text-xs text-white/40">通过率 {acceptRate}%</span>
              </div>
              <h1 className="text-xl font-bold">{problem.title}</h1>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-3 text-sm font-semibold text-white/70">题目描述</h2>
              <div className="space-y-2 text-sm leading-relaxed text-white/80">
                {problem.description.split("\n\n").map((para, i) => (
                  <p key={i} className="whitespace-pre-wrap">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-white/70">示例</h2>
              {problem.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"
                >
                  <p className="mb-2 text-xs font-medium text-white/50">
                    示例 {i + 1}
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div>
                      <span className="text-white/40">输入：</span>
                      <span className="text-white/80 whitespace-pre-wrap">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-white/40">输出：</span>
                      <span className="text-white/80">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div>
                        <span className="text-white/40">解释：</span>
                        <span className="text-white/60">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-3 text-sm font-semibold text-white/70">约束条件</h2>
              <ul className="space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="mt-0.5 text-white/20">•</span>
                    <code className="font-mono text-xs">{c}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                统计
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">提交次数</span>
                  <span className="text-white/80">
                    {problem.submissions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">通过次数</span>
                  <span className="text-emerald-400">
                    {problem.accepted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">通过率</span>
                  <span className="text-white/80">{acceptRate}%</span>
                </div>
              </div>
            </div>

            {/* Hint */}
            {problem.hint && (
              <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
                <summary className="cursor-pointer select-none p-4 text-xs font-semibold uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors list-none flex items-center justify-between">
                  <span>💡 提示</span>
                  <span className="text-white/30 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="border-t border-white/10 p-4 text-sm text-white/60 leading-relaxed">
                  {problem.hint}
                </div>
              </details>
            )}

            {/* Related problems */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                相关题目
              </h3>
              <div className="space-y-2">
                {problems
                  .filter(
                    (p) =>
                      p.id !== problem.id &&
                      p.tags.some((t) => problem.tags.includes(t))
                  )
                  .slice(0, 5)
                  .map((related) => (
                    <Link
                      key={related.id}
                      href={`/problems/${related.id}`}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <span className="truncate">
                        {related.id}. {related.title}
                      </span>
                      <span
                        className={`ml-2 shrink-0 text-xs ${
                          related.difficulty === "简单"
                            ? "text-emerald-400"
                            : related.difficulty === "中等"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {related.difficulty}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
