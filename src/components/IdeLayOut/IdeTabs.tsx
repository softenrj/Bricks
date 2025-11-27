// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  FolderGit2,
  FileText,
  MessageSquare,
  History,
  GitBranch,
  LayoutDashboard
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import BricksIcon from "@/assets/svg/bricks-t-w.svg"
import { Tooltip } from '../common/Tooltip'
import { useIsMobile } from '@/hooks/use-mobile'

export const tabs = [
  { href: '/editor', icon: FolderGit2, label: 'Project Files' },
  { href: '/context-tree', icon: GitBranch, label: 'Context Tree' },
  { href: '/docs', icon: FileText, label: 'Docs' },
  { href: '/ai-chat', icon: MessageSquare, label: 'AI Chat' },
  { href: '/history', icon: History, label: 'History' },
]

function IdeTabs({ projectId }: { projectId: string }) {
  const tab = usePathname();
  const isMobile = useIsMobile();

  return (
    <>{!isMobile && <div className='w-14 bg-[#0D0D0D] border-r border-gray-700 text-white flex flex-col items-center py-4 space-y-6'>

      {/* Logo / Avatar */}
      <Avatar className="h-10 w-10 rounded-sm">
        <AvatarImage src={BricksIcon.src} />
        <AvatarFallback>Bricks</AvatarFallback>
      </Avatar>

      {/* Tabs */}
      <div className="flex flex-col space-y-4">
        {tabs.map(({ href, icon: Icon, label }) => (
          <Tooltip key={href} content={label} >
            <Link
              href={`/${projectId}/` + href}
              className={`p-2 rounded-xl flex items-center justify-center transition-colors 
                ${tab === href
                  ? "bg-white/10 text-white border border-white/20 shadow-inner"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <Icon size={20} />
            </Link>
          </Tooltip>
        ))}
      </div>

      {/* Push Dashboard Btn to Bottom */}
      <div className="flex-1 flex items-end pb-2">
        <Tooltip content="Dashboard">
          <Link
            href="/dashboard"
            className={`p-2 rounded-xl flex items-center justify-center transition-colors 
              ${tab === '/dashboard'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
          </Link>
        </Tooltip>
      </div>
    </div>}</>
  )
}

export default IdeTabs
