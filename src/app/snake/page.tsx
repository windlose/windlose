"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Direction = Point;

const GRID_COLS = 20;
const GRID_ROWS = 20;
const STEP_MS = 120;
const HIGH_SCORE_KEY = "snake.highScore";

function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function isOpposite(a: Direction, b: Direction): boolean {
  return a.x === -b.x && a.y === -b.y;
}

function randomApple(excluded: Point[]): Point {
  while (true) {
    const x = Math.floor(Math.random() * GRID_COLS);
    const y = Math.floor(Math.random() * GRID_ROWS);
    const p = { x, y };
    if (!excluded.some((q) => pointsEqual(q, p))) return p;
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const snakeRef = useRef<Point[]>([
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ]);
  const dirRef = useRef<Direction>({ x: 1, y: 0 });
  const nextDirRef = useRef<Direction>({ x: 1, y: 0 });
  const appleRef = useRef<Point>(randomApple(snakeRef.current));
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const accRef = useRef<number>(0);

  const resizeCanvas = useCallback((): void => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const cssSize = Math.floor(container.clientWidth);
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    canvas.width = Math.floor(cssSize * dpr);
    canvas.height = Math.floor(cssSize * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const resetGame = useCallback((): void => {
    snakeRef.current = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    appleRef.current = randomApple(snakeRef.current);
    setScore(0);
    setPaused(false);
    setGameOver(false);
  }, []);

  const setDirection = useCallback((d: Direction): void => {
    const current = dirRef.current;
    if (!isOpposite(current, d)) {
      nextDirRef.current = d;
    }
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent): void => {
      const code = e.code || e.key;
      let handled = true;
      switch (code) {
        case "ArrowUp":
        case "KeyW":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "KeyS":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "KeyA":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "KeyD":
          setDirection({ x: 1, y: 0 });
          break;
        case "Space":
        case "KeyP":
          setPaused((p) => !p);
          break;
        case "Enter":
          if (gameOver) resetGame();
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    },
    [gameOver, resetGame, setDirection]
  );

  const touchStateRef = useRef<{ x: number; y: number; moved: boolean } | null>(
    null
  );
  const onTouchStart = useCallback((e: React.TouchEvent): void => {
    const t = e.touches[0];
    touchStateRef.current = { x: t.clientX, y: t.clientY, moved: false };
  }, []);
  const onTouchMove = useCallback(
    (e: React.TouchEvent): void => {
      const t = e.touches[0];
      const st = touchStateRef.current;
      if (!st) return;
      const dx = t.clientX - st.x;
      const dy = t.clientY - st.y;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const threshold = 24;
      if (!st.moved && (adx > threshold || ady > threshold)) {
        st.moved = true;
        if (adx > ady) {
          setDirection({ x: dx > 0 ? 1 : -1, y: 0 });
        } else {
          setDirection({ x: 0, y: dy > 0 ? 1 : -1 });
        }
        setPaused(false);
      }
    },
    [setDirection]
  );
  const onTouchEnd = useCallback((): void => {
    touchStateRef.current = null;
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_KEY);
      if (stored) setHighScore(parseInt(stored, 10) || 0);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
    } catch {}
  }, [highScore]);

  useEffect(() => {
    type KeydownListener = (this: Window, ev: KeyboardEvent) => void;
    const listener: KeydownListener = (e) => handleKey(e);
    window.addEventListener("keydown", listener, { passive: false });
    return () => window.removeEventListener("keydown", listener);
  }, [handleKey]);

  useEffect(() => {
    resizeCanvas();
    const obs = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [resizeCanvas]);

  const step = useCallback((): void => {
    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const head = snake[0];
    const dir = dirRef.current;
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    const willGrow = pointsEqual(newHead, appleRef.current);

    // Wall collision
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= GRID_COLS ||
      newHead.y >= GRID_ROWS
    ) {
      setGameOver(true);
      setPaused(true);
      setHighScore((hs) => Math.max(hs, score));
      return;
    }

    // Self collision (ignore the tail if not growing)
    const bodyToCheck = willGrow ? snake : snake.slice(0, -1);
    if (bodyToCheck.some((p) => pointsEqual(p, newHead))) {
      setGameOver(true);
      setPaused(true);
      setHighScore((hs) => Math.max(hs, score));
      return;
    }

    // Move
    const newSnake = [newHead, ...snake];
    if (willGrow) {
      setScore((s) => s + 1);
      appleRef.current = randomApple(newSnake);
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
  }, [score]);

  const draw = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;

    ctx.clearRect(0, 0, cssW, cssH);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, cssW, cssH);

    const cell = Math.floor(cssW / GRID_COLS);
    const padding = Math.floor(clamp(0, Math.min(4, cell * 0.1), 6));

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= GRID_COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cell + 0.5, 0);
      ctx.lineTo(x * cell + 0.5, cssH);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cell + 0.5);
      ctx.lineTo(cssW, y * cell + 0.5);
      ctx.stroke();
    }

    // Apple
    const apple = appleRef.current;
    ctx.fillStyle = "#ef4444";
    const ax = apple.x * cell + padding;
    const ay = apple.y * cell + padding;
    const asz = cell - padding * 2;
    drawRoundedRect(ctx, ax, ay, asz, asz, Math.min(6, padding * 2));
    ctx.fill();

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const x = seg.x * cell + padding;
      const y = seg.y * cell + padding;
      const sz = cell - padding * 2;
      if (i === 0) ctx.fillStyle = "#22c55e";
      else ctx.fillStyle = "#16a34a";
      drawRoundedRect(ctx, x, y, sz, sz, Math.min(8, padding * 2 + 2));
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    if (paused) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - (lastTsRef.current as number);
      lastTsRef.current = ts;
      accRef.current += dt;

      while (accRef.current >= STEP_MS && !paused && !gameOver) {
        accRef.current -= STEP_MS;
        step();
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [paused, gameOver, step, draw]);

  useEffect(() => {
    const handleVis = () => {
      if (document.hidden) setPaused(true);
    };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  const handleControl = useCallback(
    (d: Direction): void => {
      setDirection(d);
      setPaused(false);
    },
    [setDirection]
  );

  return (
    <div className="flex min-h-[100dvh] flex-col items-center p-4" aria-live="polite">
      <div className="w-full max-w-md" ref={containerRef}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-base font-semibold">贪吃蛇 Snake</div>
          <div className="flex items-center gap-3 text-sm">
            <span>分数 {score}</span>
            <span className="opacity-70">最高 {Math.max(highScore, score)}</span>
          </div>
        </div>

        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <canvas
            ref={canvasRef}
            className="block h-full w-full touch-none rounded-xl border border-white/10 shadow"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />

          {gameOver && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="pointer-events-auto mx-4 w-full max-w-[85%] rounded-xl bg-black/70 p-4 text-center backdrop-blur">
                <div className="mb-2 text-lg font-bold">游戏结束</div>
                <div className="mb-4 text-sm opacity-80">分数 {score} · 最高 {Math.max(highScore, score)}</div>
                <button
                  onClick={resetGame}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white active:scale-[0.98]"
                >
                  重新开始
                </button>
              </div>
            </div>
          )}

          {!gameOver && (
            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
              <div className="pointer-events-auto grid grid-cols-3 gap-2">
                <button
                  aria-label="上"
                  onClick={() => handleControl({ x: 0, y: -1 })}
                  className="col-span-3 rounded-md bg-white/10 px-4 py-2 text-white backdrop-blur active:scale-95"
                >
                  ↑ 上
                </button>
                <button
                  aria-label="左"
                  onClick={() => handleControl({ x: -1, y: 0 })}
                  className="rounded-md bg-white/10 px-4 py-2 text-white backdrop-blur active:scale-95"
                >
                  ← 左
                </button>
                <button
                  aria-label="下"
                  onClick={() => handleControl({ x: 0, y: 1 })}
                  className="rounded-md bg-white/10 px-4 py-2 text-white backdrop-blur active:scale-95"
                >
                  ↓ 下
                </button>
                <button
                  aria-label="右"
                  onClick={() => handleControl({ x: 1, y: 0 })}
                  className="rounded-md bg-white/10 px-4 py-2 text-white backdrop-blur active:scale-95"
                >
                  → 右
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaused((p) => !p)}
              className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 active:scale-95"
            >
              {paused ? "继续" : "暂停"}
            </button>
            <button
              onClick={resetGame}
              className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 active:scale-95"
            >
              重开
            </button>
          </div>
          <div className="text-xs opacity-70">支持 方向键 / WASD / 触控滑动</div>
        </div>
      </div>
    </div>
  );
}
