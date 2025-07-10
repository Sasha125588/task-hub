import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Clock,
  Calendar,
  Timer,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const STATUS_ICONS: IconData[] = [
  createIconData("CheckCircle", CheckCircle, "status"),
  createIconData("XCircle", XCircle, "status"),
  createIconData("AlertTriangle", AlertTriangle, "status"),
  createIconData("Info", Info, "status"),
  createIconData("HelpCircle", HelpCircle, "status"),
  createIconData("Clock", Clock, "status"),
  createIconData("Calendar", Calendar, "status"),
  createIconData("Timer", Timer, "status"),
];
