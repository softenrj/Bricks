"use client"
import { PanelLeftClose, Sparkles } from 'lucide-react'
import React from 'react'

function ChatOpHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className='text-gray-300 flex w-[85%] justify-between'>
            <div className='flex items-center gap-2'>
                <Sparkles size={18} className='text-pink-400' />
                <span>AI Chats</span>
            </div>
            <PanelLeftClose onClick={onClose} className='cursor-pointer' />
        </div>
    )
}

export default ChatOpHeader