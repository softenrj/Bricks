import React from 'react'
import History from "@/components/History"

export const metadata = {
  title: "History - Bricks IDE",
  description: "View the history of changes and versions in your Bricks IDE project for better tracking and collaboration.",
  keywords: ["history", "changes", "versions", "tracking", "IDE", "Bricks"],
};

async function page({ params }: { params: Promise<{ projectId: string}>}) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <History projectId={projectId} />
  )
}

export default page
