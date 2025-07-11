import {
  Lightbulb,
  Award,
  Trophy,
  Medal,
  Gift,
  PartyPopper,
  Cake,
  Coffee,
  Pizza,
  Star,
  Heart,
  Music,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const ENTERTAINMENT_ICONS: IconData[] = [
  createIconData("Lightbulb", Lightbulb, "entertainment"),
  createIconData("Award", Award, "entertainment"),
  createIconData("Trophy", Trophy, "entertainment"),
  createIconData("Medal", Medal, "entertainment"),
  createIconData("Gift", Gift, "entertainment"),
  createIconData("PartyPopper", PartyPopper, "entertainment"),
  createIconData("Cake", Cake, "entertainment"),
  createIconData("Coffee", Coffee, "entertainment"),
  createIconData("Pizza", Pizza, "entertainment"),
  createIconData("Star", Star, "entertainment"),
  createIconData("Heart", Heart, "entertainment"),
  createIconData("Music", Music, "entertainment"),
];
