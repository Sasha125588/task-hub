import type { Metadata } from "next";
import { GradientBackground } from "@/components/ui/background-gradient";
import { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return <GradientBackground>{children}</GradientBackground>;
}
