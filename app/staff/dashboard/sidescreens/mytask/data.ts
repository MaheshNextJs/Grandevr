// data/staff/tasks.ts
export type Priority = "High" | "Medium" | "Low";
export type TaskStatus = "Open" | "In Progress" | "Completed" | "Active";

export type Task = {
  id: string;
  source: "Reputation" | "Maintenance" | "Admin Manual";
  description: string;
  priority: Priority;
  status: TaskStatus | TaskStatus[];
  roomType?: "Deluxe" | "Executive" | "Suite";
  date?: string; // ISO date string
};

export const TASKS: Task[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `STF${String(i + 1).padStart(3, "0")}`,
  source: (["Reputation", "Maintenance", "Admin Manual"] as const)[i % 3],
  description: "Guest complaint regarding room amenities…",
  priority: (["High", "Medium", "Low"] as const)[i % 3],
  status:
    i % 5 === 0
      ? (["In Progress", "Open"] as const)
      : (["Completed", "Open", "Active"] as const)[i % 3],
  roomType: (["Deluxe", "Executive", "Suite"] as const)[i % 3],
  date: "2025-09-27",
}));
