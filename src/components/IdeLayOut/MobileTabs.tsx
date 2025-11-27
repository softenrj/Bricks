// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"

import React from "react"
import BricksIcon from "@/assets/svg/bricks-t-w.svg"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { tabs } from "./IdeTabs"
import { Tooltip } from "../common/Tooltip"
import Link from "next/link"
import { usePathname } from "next/navigation"

function MobileTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname()
  const active = pathname.split("/").pop()

  return (
    <div className="h-12 px-3 flex items-center justify-between bg-[#0D0D0D]/80 backdrop-blur border-b border-white/10 text-white">

      <Avatar className="h-8 w-8">
        <AvatarImage src={BricksIcon.src} />
        <AvatarFallback>Bricks</AvatarFallback>
      </Avatar>

      {/* RIGHT → Tabs */}
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive = active === href

          return (
            <Tooltip key={href} content={label}>
              <Link
                href={`/${projectId}/${href}`}
                className={`
                  flex items-center justify-center min-w-[36px] h-9 rounded-xl px-3
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/10 text-white border border-white/20 shadow-inner"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={16} />
              </Link>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}

export default MobileTabs