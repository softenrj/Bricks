// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Tooltip } from "../common/Tooltip";

export default function LexicalForge() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handleSend();
    }
  };

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [message]);

  return (
    <div
      className="
        fixed bottom-10 left-1/2 -translate-x-1/2
        inline-flex items-center gap-2
        max-w-[620px] w-[32%] min-w-[300px]
        bg-[#1f1f1f]/80 text-gray-300
        py-2 px-3 rounded-xl
        border border-[#2d2d2d]
        shadow-sm hover:shadow-md
        backdrop-blur-md
        z-[999]
      "
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        rows={1}
        className="
          flex-1
          max-h-[160px]
          bg-transparent
          resize-none
          text-[15px] leading-relaxed
          text-[#ececec]
          placeholder-[#8e8e8e]
          outline-none
          overflow-y-auto
          hide-scrollbar
          py-[6px]
        "
      />

      <Tooltip content="Run">
        <button
          className="
            inline-flex items-center justify-center
            shrink-0 w-7 h-7
            border border-gray-600 rounded-full
            bg-gray-800/30
            hover:bg-gray-700/50
            transition
          "
        >
          <ChevronRight size={14} />
        </button>
      </Tooltip>
    </div>
  );
}
