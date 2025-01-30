import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProgressStatus, UserProgress } from "@/types/progress";

interface ProgressStore {
  progress: UserProgress[];
  updateProgress: (itemId: string, status: ProgressStatus) => void;
  getProgress: (itemId: string) => ProgressStatus | null;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: [],
      updateProgress: (itemId: string, status: ProgressStatus) => {
        set((state) => {
          const newProgress = state.progress.filter((p) => p.itemId !== itemId);
          return {
            progress: [
              ...newProgress,
              {
                userId: "default", // Replace with actual user ID when auth is implemented
                itemId,
                status,
                lastUpdated: new Date(),
              },
            ],
          };
        });
      },
      getProgress: (itemId: string) => {
        const progress = get().progress.find((p) => p.itemId === itemId);
        return progress?.status || null;
      },
    }),
    {
      name: "progress-storage",
    }
  )
);
