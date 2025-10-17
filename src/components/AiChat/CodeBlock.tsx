"use client"
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy } from "lucide-react"

interface CodeBlockProps {
  language: string
  value: string
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-800">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-xs text-gray-400 hover:text-pink-400"
      >
        {copied ? "Copied" : <Copy size={14} />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        PreTag="div"
        customStyle={{
          margin: 0,
          background: "#1b1b1f", // JetBrains Fleet dark
          fontSize: "0.85rem",
          padding: "1rem",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
