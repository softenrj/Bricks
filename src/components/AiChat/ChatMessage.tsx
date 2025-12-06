// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useState } from "react"
import { Message } from "../../../types/chatMessage"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"
import BricksAiResponse from "../ai-elements/BricksAiResponse"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-full sm:max-w-3xl rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed
          overflow-x-auto transition-all duration-200
          ${isUser
            ? "bg-[#2f2f2f] text-white rounded-2xl"
            : " text-[#e4e4e4]"}
        `}
      >
        {isUser ? <>{message.content}</> : <BricksAiResponse message={message} />}
      </div>
    </div>
  )
}