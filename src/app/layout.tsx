import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/context/ReduxProvider";
import { Toaster } from "react-hot-toast"
import "./globals.css";
import '@xyflow/react/dist/style.css';
import "@/socket/socket"
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <SidebarProvider>
            {children}
            <Toaster position="bottom-right" reverseOrder />
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
