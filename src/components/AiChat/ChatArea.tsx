// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "./ChatMessage"
import { useAppSelector } from "@/hooks/redux"
import { Sparkles } from "lucide-react"

export default function ChatArea() {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const messages = useAppSelector(state => state.bricksChat).messages
  const isFetching = useAppSelector(state => state.bricksChat).fetch

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-[82%] overflow-y-auto px-3 sm:px-5 py-5 space-y-4">
      <AnimatePresence>
        {[...messages].sort((a, b) => new Date(a.createdAt as any).getTime() - new Date(b.createdAt as any).getTime()).map((message, ind) => (
          <motion.div
            key={`${message.id}-${ind}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ChatMessage message={message} />
          </motion.div>
        ))}
        {isFetching && <div className="flex items-center w-fit gap-2 p-2 bg-[#2f2f2f] rounded-full animate-pulse">
          <Sparkles size={16} className="text-green-400 animate-spin-slow" />
          <span className="text-[#ececec] font-medium">AI is thinking...</span>
        </div>}
      </AnimatePresence>
      <div ref={chatEndRef} />
    </div>
  )
}
