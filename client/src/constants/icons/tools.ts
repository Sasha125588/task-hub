import {
  Wrench,
  Hammer,
  Scissors,
  Ruler,
  Timer,
  Terminal,
  Command,
  Code,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const TOOL_ICONS: IconData[] = [
  createIconData("Wrench", Wrench, "tools"),
  createIconData("Hammer", Hammer, "tools"),
  createIconData("Scissors", Scissors, "tools"),
  createIconData("Ruler", Ruler, "tools"),
  createIconData("Timer", Timer, "tools"),
  createIconData("Terminal", Terminal, "tools"),
  createIconData("Command", Command, "tools"),
  createIconData("Code", Code, "tools"),
];
