import AppSideBar from '@/components/Dashboard/AppSideBar'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AppSideBar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
