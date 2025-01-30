export interface TestCase {
  input: any[];
  output: any;
  description?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: string;
  testCases: TestCase[];
  solution?: string;
}

export const sampleQuestions: CodingQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "easy",
    category: "Arrays & Hashing",
    description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers in the array such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
    `,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists.",
    ],
    starterCode: `function twoSum(nums, target) {
    // Write your code here
};`,
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        output: [0, 1],
      },
      {
        input: [[3, 2, 4], 6],
        output: [1, 2],
      },
      {
        input: [[3, 3], 6],
        output: [0, 1],
      },
    ],
    solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
  },
];
