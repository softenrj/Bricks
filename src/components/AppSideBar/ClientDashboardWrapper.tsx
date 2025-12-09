// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import AppMobileNavbar from '@/components/AppSideBar/AppMobileNavbar'
import AppSideBar from '@/components/AppSideBar/AppSideBar'
import DashboardNavStrip from '@/components/common/DashboardNavStrip'
import { useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'

export default function ClientDashboardWrapper({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) {
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AppSideBar />

      <main
        className={`
          flex-1 overflow-auto transition-all duration-300
          ${open ? "ml-0" : "ml-8"}
        `}
      >
        <DashboardNavStrip projectId={projectId} />
        {isMobile && <AppMobileNavbar />}
        <div>{children}</div>
      </main>
    </div>
  );
}
