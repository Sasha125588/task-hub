"use client";

import { type PropsWithChildren } from "react";
import { LoadingSpinner } from "../../ui/loading-spinner";
import { useSession } from "@/lib/better-auth/auth-client";

export function AuthLoader({ children }: PropsWithChildren) {
  const { isPending } = useSession();

  if (isPending) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
