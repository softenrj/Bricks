// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useEffect, useRef, useState } from "react"
import { CirclePause, CirclePlay } from "lucide-react"

function EventAudio({ src, isValid }: { src: string, isValid: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return
    setIsPlaying(false) 

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.6

    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const handlePlay = async () => {
    if (!audioRef.current || !isValid) return 

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (err) {
      console.error("Audio play failed:", err)
      setIsPlaying(false) 
    }
  }

  return (
    <span 
      className={`mr-2 mt-1 inline-block ${!isValid ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} 
      onClick={handlePlay}
    >
      {isPlaying ? (
        <CirclePause size={14} className="text-pink-500" />
      ) : (
        <CirclePlay size={14} className="text-gray-600" />
      )}
    </span>
  )
}

export default EventAudio
