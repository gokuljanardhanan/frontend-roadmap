"use client";

import { Quiz, sampleQuiz } from "@/config/quiz";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function QuizPage() {
  const [currentQuiz] = useState<Quiz>(sampleQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === currentQuiz.questions.length - 1;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const question = currentQuiz.questions.find((q) => q.id === questionId);
      if (!question) return prev;

      if (question.multipleCorrect) {
        const currentAnswers = prev[questionId] || [];
        const updatedAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter((id) => id !== optionId)
          : [...currentAnswers, optionId];
        return { ...prev, [questionId]: updatedAnswers };
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = currentQuiz.questions.find((q) => q.id === questionId);
    const userAnswers = answers[questionId] || [];
    const correctAnswers = question?.correctAnswers || [];

    return (
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((answer) => correctAnswers.includes(answer))
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (isAnswerCorrect(currentQuestion.id)) {
      setScore((prev) => prev + (currentQuestion.points || 1));
    }

    // Auto-advance to next question after a delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSubmitted(false);
      }, 1500);
    }
  };

  const isOptionSelected = (questionId: string, optionId: string) => {
    return (answers[questionId] || []).includes(optionId);
  };

  const isCorrectAnswer = (questionId: string, optionId: string) => {
    const question = currentQuiz.questions.find((q) => q.id === questionId);
    return question?.correctAnswers.includes(optionId);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{currentQuiz.title}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="space-y-4 p-6">
                <h3 className="text-xl font-semibold">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {currentQuestion.description}
                  </p>
                )}

                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() =>
                        !submitted &&
                        handleOptionSelect(currentQuestion.id, option.id)
                      }
                      className={`w-full rounded-lg border p-4 text-left transition-colors
                        ${
                          isOptionSelected(currentQuestion.id, option.id)
                            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                        }
                        ${
                          submitted &&
                          isCorrectAnswer(currentQuestion.id, option.id) &&
                          "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
                        }
                        ${
                          submitted &&
                          isOptionSelected(currentQuestion.id, option.id) &&
                          !isCorrectAnswer(currentQuestion.id, option.id) &&
                          "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20"
                        }
                      `}
                    >
                      <span className="text-sm">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Score: {score} /{" "}
          {currentQuiz.questions
            .slice(0, currentQuestionIndex + (submitted ? 1 : 0))
            .reduce((acc, q) => acc + (q.points || 1), 0)}
        </div>

        {isLastQuestion && submitted ? (
          <div className="text-lg font-semibold">
            Final Score:{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {score} /{" "}
              {currentQuiz.questions.reduce(
                (acc, q) => acc + (q.points || 1),
                0
              )}
            </span>
          </div>
        ) : (
          !submitted && (
            <Button
              onClick={handleSubmit}
              disabled={!answers[currentQuestion.id]?.length}
              className="px-8"
            >
              Submit Answer
            </Button>
          )
        )}
      </div>
    </div>
  );
}
