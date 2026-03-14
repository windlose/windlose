import Link from "next/link";

const features = [
  {
    href: "/problems",
    emoji: "🧩",
    title: "刷题仓库",
    description: "LeetCode 风格的编程题库，涵盖数组、链表、动态规划等热门题型",
    badge: "NEW",
  },
  {
    href: "/snake",
    emoji: "🐍",
    title: "贪吃蛇",
    description: "经典贪吃蛇小游戏，支持键盘和触控操作",
    badge: null,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Windlose</h1>
          <p className="text-white/50 text-sm">个人工具与小项目集合</p>
        </div>

        <div className="grid gap-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="text-3xl">{f.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-white/90 group-hover:text-white transition-colors">
                    {f.title}
                  </span>
                  {f.badge && (
                    <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-1.5 py-0.5 text-[10px] font-semibold text-blue-300">
                      {f.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/40 truncate">{f.description}</p>
              </div>
              <span className="text-white/20 group-hover:text-white/50 transition-colors">→</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
