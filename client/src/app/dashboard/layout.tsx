import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/animate-ui/radix/sidebar";
import { Header } from "@/components/layout/sidebar/Header";
import { AppSidebar } from "@/components/layout/sidebar/Sidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function DashboardLayout({ children, modal }: Props) {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 66)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <Header />
          <main className="h-full px-5 py-5">
            {modal}
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
