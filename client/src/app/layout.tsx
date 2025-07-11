import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";
import { PAGES_CONFIG } from "@/configs/pages.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
  },
  title: {
    absolute: PAGES_CONFIG.SITE_NAME,
    template: `${PAGES_CONFIG.SITE_NAME} - %s`,
  },
  description: "Manage your progress",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="modal-root"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
