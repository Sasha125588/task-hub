import type { IconCategory, IconData } from "@/constants/icons/types";
import type { LucideIcon } from "lucide-react";

export const createSearchTerms = (name: string): string => {
  const friendlyName = name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

  return `${name.toLowerCase()} ${friendlyName.toLowerCase()}`;
};

export const createIconData = (
  name: string,
  Component: LucideIcon,
  category: IconCategory
): IconData => ({
  name,
  Component,
  searchTerms: createSearchTerms(name),
  category,
});
