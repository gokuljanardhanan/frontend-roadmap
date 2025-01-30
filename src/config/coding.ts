export interface TestCase {
  input: (string | number | boolean | object)[];
  output:
    | (string | number | boolean | object)[]
    | string
    | number
    | boolean
    | object;
  explanation?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
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
  handlerFunction: string;
  hints?: string[];
}

export const sampleQuestions: CodingQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
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
        input: [2, 7, 11, 15, 9],
        output: [0, 1],
        explanation: "Because nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: [3, 2, 4],
        output: [1, 2],
      },
      {
        input: [3, 3],
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
    handlerFunction: "twoSum",
    hints: [
      "Try using a hash map to store complements",
      "Think about the time complexity",
    ],
  },
];
