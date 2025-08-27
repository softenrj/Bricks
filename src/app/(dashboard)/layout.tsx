import AppSideBar from '@/components/AppSideBar/AppSideBar'
import DashboardNavStrip from '@/components/common/DashboardNavStrip'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AppSideBar />
      <main className="flex-1 overflow-auto">
          <DashboardNavStrip />
          {children}
      </main>
    </div>
  )
}

export default DashboardLayout
