import React from 'react'
import AiChat from "@/components/AiChat"

async function page({ params }: { params: Promise<{ projectId: string }>}) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <AiChat projectId={projectId} />
  )
}

export default page