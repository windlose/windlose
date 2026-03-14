import { Problem } from "@/types/problem";

export const problems: Problem[] = [
  {
    id: 1,
    title: "两数之和",
    difficulty: "简单",
    tags: ["数组", "哈希表"],
    description:
      "给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** `target` 的那 **两个** 整数，并返回它们的数组下标。\n\n你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。\n\n你可以按任意顺序返回答案。",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "因为 nums[0] + nums[1] == 9，返回 [0, 1]。",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "只会存在一个有效答案",
    ],
    hint: "使用哈希表存储已遍历过的元素，对于每个元素 x，查找 target - x 是否已在哈希表中。",
    accepted: 8523041,
    submissions: 15234567,
  },
  {
    id: 2,
    title: "两数相加",
    difficulty: "中等",
    tags: ["链表", "数学", "递归"],
    description:
      "给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。\n\n请你将两个数相加，并以相同形式返回一个表示和的链表。\n\n你可以假设除了数字 0 之外，这两个数都不会以 0 开头。",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    constraints: [
      "每个链表中的节点数在范围 [1, 100] 内",
      "0 <= Node.val <= 9",
      "题目数据保证列表表示的数字不含前导零",
    ],
    hint: "同时遍历两个链表，逐位相加并记录进位。",
    accepted: 3241089,
    submissions: 6892341,
  },
  {
    id: 3,
    title: "无重复字符的最长子串",
    difficulty: "中等",
    tags: ["哈希表", "字符串", "滑动窗口"],
    description:
      "给定一个字符串 `s`，请你找出其中不含有重复字符的 **最长子串** 的长度。",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: '因为无重复字符的最长子串是 "abc"，所以其长度为 3。',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: '因为无重复字符的最长子串是 "b"，所以其长度为 1。',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation:
          '因为无重复字符的最长子串是 "wke"，所以其长度为 3。请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10⁴",
      "s 由英文字母、数字、符号和空格组成",
    ],
    hint: "使用滑动窗口和哈希集合，当遇到重复字符时移动左指针。",
    accepted: 6123456,
    submissions: 14567890,
  },
  {
    id: 5,
    title: "最长回文子串",
    difficulty: "中等",
    tags: ["字符串", "动态规划"],
    description:
      "给你一个字符串 `s`，找到 `s` 中最长的 **回文子串**。\n\n如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" 同样是符合题意的答案。',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: ["1 <= s.length <= 1000", "s 仅由数字和英文字母组成"],
    hint: "从每个字符（或字符间隙）向两侧扩展，寻找最长的回文中心。",
    accepted: 4321098,
    submissions: 11234567,
  },
  {
    id: 20,
    title: "有效的括号",
    difficulty: "简单",
    tags: ["栈", "字符串"],
    description:
      "给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s`，判断字符串是否有效。\n\n有效字符串需满足：\n1. 左括号必须用相同类型的右括号闭合。\n2. 左括号必须以正确的顺序闭合。\n3. 每个右括号都有一个对应的相同类型的左括号。",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: ["1 <= s.length <= 10⁴", "s 仅由括号 '()[]{}' 组成"],
    hint: "使用栈数据结构，遇到左括号入栈，遇到右括号时检查栈顶是否匹配。",
    accepted: 5678901,
    submissions: 11234567,
  },
  {
    id: 21,
    title: "合并两个有序链表",
    difficulty: "简单",
    tags: ["链表", "递归"],
    description:
      "将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "两个链表的节点数目范围是 [0, 50]",
      "-100 <= Node.val <= 100",
      "l1 和 l2 均按 非递减顺序 排列",
    ],
    hint: "比较两个链表头节点的大小，递归或迭代地选取较小的节点。",
    accepted: 7123456,
    submissions: 10234567,
  },
  {
    id: 53,
    title: "最大子数组和",
    difficulty: "中等",
    tags: ["数组", "分治", "动态规划"],
    description:
      "给你一个整数数组 `nums`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。\n\n**子数组** 是数组中的一个连续部分。",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "连续子数组 [4,-1,2,1] 的和最大，为 6。",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10⁵",
      "-10⁴ <= nums[i] <= 10⁴",
    ],
    hint: "使用 Kadane 算法：维护当前子数组和，若小于 0 则重新从下一个元素开始。",
    accepted: 4567890,
    submissions: 9123456,
  },
  {
    id: 70,
    title: "爬楼梯",
    difficulty: "简单",
    tags: ["记忆化搜索", "数学", "动态规划"],
    description:
      "假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。\n\n每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "有两种方法可以爬到楼顶。1. 1 阶 + 1 阶 2. 2 阶",
      },
      {
        input: "n = 3",
        output: "3",
        explanation:
          "有三种方法可以爬到楼顶。1. 1 阶 + 1 阶 + 1 阶 2. 1 阶 + 2 阶 3. 2 阶 + 1 阶",
      },
    ],
    constraints: ["1 <= n <= 45"],
    hint: "第 n 阶的方法数等于到达第 n-1 阶和第 n-2 阶的方法数之和，这是一个斐波那契数列。",
    accepted: 8901234,
    submissions: 15678901,
  },
  {
    id: 94,
    title: "二叉树的中序遍历",
    difficulty: "简单",
    tags: ["栈", "树", "深度优先搜索", "二叉树"],
    description:
      "给定一个二叉树的根节点 `root`，返回 **它的中序遍历**。",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
      },
      {
        input: "root = []",
        output: "[]",
      },
      {
        input: "root = [1]",
        output: "[1]",
      },
    ],
    constraints: [
      "树中节点数目在范围 [0, 100] 内",
      "-100 <= Node.val <= 100",
    ],
    hint: "递归方式：先遍历左子树，再访问根节点，最后遍历右子树。迭代方式：使用显式栈模拟递归。",
    accepted: 6234567,
    submissions: 9345678,
  },
  {
    id: 121,
    title: "买卖股票的最佳时机",
    difficulty: "简单",
    tags: ["数组", "动态规划"],
    description:
      "给定一个数组 `prices`，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。\n\n你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。\n\n返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0`。",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation:
          "在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "在这种情况下, 没有交易完成, 所以最大利润为 0。",
      },
    ],
    constraints: [
      "1 <= prices.length <= 10⁵",
      "0 <= prices[i] <= 10⁴",
    ],
    hint: "只需一次遍历，维护历史最低价格，每次计算当前价格与历史最低价格的差值即为当天卖出的最大利润。",
    accepted: 7890123,
    submissions: 14567890,
  },
  {
    id: 146,
    title: "LRU 缓存",
    difficulty: "中等",
    tags: ["设计", "哈希表", "链表", "双向链表"],
    description:
      "请你设计并实现一个满足 **LRU (最近最少使用) 缓存** 约束的数据结构。\n\n实现 `LRUCache` 类：\n- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存\n- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1`。\n- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value`；如果不存在，则向缓存中插入该组 `key-value`。如果插入操作导致关键字数量超过 `capacity`，则应该 **逐出** 最久未使用的关键字。\n\n函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。",
    examples: [
      {
        input:
          '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation:
          "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // 缓存是 {1=1}\nlRUCache.put(2, 2); // 缓存是 {1=1, 2=2}\nlRUCache.get(1);    // 返回 1\nlRUCache.put(3, 3); // 该操作会使关键字 2 作废，缓存是 {1=1, 3=3}\nlRUCache.get(2);    // 返回 -1 (未找到)\nlRUCache.put(4, 4); // 该操作会使关键字 1 作废，缓存是 {4=4, 3=3}\nlRUCache.get(1);    // 返回 -1 (未找到)\nlRUCache.get(3);    // 返回 3\nlRUCache.get(4);    // 返回 4",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10⁴",
      "0 <= value <= 10⁵",
      "最多调用 2 * 10⁵ 次 get 和 put",
    ],
    hint: "结合哈希表（O(1) 查找）和双向链表（O(1) 插入删除）来实现。",
    accepted: 2345678,
    submissions: 5678901,
  },
  {
    id: 200,
    title: "岛屿数量",
    difficulty: "中等",
    tags: ["深度优先搜索", "广度优先搜索", "并查集", "矩阵"],
    description:
      "给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。\n\n岛屿总是被水拦截，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。\n\n此外，你可以假设该网格的四条边均被水包围。",
    examples: [
      {
        input:
          'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: "1",
      },
      {
        input:
          'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: "3",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] 的值为 '0' 或 '1'",
    ],
    hint: "遍历矩阵，每遇到 '1' 就进行深度优先搜索将相邻的 '1' 全部标记为已访问，同时岛屿数量加一。",
    accepted: 3456789,
    submissions: 6789012,
  },
  {
    id: 206,
    title: "反转链表",
    difficulty: "简单",
    tags: ["链表", "递归"],
    description:
      "给你单链表的头节点 `head`，请你反转链表，并返回反转后的链表。",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    constraints: [
      "链表中节点的数目范围是 [0, 5000]",
      "-5000 <= Node.val <= 5000",
    ],
    hint: "迭代方式：用三个指针 prev、curr、next 逐步反转每个节点的指向。",
    accepted: 9012345,
    submissions: 13456789,
  },
  {
    id: 300,
    title: "最长递增子序列",
    difficulty: "中等",
    tags: ["数组", "二分查找", "动态规划"],
    description:
      "给你一个整数数组 `nums`，找到其中最长严格递增子序列的长度。\n\n**子序列** 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。",
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "最长递增子序列是 [2,3,7,101]，因此长度为 4。",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1",
      },
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10⁴ <= nums[i] <= 10⁴",
    ],
    hint: "动态规划：dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。优化：使用耐心排序 + 二分查找可以将时间复杂度降至 O(n log n)。",
    accepted: 2678901,
    submissions: 5901234,
  },
  {
    id: 322,
    title: "零钱兑换",
    difficulty: "中等",
    tags: ["广度优先搜索", "数组", "动态规划"],
    description:
      "给你一个整数数组 `coins`，代表不同面额的硬币；以及一个整数 `amount`，代表总金额。\n\n计算并返回可以凑成总金额所需的 **最少的硬币个数**。如果没有任何一种硬币组合能组成总金额，返回 `-1`。\n\n你可以认为每种硬币的数量是无限的。",
    examples: [
      {
        input: "coins = [1,5,10,25], amount = 41",
        output: "4",
        explanation: "25 + 10 + 5 + 1 = 41，共 4 枚硬币。",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2³¹ - 1",
      "0 <= amount <= 10⁴",
    ],
    hint: "经典完全背包问题。dp[i] 表示凑成金额 i 所需最少硬币数，状态转移：dp[i] = min(dp[i], dp[i-coin] + 1)。",
    accepted: 3123456,
    submissions: 7234567,
  },
];

export const allTags = Array.from(
  new Set(problems.flatMap((p) => p.tags))
).sort();
