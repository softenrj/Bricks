// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import { motion } from "framer-motion";
import { Message } from "../../../types/chatMessage";
import MarkDownComponents from "./MarkDownComponents";

function BricksAiResponse({ message }: { message: Message }) {
  const fullText = message.content || "";
  const [displayedText, setDisplayedText] = React.useState(fullText.length > 1500 ? fullText : "");
  const isNew = !!message.isNew

  React.useEffect(() => {
    if (!isNew) {
        setDisplayedText(message.content);
        return ;
    }
    let frame: number;
    let index = 0;
    const speed = 5;

    const animate = () => {
      index += speed;
      if (index >= fullText.length) {
        setDisplayedText(fullText);
        return;
      }
      setDisplayedText(fullText.slice(0, index));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [fullText]);

  return (
    <motion.div
      className="w-full max-w-none prose prose-invert text-[#e5e5e5] leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={MarkDownComponents()}
      >
        {displayedText}
      </ReactMarkdown>
    </motion.div>
  );
}

export default React.memo(BricksAiResponse);
