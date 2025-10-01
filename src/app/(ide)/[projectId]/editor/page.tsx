import React from 'react'
import IdeLayout from "@/components/IdeLayOut/MainWindow"

async function page({ params }: { params: Promise<{ projectId: string}>}) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <IdeLayout projectId={projectId} />
  )
}

export default page