// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "./ChatMessage"
import { useAppSelector } from "@/hooks/redux"
import { Sparkles } from "lucide-react"
import { Shimmer } from "../ai-elements/shimmer"

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
           {messages.map((message, ind) => (
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
        {isFetching && <Shimmer>Loading your response...</Shimmer>}
      </AnimatePresence>
      <div ref={chatEndRef} />
    </div>
  )
}
