// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import React, { useState } from "react";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

export default function CodeBlock({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = String(children).trimEnd();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-neutral-700 bg-[#202123] shadow-lg group transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#2b2c2f] px-4 py-2 text-xs text-gray-400">
        <span className="font-semibold text-white/80 uppercase tracking-wide">
          {lang || "plaintext"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-[#343541] active:scale-95"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <svg
              className="h-4 w-4 text-green-400 transition-transform duration-150"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code Content */}
      <pre className="overflow-x-auto px-4 pb-4 pt-2 text-sm leading-relaxed text-gray-100 font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}
