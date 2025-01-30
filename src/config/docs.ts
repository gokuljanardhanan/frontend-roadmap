import { Doc } from "@/types/docs";
import { javascriptBasicsContent } from "./documentation/JavascriptBasics";
import { NamasteJavascript1 } from "./documentation/NamasteJavascript1";
import { NamasteJavascript2 } from "./documentation/NamasteJavascript2";
import { coreJsFundamentals } from "./documentation/CoreJsFundamentals";
import { CssBasics } from "./documentation/CssBasics";
import { howWebWorks } from "./documentation/howWebWorks";
import { cssPreprocessor } from "./documentation/cssPreprocessor";
import { moduleBundler } from "./documentation/moduleBundler";
import { ReactFundamentals1 } from "./documentation/ReactFundamentals1";
import { ReactBasics } from "./documentation/ReactBasics";
import { ReactState } from "./documentation/ReactState";
import { JsCompilation } from "./documentation/JsCompilation";
import { GarbageCollector } from "./documentation/GarbageCollector";
import { reduxAndMiddleware } from "./documentation/ReduxAndMiddleware";
import { caching } from "./documentation/Caching";
import { frontendInfra } from "./documentation/FrontendInfra";
import { LoggingMonitoring } from "./documentation/LoggingMonitoring";
import { testing } from "./documentation/Testing";
import { accessibility } from "./documentation/Accessibility";
import { Networking } from "./documentation/Networking";
import { Security } from "./documentation/Security";
import { Performance } from "./documentation/Performance";

export type Doc = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
  folder:
    | "javascript"
    | "css"
    | "react"
    | "system-design"
    | "performance"
    | "frontend-infra";
};

