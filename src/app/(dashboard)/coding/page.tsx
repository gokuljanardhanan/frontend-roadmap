"use client";

import { useState } from "react";
import { sampleQuestions } from "@/config/coding";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CodeEditor } from "@/components/features/coding/CodeEditor";
import { ProblemDescription } from "@/components/features/coding/ProblemDescription";

export default function CodingPage() {
  const [currentQuestion] = useState(sampleQuestions[0]);
  const [code, setCode] = useState(currentQuestion.starterCode);
  const [output, setOutput] = useState<string>("");

  const handleRunCode = async () => {
    try {
      // Create a function from the code string
      const fn = new Function("return " + code)();

      // Run test cases
      const results = currentQuestion.testCases.map((testCase, index) => {
        try {
          const result = fn(...testCase.input);
          const passed =
            JSON.stringify(result) === JSON.stringify(testCase.output);
          return {
            testCase: index + 1,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.output),
            actual: JSON.stringify(result),
            passed,
          };
        } catch (error) {
          return {
            testCase: index + 1,
            input: JSON.stringify(testCase.input),
            error: error.message,
          };
        }
      });

      // Format output
      const outputText = results
        .map(
          (r) =>
            `Test Case ${r.testCase}:\n` +
            `Input: ${r.input}\n` +
            (r.error
              ? `Error: ${r.error}`
              : `Expected: ${r.expected}\nActual: ${r.actual}\nStatus: ${
                  r.passed ? "✅ Passed" : "❌ Failed"
                }`)
        )
        .join("\n\n");

      setOutput(outputText);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Problem Description */}
      <div className="w-[45%] overflow-y-auto">
        <ProblemDescription question={currentQuestion} />
      </div>

      {/* Code Editor and Output */}
      <div className="flex w-[55%] flex-col gap-4">
        <Card className="flex-1">
          <CodeEditor value={code} onChange={setCode} language="javascript" />
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleRunCode} className="px-8">
            Run Code
          </Button>
        </div>

        {output && (
          <Card className="h-[200px] overflow-y-auto">
            <pre className="p-4 font-mono text-sm">{output}</pre>
          </Card>
        )}
      </div>
    </div>
  );
}
