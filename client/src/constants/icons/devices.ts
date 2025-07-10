import {
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Server,
  Database,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const DEVICE_ICONS: IconData[] = [
  createIconData("Monitor", Monitor, "devices"),
  createIconData("Laptop", Laptop, "devices"),
  createIconData("Smartphone", Smartphone, "devices"),
  createIconData("Tablet", Tablet, "devices"),
  createIconData("Server", Server, "devices"),
  createIconData("Database", Database, "devices"),
  createIconData("Wifi", Wifi, "devices"),
  createIconData("WifiOff", WifiOff, "devices"),
  createIconData("Battery", Battery, "devices"),
  createIconData("BatteryLow", BatteryLow, "devices"),
  createIconData("Signal", Signal, "devices"),
];
