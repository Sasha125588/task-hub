import {
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  User,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  AtSign,
  Hash,
  Bot,
  Info,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

import { type IconData } from "./types";
import { createIconData } from "@/lib/utils/icon";

export const COMMUNICATION_ICONS: IconData[] = [
  createIconData("Mail", Mail, "communication"),
  createIconData("Phone", Phone, "communication"),
  createIconData("MessageCircle", MessageCircle, "communication"),
  createIconData("MessageSquare", MessageSquare, "communication"),
  createIconData("User", User, "communication"),
  createIconData("Users", Users, "communication"),
  createIconData("UserPlus", UserPlus, "communication"),
  createIconData("UserMinus", UserMinus, "communication"),
  createIconData("UserCheck", UserCheck, "communication"),
  createIconData("UserX", UserX, "communication"),
  createIconData("AtSign", AtSign, "communication"),
  createIconData("Hash", Hash, "communication"),
  createIconData("Bot", Bot, "communication"),
  createIconData("Info", Info, "communication"),
  createIconData("HelpCircle", HelpCircle, "communication"),
  createIconData("AlertTriangle", AlertTriangle, "communication"),
];
