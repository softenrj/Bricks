import DashboardNavStrip from '@/components/common/DashboardNavStrip'
import IdeTabs from '@/components/IdeLayOut/IdeTabs'
import React from 'react'

async function IdeLayout({ children, params }: { children: React.ReactNode, params: Promise<{ projectId: string }> }) {
  const param = await params;
  const projectId = param.projectId;
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <IdeTabs projectId={projectId} />
      <main className="flex flex-col flex-1 overflow-auto">
        <DashboardNavStrip projectId={projectId} />
        <div className="flex-1 w-full overflow-auto">
        {children}
        </div>
      </main>
    </div>
  )
}

export default IdeLayout
