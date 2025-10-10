import React from 'react'
import ContextTree from "@/components/ContextTree"

async function page({ params }: { params: Promise<{ projectId: string }> }) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <ContextTree projectId={projectId} />
  )
}

export default page