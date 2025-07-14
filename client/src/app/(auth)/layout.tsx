import type { Metadata } from "next";
import { GradientBackground } from "@/components/ui/background-gradient";
import { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <GradientBackground>
      <div className="flex flex-col items-center h-screen justify-center">
        {children}
        <div className="text-muted-foreground bg-accent *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 w-1/3 text-balance rounded-lg p-4 text-center text-xs">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </GradientBackground>
  );
}
