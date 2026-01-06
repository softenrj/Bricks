// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { CirclePause, CirclePlay } from "lucide-react";

function Logo() {
  const tab = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const url = "https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767631081/landingst_dmil9j.mp3"
  const src = `/api/audio?src=${encodeURIComponent(url)}`

  useEffect(() => {
    // Create audio instance once
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; 

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex bg-[#000000] border-[0.2px] min-w-24 h-8 rounded-full justify-center items-center">
      <Avatar className="h-5 w-5 ml-1 rounded-md mr-1">
        <AvatarImage src="/landingPage/bricks.png" />
        <AvatarFallback>Bricks</AvatarFallback>
      </Avatar>
      <p className="text-gray-400 pr-2 hover:text-gray-100">#Bricks</p>
      {tab === "/" && (
        <span className="mr-2 cursor-pointer" onClick={handlePlay}>
          {isPlaying ? (
            <CirclePause
              size={14}
              className="text-pink-500 hover:text-pink-400"
            />
          ) : (
            <CirclePlay
              size={14}
              className="text-gray-600 hover:text-gray-400"
            />
          )}
        </span>
      )}
    </div>
  );
}

export default Logo;
