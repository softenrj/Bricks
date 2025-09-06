import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReduxProvider from "@/context/ReduxProvider";
import { Toaster } from "react-hot-toast"
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
    <ReduxProvider >
      <SidebarProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <div><Toaster position="bottom-right"
              reverseOrder={true} /></div>
          </body>
        </html>
      </SidebarProvider>
    </ReduxProvider>
  );
}
