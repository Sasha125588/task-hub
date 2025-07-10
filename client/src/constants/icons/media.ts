import {
  Camera,
  Image,
  Video,
  Music,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const MEDIA_ICONS: IconData[] = [
  createIconData("Camera", Camera, "media"),
  createIconData("Image", Image, "media"),
  createIconData("Video", Video, "media"),
  createIconData("Music", Music, "media"),
  createIconData("Mic", Mic, "media"),
  createIconData("MicOff", MicOff, "media"),
  createIconData("Volume2", Volume2, "media"),
  createIconData("VolumeX", VolumeX, "media"),
  createIconData("Play", Play, "media"),
  createIconData("Pause", Pause, "media"),
  createIconData("SkipBack", SkipBack, "media"),
  createIconData("SkipForward", SkipForward, "media"),
];
