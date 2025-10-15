"use client"
import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip } from './Tooltip'
import { Atom, Minimize } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { getSocket } from '@/socket/socket'
import { IO_BRICKS_REALTIME } from '@/utils/api/socket.events'
import { RealtimeStatusSocket } from '@/types/realTimePanelType'

const typeColors: Record<string, string> = {
  info: "text-blue-400",
  warn: "text-yellow-400",
  error: "text-red-400",
  success: "text-green-400",
  debug: "text-gray-300",
}

const funColors = [
  "text-pink-400",
  "text-purple-400",
  "text-cyan-400",
  "text-orange-400",
  "text-green-300",
]

function RealTimePanel() {
  const [messages, setMessages] = useState<RealtimeStatusSocket[]>([])
  const [visible, setVisible] = useState(false)
  const [close, setClose] = useState(false)
  const socket = getSocket()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
      setMessages([])
    }, 6000)
  }

  useEffect(() => {
    if (!socket) return
    const handler = (payload: RealtimeStatusSocket) => {
      const nextMsg: RealtimeStatusSocket = {
        ...payload
      }
      setMessages(prev => {
        const updated = [...prev, nextMsg]
        if (updated.length > 4) updated.shift()
        return updated
      })
      setVisible(true)
      resetTimeout()
    }

    socket.on(IO_BRICKS_REALTIME, handler)
    return () => {
      socket.off(IO_BRICKS_REALTIME, handler)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [socket])

  const getColorClass = (type: string) => {
    if (type === "fun") return funColors[Math.floor(Math.random() * funColors.length)]
    return typeColors[type] || "text-white"
  }

  return (
    close ? (
      <div className="absolute z-[999] bottom-12 right-1 flex items-center">
        <Tooltip content={"Real Time Process"}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setClose(false)}
          >
            <Atom size={22} className="text-pink-500 cursor-pointer" />
          </motion.div>
        </Tooltip>
      </div>
    ) : (
      <ContextMenu>
        <ContextMenuTrigger>
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute right-10 bottom-5 w-80 h-48 bg-black/70 rounded-xl shadow-[0px_0px_33px_23px_rgba(0,0,0,0.7)] backdrop-blur-sm overflow-hidden flex flex-col p-4 gap-1"
              >
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1 - idx * 0.25, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`text-xs font-mono select-none ${getColorClass(msg.type)}`}
                    >
                      {msg.message}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem
            className="flex items-center gap-2 rounded-md data-[highlighted]:bg-gray-700/70 data-[highlighted]:text-white focus:outline-none"
            onClick={() => setClose(true)}
          >
            <Minimize size={16} />
            Close Terminal
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  )
}

export default RealTimePanel
