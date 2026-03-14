export type Difficulty = "简单" | "中等" | "困难";

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  hint?: string;
  accepted: number;
  submissions: number;
}
