"use client"
import React from 'react'
import ChatOpHeader from './ChatOpHeader'
import ChatOpContent from './ChatOpContent'
import AppSideBarProfile from '../AppSideBar/AppSideBarProfile'

function ChatOptionContent({ onClose }: { onClose: () => void }) {
  return (
    <div className='w-full flex flex-col items-center my-4'>
        <ChatOpHeader onClose={onClose} />
        <ChatOpContent />
        <AppSideBarProfile />
    </div>
  )
}

export default ChatOptionContent