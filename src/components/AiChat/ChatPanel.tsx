// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Activity, Flame } from 'lucide-react'
import React from 'react'
import ChatInput from './ChatInput'
import ChatArea from './ChatArea'

function ChatPanel({ projectId }: { projectId: string }) {
    return (
        <div className='relative h-full w-full bg-[#212121]'>
            <div className='absolute z-50 bg-black h-8 w-34 rounded-full left-2 top-2 flex items-center justify-between p-2 gap-2'>
                <div className='flex items-center gap-2'>
                    <Activity className='text-green-500' size={14} />
                    <p className='text-gray-200'>Chats..</p>
                </div>
                <Flame className='text-pink-500' size={16} />
            </div>

            <ChatArea />

            <ChatInput projectId={projectId} />
        </div>
    )
}

export default ChatPanel