import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import AppSidebarHeader from './AppSidebarHeader'
import AppSideBarContent from './AppSideBarContent'
import AppSideBarProfile from './AppSideBarProfile'

function AppSideBar() {
  return (
    <Sidebar className="bg-transparent min-w-[80px]" collapsible="icon">
      <div className="h-screen flex flex-col w-full bg-gradient-to-r from-[#0F1012] via-[#151718] to-[#1C1B21]">
        <SidebarHeader >
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent >
          <AppSideBarContent />
        </SidebarContent>
        <SidebarFooter className=' self-center'>
          <AppSideBarProfile />
        </SidebarFooter>
      </div>
      
    </Sidebar>

  )
}

export default AppSideBar