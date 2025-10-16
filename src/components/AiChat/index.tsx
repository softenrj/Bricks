"use client"
import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import ChatOptions from './ChatOptions'
import ChatPanel from './ChatPanel'

function index({ projectId }: { projectId: string }) {
    return (
        <div className=' flex h-full w-full overflow-x-hidden'>
            <ChatOptions projectId={projectId} />
            <ChatPanel projectId={projectId} />
        </div>
    )
}

export default index