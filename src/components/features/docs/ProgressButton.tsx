"use client";

import { useProgressStore } from "@/store/useProgressStore";
import { ProgressStatus } from "@/types/progress";
import { useState, useRef, useEffect } from "react";

interface ProgressButtonProps {
  itemId: string;
}

export function ProgressButton({ itemId }: ProgressButtonProps) {
  const { updateProgress, getProgress } = useProgressStore();
  const currentStatus = getProgress(itemId) || "pending";
  const [status, setStatus] = useState<ProgressStatus>(currentStatus);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusStyles = {
    pending:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200",
    in_progress:
      "bg-blue-200 text-blue-800 hover:bg-blue-300 dark:bg-blue-900 dark:text-blue-200",
    completed:
      "bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-900 dark:text-green-200",
  };

  const statusLabels: Record<ProgressStatus, string> = {
    pending: "Not Started",
    in_progress: "In Progress",
    completed: "Completed",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus: ProgressStatus) => {
    setStatus(newStatus);
    updateProgress(itemId, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800">
          {(Object.keys(statusLabels) as ProgressStatus[]).map((statusKey) => (
            <button
              key={statusKey}
              onClick={() => handleStatusChange(statusKey)}
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <span>{statusLabels[statusKey]}</span>
              {status === statusKey && (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
