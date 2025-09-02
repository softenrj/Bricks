"use client";
import React, { useState, useEffect } from "react";

interface AiTyperProps {
  messages: string[];
  typingSpeed?: number; // ms per char
  pauseTime?: number; // ms pause at end of sentence
  loop?: boolean; // whether to loop
  cursorColor?: string; // cursor glow color
}

const AiTyper: React.FC<AiTyperProps> = ({
  messages,
  typingSpeed = 40,
  pauseTime = 1500,
  loop = true,
  cursorColor = "#ff4fd8",
}) => {
  const [displayed, setDisplayed] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (msgIndex >= messages.length) return;

    if (charIndex < messages[msgIndex].length) {
      // Typing each character
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!paused) {
      // Pause at end of message
      setPaused(true);
      const timeout = setTimeout(() => {
        setPaused(false);
        setDisplayed(""); // optional: clear before next message
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
      <span className="text-sm md:text-base text-white">{displayed}</span>
      <span
        className="ml-1 animate-pulse"
        style={{
          color: cursorColor,
          textShadow: `0 0 6px ${cursorColor}, 0 0 12px ${cursorColor}`,
        }}
      >
        |
      </span>
    </div>
  );
};

export default AiTyper;
