// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import AppSidebarHeader from './AppSidebarHeader'
import AppSideBarContent from './AppSideBarContent'
import AppSideBarProfile from './AppSideBarProfile'

function AppSideBar() {
  return (
    <Sidebar className="bg-transparent min-w-[80px]" collapsible="icon">
      <div className="h-screen flex flex-col w-full bg-[#0E0E0E]">
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