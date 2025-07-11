"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function PublicRoute({ children }: PropsWithChildren) {
  const { user, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