export const sampleDocs: Doc[] = [
  {
    id: "1",
    title: "Getting Started with Frontend Development",
    slug: "getting-started-frontend",
    description:
      "Learn the basics of frontend development and set up your development environment.",
    content: `
# Getting Started with Frontend Development

Frontend development is the practice of creating the user interface and user experience of a website or web application...

## Prerequisites
- Basic understanding of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)
- Node.js installed on your computer

## Setting Up Your Environment
1. Install VS Code
2. Install essential extensions
3. Set up your first project
    `,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    tags: ["frontend", "beginner", "setup"],
    published: true,
    folder: "javascript",
  },
  {
    id: "2",
    title: "Data Structures and Algorithms Guide",
    slug: "dsa-guide",
    description:
      "Comprehensive guide to common data structures and algorithms with practical examples.",
    content: `
# Data Structures and Algorithms Guide

A comprehensive guide to understanding when and how to use different data structures and algorithms.

## 1. Arrays & Hashing

**When to Use**:
Use arrays when data needs to be stored contiguously and accessed by index.
Use hashing for quick lookups, duplicates, and frequency counts.

**Common Applications:**
Storing sequential data, frequency counts, detecting duplicates.

**Clues:**
If you're given a problem involving unsorted data and you need quick lookups or counts (e.g., finding duplicates, sums, or frequencies).

**Examples:**
Find the intersection of two arrays, Subarray Sum Equals K.

## 2. Two Pointers

**When to Use**:
When dealing with sorted arrays or problems requiring comparison from both ends of a list.

**Common Applications:**
Finding pairs or triplets, checking palindromes.

**Clues:**
If the problem asks for an optimized way to find pairs or solve a problem in O(n).

**Examples:**
Container With Most Water, 3-Sum Problem.

## 3. Sliding Window

**When to Use**:
When working with subarrays or substrings and needing to find the maximum, minimum, or a specific condition.

**Common Applications:**
String manipulation, subarray problems.

**Clues:**
If you need to calculate something over consecutive elements or dynamic windows.

**Examples:**
Longest Substring Without Repeating Characters, Minimum Window Substring.

## 4. Stack

**When to Use**:
When solving problems with LIFO (Last In, First Out) logic or hierarchical structures.

**Common Applications:**
Balanced parentheses, evaluating expressions, and monotonic ranges.

**Clues:**
Look for nested structures, "most recent," or "previous" logic.

**Examples:**
Valid Parentheses, Daily Temperatures.

## 5. Queue & Deque

**When to Use**:
For FIFO (First In, First Out) problems or problems involving a moving window.

**Common Applications:**
BFS in graphs, sliding window maximum.

**Clues:**
Problems asking for the "earliest" or "first" item in a sequence or sliding window.

**Examples:**
Rotten Oranges (BFS), Sliding Window Maximum.

## 6. Linked List

**When to Use**:
For dynamic memory allocation where inserting/deleting nodes in O(1) is needed.

**Common Applications:**
LRU Cache, dynamic data storage.

**Clues:**
Problems needing dynamic node connections or traversal in O(n).

**Examples:**
Reverse a Linked List, Merge Two Sorted Lists.

## 7. Binary Search

**When to Use**:
On sorted data or when you need to optimize a problem that suggests divide and conquer.

**Common Applications:**
Searching efficiently in sorted arrays, finding the smallest/biggest satisfying a condition.

**Clues:**
If the problem involves sorted data or you need to find an optimal value.

**Examples:**
Search in Rotated Sorted Array, Median of Two Sorted Arrays.

## 8. Trees

**When to Use**:
For hierarchical data, like folders or organizational structures.

**Common Applications:**
Traversals (In-order, Pre-order, Post-order), BST for searching.

**Clues:**
Problems involving hierarchical relationships or recursive structures.

**Examples:**
Lowest Common Ancestor, Binary Tree Zigzag Traversal.

## 9. Tries

**When to Use**:
For problems involving strings with shared prefixes.

**Common Applications:**
Auto-complete, prefix searches.

**Clues:**
If the problem involves efficiently finding words or prefixes.

**Examples:**
Implement Trie, Word Search II.

## 10. Heap / Priority Queue

**When to Use**:
For priority-based problems or finding the k-th smallest/largest elements.

**Common Applications:**
Scheduling problems, top-K problems.

**Clues:**
If the problem involves dynamic order retrieval or priority processing.

**Examples:**
Top K Frequent Elements, Merge K Sorted Lists.

## 11. Backtracking

**When to Use**:
When solving problems that involve exploring all possibilities with constraints.

**Common Applications:**
N-Queens, Subset problems.

**Clues:**
Problems asking for all combinations, permutations, or paths.

**Examples:**
N-Queens, Subsets II.

## 12. Graphs

**When to Use**:
For problems involving networks or relationships between nodes.

**Common Applications:**
Shortest paths, connected components, cycle detection.

**Clues:**
If the problem involves nodes and edges, or paths and connectivity.

**Examples:**
Course Schedule, Network Delay Time.

## 13. Intervals

**When to Use**:
For overlapping range problems or scheduling.

**Common Applications:**
Merging intervals, scheduling problems.

**Clues:**
Problems involving start and end times or overlapping.

**Examples:**
Merge Intervals, Meeting Rooms II.

## 14. Greedy Algorithms

**When to Use**:
When the problem allows for local optimal choices leading to the global solution.

**Common Applications:**
Activity selection, Huffman encoding.

**Clues:**
Problems that involve maximizing/minimizing something without backtracking.

**Examples:**
Minimum Number of Platforms, Job Scheduling.

## 15. Advanced Graphs

**When to Use**:
For weighted graph problems requiring MST, shortest paths, or advanced connectivity.

**Common Applications:**
Transportation networks, web crawling.

**Clues:**
If the graph is weighted or directed with complex connectivity.

**Examples:**
Prim's Algorithm, Dijkstra's Algorithm.

## 16. 1-D Dynamic Programming

**When to Use**:
For problems requiring state transitions over a single dimension.

**Common Applications:**
Optimization over arrays or sequences.

**Clues:**
Problems involving "min/max costs" or "counts" over sequences.

**Examples:**
House Robber, Climbing Stairs.

## 17. 2-D Dynamic Programming

**When to Use**:
For problems requiring state transitions over two dimensions.

**Common Applications:**
Grid problems, string comparisons.

**Clues:**
Problems on grids/matrices with optimization conditions.

**Examples:**
Longest Common Subsequence, Unique Paths.

## 18. Bit Manipulation

**When to Use**:
For problems involving bit-level operations or optimization.

**Common Applications:**
XOR problems, bit masking, power sets.

**Clues:**
Problems involving powers of 2, toggling bits, or subsets.

**Examples:**
Single Number, Power of Two.

## 19. Math & Geometry

**When to Use**:
For problems involving number theory or geometric calculations.

**Common Applications:**
GCD/LCM, line intersection.

**Clues:**
Problems with divisibility, modular arithmetic, or geometry.

**Examples:**
Count Primes, Rectangle Overlap.

## Tips for Problem Solving

1. **Identify the Pattern**: Look for keywords in the problem that hint at which data structure or algorithm might be most appropriate.

2. **Consider Constraints**: Pay attention to time and space complexity requirements.

3. **Start Simple**: Begin with a brute force solution, then optimize.

4. **Test Edge Cases**: Always consider empty inputs, single elements, and other edge cases.

5. **Practice Regularly**: Consistent practice is key to mastering these concepts.
    `,
    author: {
      id: "2",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    tags: ["DSA", "algorithms", "data-structures", "interview-prep"],
    published: true,
    folder: "javascript",
  },
  {
    id: "3",
    title: "JavaScript Core Concepts",
    slug: "javascript-basics",
    description:
      "A comprehensive guide to JavaScript core concepts including data types, promises, coercion, prototypes, and control flow.",
    content: javascriptBasicsContent,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "javascript",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "4",
    title: "Namaste Javascript",
    slug: "namaste-javascript",
    description:
      "A comprehensive guide to JavaScript core concepts including data types, promises, coercion, prototypes, and control flow.",
    content: NamasteJavascript1,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "javascript",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "5",
    title: "Namaste Javascript 2",
    slug: "namaste-javascript2",
    description:
      "A comprehensive guide to JavaScript core concepts including data types, promises, coercion, prototypes, and control flow.",
    content: NamasteJavascript2,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "javascript",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "6",
    title: "Core Javascript Fundamentals",
    slug: "core-javascript-fundamentals",
    description:
      "A comprehensive guide to JavaScript core concepts including data types, promises, coercion, prototypes, and control flow.",
    content: coreJsFundamentals,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "javascript",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "7",
    title: "CSS Basics",
    slug: "css-basics",
    description: "A comprehensive guide to CSS basics",
    content: CssBasics,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["css", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "css",
  },
  {
    id: "8",
    title: "How Web Works",
    slug: "how-web-works",
    description: "How the web works",
    content: howWebWorks,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["web", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "javascript",
  },
  {
    id: "9",
    title: "CSS Preprocessor",
    slug: "css-preprocessor",
    description: "CSS Preprocessor",
    content: cssPreprocessor,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["css", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "css",
  },
  {
    id: "10",
    title: "Module Bundler",
    slug: "module-bundler",
    description: "Module Bundler",
    content: moduleBundler,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["css", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "javascript",
  },
  {
    id: "11",
    title: "React Fundamentals 1",
    slug: "react-fundamentals1",
    description: "React Fundamentals 1",
    content: ReactFundamentals1,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["react", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "react",
  },
  {
    id: "12",
    title: "React Basics",
    slug: "react-basics",
    description: "React Basics",
    content: ReactBasics,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["react", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "react",
  },
  {
    id: "13",
    title: "React State",
    slug: "react-state",
    description: "React State",
    content: ReactState,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["react", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "react",
  },
  {
    id: "14",
    title: "Redux and Middleware",
    slug: "redux-and-middleware",
    description: "Redux and Middleware",
    content: reduxAndMiddleware,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["react", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "react",
  },
  {
    id: "15",
    title: "Js Compilation",
    slug: "js-compilation",
    description: "Js Compilation",
    content: JsCompilation,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "javascript",
      "programming",
      "web-development",
      "coding",
      "tutorial",
      "js-compilation",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "16",
    title: "Garbage Collector",
    slug: "garbage-collector",
    description: "Garbage Collector",
    content: GarbageCollector,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "programming",
      "web-development",
      "coding",
      "tutorial",
      "garbage-collector",
      "memory-leak",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "17",
    title: "Caching",
    slug: "frontend-caching-vs-backend-caching",
    description: "Frontend Caching vs Backend Caching",
    content: caching,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["caching", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "javascript",
  },
  {
    id: "18",
    title: "Frontend Infrastructure",
    slug: "frontend-infrastructure",
    description: "Frontend Infrastructure",
    content: frontendInfra,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["frontend", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "frontend-infra",
  },
  {
    id: "19",
    title: "Logging and Monitoring",
    slug: "logging-and-monitoring",
    description: "Logging and Monitoring",
    content: LoggingMonitoring,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "logging",
      "monitoring",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "20",
    title: "Testing",
    slug: "testing",
    description: "Testing",
    content: testing,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["testing", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "javascript",
  },
  {
    id: "21",
    title: "Accessibility",
    slug: "accessibility",
    description: "Accessibility",
    content: accessibility,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "accessibility",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "22",
    title: "Networking",
    slug: "networking",
    description: "Networking",
    content: Networking,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "networking",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
  {
    id: "23",
    title: "Security",
    slug: "security",
    description: "Security",
    content: Security,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: ["security", "programming", "web-development", "coding", "tutorial"],
    published: true,
    folder: "javascript",
  },
  {
    id: "24",
    title: "Performance",
    slug: "performance",
    description: "Performance",
    content: Performance,
    author: {
      id: "1",
      name: "Gokul Janardhanan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2024-03-10T10:02:00Z",
    updatedAt: "2024-03-10T10:02:00Z",
    tags: [
      "performance",
      "programming",
      "web-development",
      "coding",
      "tutorial",
    ],
    published: true,
    folder: "javascript",
  },
];
