import type { Metadata } from "next";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { GradientBackground } from "@/components/ui/background-gradient";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicRoute>
      <GradientBackground>{children}</GradientBackground>
    </PublicRoute>
  );
}
