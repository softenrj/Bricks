// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import ChatOpHeader from './ChatOpHeader'
import ChatOpContent from './ChatOpContent'
import AppSideBarProfile from '../AppSideBar/AppSideBarProfile'
import { useDebounce } from '@/hooks/debounce'

function ChatOptionContent({ onClose, projectId }: { onClose: () => void, projectId: string }) {
  return (
    <div className='w-full flex flex-col items-center my-4'>
        <ChatOpHeader onClose={onClose}  />
        <ChatOpContent projectId={projectId} />
        <AppSideBarProfile />
    </div>
  )
}

export default ChatOptionContent