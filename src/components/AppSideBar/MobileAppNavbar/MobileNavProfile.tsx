// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Tooltip } from '@/components/common/Tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/hooks/redux';
import { AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react'

function MobileNavProfile({ onOpen }: { onOpen: () => void }) {
    const user = useAppSelector(state => state.user);
    return (
        <div className='flex '>
            <Tooltip content={user.username || ""} >
                <Avatar onClick={onOpen} className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-blue-500/50 shadow-sm transition-all duration-300">
                    <AvatarImage
                        src={user.profile || "https://avatars.githubusercontent.com/u/149652817?v=4"}
                        crossOrigin="anonymous"
                        className="object-cover"
                    />
                    <AvatarFallback>RS</AvatarFallback>
                </Avatar>
            </Tooltip>
        </div>
    )
}

export default MobileNavProfile