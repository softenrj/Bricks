import React from 'react'
import Doc from "@/components/Document"

export const metadata = {
  title: "Documentation - Bricks IDE",
  description: "Access project-specific documentation and guides in the Bricks IDE for better understanding and development.",
  keywords: ["documentation", "guides", "project", "IDE", "Bricks"],
};

async function page({ params }: { params: Promise<{ projectId: string}>}) {
  const param = await params;
  const projectId = param.projectId;
  return <Doc projectId={projectId} />
}

export default page
