// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { PanelLeftOpen } from 'lucide-react'
import ChatOptionContent from './ChatOptionContent'
import { useIsMobile } from '@/hooks/use-mobile'

function ChatOptions({ projectId }: { projectId: string }) {
  const [close, onClose] = React.useState<boolean>(true)
  const onCloseHandler = (): void => onClose(!close)
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: close ? isMobile ? 0 : 48 : 260 }}
      transition={{ type: "tween" }}>
      <div className='flex justify-center relative h-full bg-[#181818]'>
        {close ?
          <>
            {isMobile ? <PanelLeftOpen className='mt-4 text-gray-300 cursor-pointer absolute z-50 top-8 left-4 bg-black/40 rounded-xs' onClick={() => onClose(!close)} /> :
              <PanelLeftOpen className='mt-4 text-gray-300 cursor-pointer' onClick={() => onClose(!close)} />
            }
          </> :
          <ChatOptionContent projectId={projectId} onClose={onCloseHandler} />}
      </div>
    </motion.div>
  )
}

export default ChatOptions