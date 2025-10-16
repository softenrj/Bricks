"use client"
import React, { useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"

// ----------------------------------------------------------------------
// TYPES AND INTERFACES
// ----------------------------------------------------------------------

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children: React.ReactNode
}

// ----------------------------------------------------------------------
// CHAT AREA COMPONENT
// ----------------------------------------------------------------------

function ChatArea() {
  const chatEndRef = useRef<HTMLDivElement>(null)

  const [messages] = React.useState<Message[]>([
  {
    id: 1,
    role: "assistant",
    content:
      "👋 Hello! Welcome to Bricks AI Chat. I've been styled to look like ChatGPT's dark mode! How can I assist you today?",
    timestamp: new Date(),
  },
  {
    id: 2,
    role: "user",
    content:
      "I want to learn React hooks, especially **useState** and **useEffect**.",
    timestamp: new Date(),
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Great! Here's a simple **useState** example:\n\n```ts\nimport React, { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  )\n}\n```",
    timestamp: new Date(),
  },
  {
    id: 4,
    role: "user",
    content:
      "Can you show me **useEffect** with fetching API data? Also, what about an inline code snippet like `fetch`?",
    timestamp: new Date(),
  },
  {
    id: 5,
    role: "assistant",
    content:
      "Absolutely! Here's a basic example:\n\n```ts\nimport React, { useState, useEffect } from 'react'\n\nfunction UsersList() {\n  const [users, setUsers] = useState([])\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(res => res.json())\n      .then(data => setUsers(data))\n  }, [])\n\n  return (\n    <ul>\n      {users.map((user: any) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  )\n}\n```",
    timestamp: new Date(),
  },
  {
    id: 6,
    role: "user",
    content:
      "Can you give me a **list** example?\n\n- Apples\n- Oranges\n- Bananas",
    timestamp: new Date(),
  },
  {
    id: 7,
    role: "assistant",
    content:
      "Sure! You can also make an **ordered list**:\n\n1. First item\n2. Second item\n3. Third item",
    timestamp: new Date(),
  },
  {
    id: 8,
    role: "user",
    content:
      "What about **tables**? I want something like:\n\n| Name | Age |\n|------|-----|\n| Raj  | 21  |\n| Alice| 25  |",
    timestamp: new Date(),
  },
  {
    id: 9,
    role: "assistant",
    content:
      "Tables are supported in Markdown:\n\n| Name  | Age |\n|-------|-----|\n| Raj   | 21  |\n| Alice | 25  |",
    timestamp: new Date(),
  },
  {
    id: 10,
    role: "user",
    content:
      "Can you write some **Python** code?\n\n```py\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Raj'))\n```",
    timestamp: new Date(),
  },
  {
    id: 11,
    role: "assistant",
    content:
      "Here's the output:\n\n```\nHello, Raj!\n```",
    timestamp: new Date(),
  },
  {
    id: 12,
    role: "user",
    content:
      "What about **links** and **emojis**? For example: [Google](https://google.com) 😄",
    timestamp: new Date(),
  },
  {
    id: 13,
    role: "assistant",
    content:
      "Sure! You can combine them like this:\n\nCheck out [Bricks AI](https://bricksai.com) 🚀✨",
    timestamp: new Date(),
  },
  {
    id: 14,
    role: "user",
    content:
      "Also, I want to test a **very long message** that wraps across multiple lines and keeps responsiveness intact. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    timestamp: new Date(),
  },
  {
    id: 15,
    role: "assistant",
    content:
      "No worries! The chat will handle **long messages** properly, wrapping them nicely even on mobile screens. ✅",
    timestamp: new Date(),
  },
  {
    id: 16,
    role: "user",
    content: "And finally, `inline code` inside a **bold sentence** works too?",
    timestamp: new Date(),
  },
  {
    id: 17,
    role: "assistant",
    content:
      "Yes! Like this: **Remember to use `npm install` before running the project**.",
    timestamp: new Date(),
  },
  {
    id: 18,
    role: "assistant",
    content:
      "Extra scenario: multiple consecutive messages from assistant to test spacing and scroll behavior.",
    timestamp: new Date(),
  },
  {
    id: 19,
    role: "assistant",
    content: "Another assistant message with a code snippet:\n\n```json\n{\n  \"name\": \"Raj\",\n  \"role\": \"developer\"\n}\n```",
    timestamp: new Date(),
  },
  {
    id: 20,
    role: "user",
    content: "Perfect! This should cover almost every scenario I need to test.",
    timestamp: new Date(),
  },
])


  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Custom Markdown renderer
  const components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? (
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
          PreTag="div"
          wrapLongLines
          showLineNumbers
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="bg-gray-900 text-green-300 px-1 py-[2px] rounded text-xs sm:text-sm break-words"
          {...props}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <div className="h-[82%] overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-[#8e8e8e]">
          <p className="text-base sm:text-lg">Start a conversation</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-auto max-w-full sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 break-words whitespace-pre-wrap text-xs sm:text-sm md:text-base ${
                  message.role === "user"
                    ? "bg-[#2f2f2f] text-white rounded-bl-xl rounded-tr-xl rounded-tl-xl rounded-br-md"
                    : " text-[#ececec] rounded-br-xl rounded-tl-xl rounded-tr-xl rounded-bl-md"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={components as any}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </>
      )}
    </div>
  )
}

export default ChatArea
