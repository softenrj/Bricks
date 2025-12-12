import React from 'react'
import ContextTree from "@/components/ContextTree"

export const metadata = {
  title: "Context Tree - Bricks IDE",
  description: "Explore the context tree in the Bricks IDE to understand project structure, dependencies, and relationships.",
  keywords: ["context tree", "project structure", "dependencies", "IDE", "Bricks"],
};

async function page({ params }: { params: Promise<{ projectId: string }> }) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <ContextTree projectId={projectId} />
  )
}

export default page
