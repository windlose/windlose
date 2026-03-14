"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { problems, allTags } from "@/data/problems";
import { Difficulty } from "@/types/problem";

const difficultyColors: Record<Difficulty, string> = {
  简单: "text-emerald-400",
  中等: "text-yellow-400",
  困难: "text-red-400",
};

const difficultyBg: Record<Difficulty, string> = {
  简单: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  中等: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  困难: "bg-red-400/10 text-red-400 border-red-400/20",
};

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "全部">("全部");
  const [selectedTag, setSelectedTag] = useState<string>("全部");

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.title.includes(search) ||
        String(p.id).includes(search) ||
        p.tags.some((t) => t.includes(search));
      const matchesDifficulty =
        selectedDifficulty === "全部" || p.difficulty === selectedDifficulty;
      const matchesTag =
        selectedTag === "全部" || p.tags.includes(selectedTag);
      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }, [search, selectedDifficulty, selectedTag]);

  const stats = useMemo(() => {
    const total = problems.length;
    const easy = problems.filter((p) => p.difficulty === "简单").length;
    const medium = problems.filter((p) => p.difficulty === "中等").length;
    const hard = problems.filter((p) => p.difficulty === "困难").length;
    return { total, easy, medium, hard };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/50 hover:text-white transition-colors text-sm">
              ← 返回首页
            </Link>
            <span className="text-white/20">|</span>
            <h1 className="text-base font-bold">🧩 刷题仓库</h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>共 <strong className="text-white">{stats.total}</strong> 题</span>
            <span className="text-emerald-400">{stats.easy} 简单</span>
            <span className="text-yellow-400">{stats.medium} 中等</span>
            <span className="text-red-400">{stats.hard} 困难</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="搜索题目、编号或标签..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm placeholder-white/30 focus:border-white/30 focus:outline-none"
          />
          <div className="flex gap-2">
            {(["全部", "简单", "中等", "困难"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedDifficulty === d
                    ? d === "全部"
                      ? "border-white/30 bg-white/10 text-white"
                      : difficultyBg[d as Difficulty]
                    : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["全部", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full border px-3 py-0.5 text-xs transition-colors ${
                selectedTag === tag
                  ? "border-blue-400/40 bg-blue-400/10 text-blue-300"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Problem list */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-white/40">没有找到匹配的题目</div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs text-white/50">
                  <th className="px-4 py-3 w-16">编号</th>
                  <th className="px-4 py-3">题目</th>
                  <th className="px-4 py-3 hidden sm:table-cell">标签</th>
                  <th className="px-4 py-3 w-20 text-center">难度</th>
                  <th className="px-4 py-3 w-24 hidden md:table-cell text-right">通过率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((problem) => {
                  const acceptRate = Math.round(
                    (problem.accepted / problem.submissions) * 100
                  );
                  return (
                    <tr
                      key={problem.id}
                      className="group transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 text-white/40 text-xs">{problem.id}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="font-medium text-white/90 group-hover:text-white transition-colors hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-medium ${difficultyColors[problem.difficulty]}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-right text-xs text-white/40">
                        {acceptRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
