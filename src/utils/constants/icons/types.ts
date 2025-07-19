import type { LucideIcon } from "lucide-react";

export interface IconData {
  name: string;
  Component: LucideIcon;
  searchTerms: string;
  category: IconCategory;
}

export type IconCategory =
  | "navigation"
  | "actions"
  | "communication"
  | "media"
  | "devices"
  | "files"
  | "business"
  | "transportation"
  | "tools"
  | "design"
  | "nature"
  | "entertainment"
  | "status";
