import React from 'react'
import AiChat from "@/components/AiChat"

export const metadata = {
  title: "AI Chat - Bricks IDE",
  description: "Engage with AI-powered chat in the Bricks IDE to get coding assistance, suggestions, and insights for your project.",
  keywords: ["AI chat", "coding assistance", "IDE", "Bricks", "project"],
};

async function page({ params }: { params: Promise<{ projectId: string }>}) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <AiChat projectId={projectId} />
  )
}

export default page
