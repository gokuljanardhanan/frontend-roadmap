export type ProgressStatus = "pending" | "in_progress" | "completed";

export interface UserProgress {
  userId: string;
  itemId: string; // roadmapId or documentId
  status: ProgressStatus;
  lastUpdated: Date;
}
