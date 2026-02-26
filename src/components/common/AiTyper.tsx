// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client";

import React, { useState, useEffect } from "react";

interface AiTyperProps {
  messages: string[];
  typingSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  cursorColor?: string;
  textColour?: string;
  className?: string;
  cursor?: boolean;
}

const AiTyper: React.FC<AiTyperProps> = ({
  messages,
  typingSpeed = 40,
  pauseTime = 1500,
  loop = true,
  cursorColor = "#ff4fd8",
  textColour = "text-white",
  className = "text-sm md:text-base",
  cursor = true
}) => {
  const [displayed, setDisplayed] = useState<string>("");
  const [msgIndex, setMsgIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (msgIndex >= messages.length) return;

    // typing each character
    if (charIndex < messages[msgIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }

    // pause at the end
    if (!paused) {
      setPaused(true);
      const timeout = setTimeout(() => {
        setPaused(false);
        setDisplayed(""); // clear
        setCharIndex(0);

        setMsgIndex((prev) => {
          if (loop) return (prev + 1) % messages.length;
          return prev + 1;
        });
      }, pauseTime);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, msgIndex, paused, messages, typingSpeed, pauseTime, loop]);

  return (
    <div className="flex items-center">
      <span
        className={` ${textColour} ${className}`}
      >
        {displayed}
      </span>

      {cursor && <span
        className="ml-1 animate-pulse"
        style={{
          color: cursorColor,
          textShadow: `0 0 6px ${cursorColor}, 0 0 12px ${cursorColor}`,
        }}
      >
        |
      </span>}
    </div>
  );
};

export default AiTyper;
