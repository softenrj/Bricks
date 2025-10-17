"use client"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import CodeBlock from "./CodeBlock"
import { Message } from "../../../types/chatMessage"

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children: React.ReactNode
}

export default function ChatMessage({ message }: { message: Message }) {
  const [typedText, setTypedText] = useState("")

  const isUser = message.role === "user"

  // Typing effect for AI messages
useEffect(() => {
  if (isUser) return
  setTypedText("")
  let index = 0

  const step = () => {
    setTypedText(message.content.slice(0, index + 1))
    index++
    if (index < message.content.length) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}, [message.content, isUser])

  const components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? (
        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
      ) : (
        <code
          className="bg-[#1b1b1f] text-pink-300 px-1 py-[2px] rounded text-xs sm:text-sm break-words"
          {...props}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
          max-w-full sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base
          whitespace-pre-wrap break-words leading-relaxed
          ${isUser
            ? "bg-[#2f2f2f] text-white rounded-bl-xl rounded-tr-xl"
            : "text-[#e4e4e4]"}
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components as any}
        >
          {isUser ? message.content : typedText}
        </ReactMarkdown>
      </div>
    </div>
  )
}
