// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import ChatOptions from './ChatOptions'
import ChatPanel from './ChatPanel'

function index({ projectId }: { projectId: string }) {
    return (
        <div className=' flex h-full w-full overflow-x-hidden'>
            <ChatOptions projectId={projectId} />
            <div className='flex-1 w-[50%]'>
                <ChatPanel projectId={projectId} />
            </div>
        </div>
    )
}

export default index