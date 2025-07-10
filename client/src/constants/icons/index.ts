// Re-export types and utilities
export * from "./types";

import { ACTION_ICONS } from "./actions";
import { BUSINESS_ICONS } from "./business";
import { COMMUNICATION_ICONS } from "./communication";
import { DESIGN_ICONS } from "./design";
import { DEVICE_ICONS } from "./devices";
// Import all icon categories

import { ENTERTAINMENT_ICONS } from "./entertainment";
import { FILE_ICONS } from "./files";
import { MEDIA_ICONS } from "./media";
import { NATURE_ICONS } from "./nature";
import { NAVIGATION_ICONS } from "./navigation";
import { STATUS_ICONS } from "./status";
import { TOOL_ICONS } from "./tools";
import { TRANSPORTATION_ICONS } from "./transportation";

import type { IconCategory, IconData } from "./types";

// Combine all icons
export const ICON_REGISTRY: IconData[] = [
  ...NAVIGATION_ICONS,
  ...ACTION_ICONS,
  ...COMMUNICATION_ICONS,
  ...MEDIA_ICONS,
  ...DEVICE_ICONS,
  ...FILE_ICONS,
  ...BUSINESS_ICONS,
  ...TRANSPORTATION_ICONS,
  ...TOOL_ICONS,
  ...DESIGN_ICONS,
  ...NATURE_ICONS,
  ...ENTERTAINMENT_ICONS,
  ...STATUS_ICONS,
];

// Create icon map for fast lookup
const ICON_MAP = new Map(ICON_REGISTRY.map((icon) => [icon.name, icon]));

export const getIcon = (name: string): IconData | undefined =>
  ICON_MAP.get(name);

export const searchIcons = (query: string): IconData[] => {
  if (!query.trim()) return ICON_REGISTRY;

  const searchTerm = query.toLowerCase().trim();
  return ICON_REGISTRY.filter((icon) => icon.searchTerms.includes(searchTerm));
};

export const getIconsByCategory = (category: IconCategory): IconData[] => {
  return ICON_REGISTRY.filter((icon) => icon.category === category);
};

export const getIconCategories = (): IconCategory[] => {
  return Array.from(new Set(ICON_REGISTRY.map((icon) => icon.category)));
};
