// Copyright (c) 2025 Raj
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import LandingPage from "@/components/LandingPage"

export const metadata = {
  title: "Bricks - AI-Powered Code Editor",
  description: "Experience the future of coding with Bricks, an AI-powered code editor that enhances productivity and creativity.",
  keywords: ["AI", "code editor", "programming", "development", "Next.js", "React"],
  openGraph: {
    title: "Bricks - AI-Powered Code Editor",
    description: "Experience the future of coding with Bricks, an AI-powered code editor that enhances productivity and creativity.",
    type: "website",
  },
};

export default function Home() {
  return (
   <LandingPage />
  );
}
