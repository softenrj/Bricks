"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { PanelLeftOpen } from 'lucide-react'
import ChatOptionContent from './ChatOptionContent'

function ChatOptions({ projectId }:{ projectId: string }) {
    const [close, onClose] = React.useState<boolean>(true)
    const onCloseHandler = (): void => onClose(!close)
  return (
    <motion.div 
    initial={{ width: 0 }}
    animate={{ width: close ? 48 : 260 }}
    transition={{ type: "spring"}}>
        <div className='flex justify-center h-full bg-[#181818]'>
            {close ?
            <PanelLeftOpen className='mt-4 text-gray-300 cursor-pointer' onClick={() => onClose(!close)} />:
            <ChatOptionContent projectId={projectId} onClose={onCloseHandler} />}
        </div>
    </motion.div>
  )
}

export default ChatOptions