"use client"
import AppSideBar from '@/components/AppSideBar/AppSideBar'
import DashboardNavStrip from '@/components/common/DashboardNavStrip'
import { useSidebar } from '@/components/ui/sidebar'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <AppSideBar />

      {/* Main content */}
      <main
        className={`
          flex-1 overflow-auto transition-all duration-300
          ${open ? "ml-0" : "ml-8"}
        `}
      >
        <DashboardNavStrip />
        <div>{children}</div>
      </main>
    </div>
  )
}

export default DashboardLayout
