import DashboardNavStrip from '@/components/common/DashboardNavStrip'
import IdeTabs from '@/components/IdeLayOut/IdeTabs'
import React from 'react'

function IdeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <IdeTabs />
      <main className="flex-1 overflow-auto">
        <DashboardNavStrip />
        {children}
      </main>
    </div>
  )
}

export default IdeLayout
