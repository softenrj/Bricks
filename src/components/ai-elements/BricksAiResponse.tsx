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
        {message.content}
      </ReactMarkdown>
    </motion.div>
  );
}

export default React.memo(BricksAiResponse);
