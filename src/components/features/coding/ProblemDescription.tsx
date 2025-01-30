import { CodingQuestion } from "@/config/coding";
import Card from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface ProblemDescriptionProps {
  question: CodingQuestion;
}

export function ProblemDescription({ question }: ProblemDescriptionProps) {
  return (
    <Card className="h-full overflow-y-auto p-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <div className="mt-2 flex gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium
                ${
                  question.difficulty === "Easy"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }
              `}
            >
              {question.difficulty}
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {question.category}
            </span>
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <ReactMarkdown>{question.description}</ReactMarkdown>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Examples:</h2>
          <div className="mt-2 space-y-4">
            {question.examples.map((example, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
              >
                <div className="font-mono">
                  <div>Input: {example.input}</div>
                  <div>Output: {example.output}</div>
                  {example.explanation && (
                    <div>Explanation: {example.explanation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Constraints:</h2>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            {question.constraints.map((constraint, index) => (
              <li key={index} className="font-mono text-sm">
                {constraint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
