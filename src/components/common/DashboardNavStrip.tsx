// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Activity, Bell, BellDot, Sparkles } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { Tooltip } from './Tooltip'
import { useAppSelector } from '@/hooks/redux'
import { getSocket } from '@/socket/socket'
import { useIsMobile } from '@/hooks/use-mobile'
import MobileTabs from '../IdeLayOut/MobileTabs'

function DashboardNavStrip({projectId, displayTabs = false}: {projectId?: string, displayTabs?: boolean}) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const user = useAppSelector(state => state.user);
  const socket = getSocket();
  const isMobile = useIsMobile();

  return (
    <>
    <div className="bg-[#0E0E0E] h-8 px-4 flex justify-between items-center border-b border-gray-800 shadow-sm max-w-screen">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Tooltip content={socket ?  "online" : "offline"}>
          <Activity size={16} className={socket ? "text-green-500" : "text-pink-500"} />
        </Tooltip>
        <Badge className="bg-green-700 text-[10px] px-2 py-0.5 rounded-full">
          RealTime
        </Badge>
        <Tooltip content='bricks UID'>
          <p className='text-gray-500 text-xs hover:text-gray-400 truncate w-10 sm:w-20 md:w-30 lg:w-full'>#{user.uid}</p>
        </Tooltip>
      </div>



      {/* Center Date */}
      <p className="text-[11px] text-gray-400 tracking-wide">{today}</p>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* User Tag */}
        <div className="flex items-center bg-black border Alex-btn rounded-full px-2 py-1 cursor-pointer hover:border-gray-600 transition">
          <Sparkles size={14} className="text-yellow-400" />
          <p className="ml-1 text-[11px] text-gray-400 hover:text-gray-200 transition">
            Alex
          </p>
        </div>

        {/* Notifications */}
        <button className="relative">
          {false ? (
            <Bell className="w-5 h-5 text-gray-400 hover:text-white transition" />
          ) : (
            <>
              <BellDot className="w-5 h-5 text-gray-400 hover:text-white transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2.5 h-2.5 border border-black"></span>
            </>
          )}
        </button>

        {/* GitHub */}
        <Tooltip content="GitHub">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src="/icons/github.svg"
              className="bg-gray-100 rounded-full hover:scale-110 transition-transform"
              width={18}
              height={18}
              alt="github-icon"
            />
          </a>
        </Tooltip>

        {/* Tag/Workspace */}
        <div className="flex items-center bg-black border border-gray-800 rounded-full px-2 py-1 cursor-pointer hover:border-gray-600 transition">
          <p className="text-[11px] text-gray-400 hover:text-gray-200 transition">
            #Bricks
          </p>
        </div>
      </div>
    </div>
    {isMobile && displayTabs && <MobileTabs projectId={projectId || ''} />}
    </>
  );
}

export default DashboardNavStrip;
