// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Tooltip } from '../common/Tooltip'
import { useSidebar } from '../ui/sidebar'
import BricksIcon from "@/assets/svg/bricks-t-w.svg"

function AppSidebarHeader() {
    const { toggleSidebar, open } = useSidebar()
    return (
        <div className='m-2 flex items-center justify-between'>
            { open ? <>
            <div className='flex gap-2 items-center'>
                <Avatar className="h-10 w-10 rounded-sm">
                <AvatarImage src={BricksIcon.src} />
                <AvatarFallback>Bricks</AvatarFallback>
            </Avatar>
            <h1 className="text-white font-bold text-2xl">Bricks</h1>
            </div>

            <Tooltip content='close'>
                <PanelLeftClose onClick={toggleSidebar} color="#8e8e8e" className='hover:text-[#a8a8a8]' />
            </Tooltip></>:
            <Tooltip content='open'>
                <PanelLeftOpen size={28} onClick={toggleSidebar} color="#8e8e8e" className='hover:text-[#a8a8a8] mx-auto' />
            </Tooltip>}
        </div>
    )
}

export default AppSidebarHeader