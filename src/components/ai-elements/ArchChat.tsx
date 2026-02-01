"use client";

import { ArchProcessState } from "@/store/Reducers/ArchProcessChat";
import { Icon } from "@iconify/react";
import React from "react";

function ArchChat({ process }: { process: ArchProcessState }) {
  const isAI = process.role === "ai";

  return (
    <div
      className={`
        px-3 py-2 flex flex-col
        ${isAI ? "items-start" : "items-end"}
      `}
    >
    {process.role === "ai" && process.process === "render" && <DotSpin />}
      <p
        className={` max-w-[80%] text-gray-400 text-sm leading-relaxed px-4 py-3 rounded-sm ${isAI ? "text-left" : "text-right bg-white/5 shadow-md overflow-clip"}`}
      >
        {process.message}
      </p>
      {isAI && (
        <div className="flex ml-3 justify-center items-center gap-1 text-xs">
            <Icon
          icon="streamline-flex:ai-chip-robot-remix"
          width="12"
          height="12"
          className="text-gray-500"
        />
        <span className="text-gray-500">Arch {new Date().toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
}

export default ArchChat;

export const DotSpin = () => {
  const [frame, setFrame] = React.useState(0);

  const frames = [
    "⠋", "⠙", "⠹", "⠸",
    "⠼", "⠴", "⠦", "⠧",
    "⠇", "⠏",
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 90);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
  <span
    aria-hidden
    className="inline-block w-[1ch] ml-3 text-white/40 text-[1.1rem]
               leading-none font-mono opacity-90 select-none"
    style={{ fontVariantNumeric: "tabular-nums" }}
  >
    {frames[frame]}
  </span>

  <span className="pulse-text text-white text-xs tracking-wide">
    Generating
  </span>
</div>

  );
};