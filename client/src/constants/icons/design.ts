import {
  Paintbrush,
  Palette,
  Brush,
  Eraser,
  Pencil,
  PenTool,
  Type,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const DESIGN_ICONS: IconData[] = [
  createIconData("Paintbrush", Paintbrush, "design"),
  createIconData("Palette", Palette, "design"),
  createIconData("Brush", Brush, "design"),
  createIconData("Eraser", Eraser, "design"),
  createIconData("Pencil", Pencil, "design"),
  createIconData("PenTool", PenTool, "design"),
  createIconData("Type", Type, "design"),
  createIconData("Bold", Bold, "design"),
  createIconData("Italic", Italic, "design"),
  createIconData("Underline", Underline, "design"),
];
