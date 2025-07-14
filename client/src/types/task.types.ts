import type { LucideIcon } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  icon: LucideIcon;
  iconName: string;
  startTime?: string;
  endTime?: string;
  dueDate: Date;
  users: User[];
  subTasks?: subTask[];
  progress: number;
  status: TaskStatuses;
  comments: number;
  attachments: number;
  links: number;
}

export interface User {
  name: string;
  src: string;
}

export interface subTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatuses;
}

export type TaskStatuses = "not-started" | "completed" | "in-progress";

export const StatusFilter = [
  "all",
  "not-started",
  "completed",
  "in-progress",
] as const;

export type TStatusFilter = (typeof StatusFilter)[number];

export type TaskSortType = "asc" | "desc";
