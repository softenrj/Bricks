"use client"
import React, { useEffect, useState, useRef } from "react"
import { Message } from "../../../types/chatMessage"
import { Response } from "../ai-elements/response"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [typedText, setTypedText] = useState(message.role === "user" ? message.content : "")
  const isUser = message.role === "user"
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (isUser) return

    const content = message.content
    const CHUNK_SIZE = 5 
    const LONG_MSG_THRESHOLD = 1000 
    let index = 0

    if (content.length > LONG_MSG_THRESHOLD) {
      setTypedText(content)
      return
    }

    setTypedText("")
    const step = () => {
      index += CHUNK_SIZE
      setTypedText(content.slice(0, index))
      if (index < content.length) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [message.content, isUser])

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
          max-w-full rounded-2xl px-4 py-3 text-sm sm:text-base
          ${isUser
            ? "bg-[#2f2f2f] text-white rounded-bl-xl rounded-tr-xl"
            : "text-[#e4e4e4] "}
        `}
      >
        <Response className="dark">{isUser ? message.content : typedText}</Response>
      </div>
    </div>
  )
}
