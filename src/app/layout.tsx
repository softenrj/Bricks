// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/context/ReduxProvider";
import { Toaster } from "react-hot-toast"
import "./globals.css";
import '@xyflow/react/dist/style.css';
import "@/socket/socket"

import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import EventEffects from "@/components/common/EventEffects";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bricks Ai",
  description: "Smart Ai based Code Editor",
};


export const viewport: Viewport = {
  themeColor: "#010308",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Bricks Ai" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <ReduxProvider>
            <SidebarProvider>
              <EventEffects />
              {children}
              <Toaster position="bottom-right" reverseOrder />
            </SidebarProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
