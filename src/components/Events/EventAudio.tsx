// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React, { useEffect, useRef, useState } from "react"
import { CirclePause, CirclePlay } from "lucide-react"
import { EffectEnum } from "@/types/event"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { clearEffect, setEffect, setLyricsIdx } from "@/store/Reducers/effects"

function EventAudio({ src, isValid, lyrics = [], effect }: { src: string, isValid: boolean, lyrics?:{ time: number; text: string }[], effect: EffectEnum }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const activeEffect = useAppSelector(state => state).Effects
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return
    setIsPlaying(false) 
    dispatch(clearEffect())
    dispatch(setLyricsIdx(-1));

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.6

    audioRef.current = audio
    audio.addEventListener("timeupdate", () => onTimeUpdate(audio))


    return () => {
      audio.pause()
      audioRef.current = null
      audio.removeEventListener("timeupdate", () => onTimeUpdate(audio))
    }
  }, [src])

  const onTimeUpdate = (audio: HTMLAudioElement) => {
      const t = audio.currentTime
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (t >= lyrics[i].time) {
          dispatch(setLyricsIdx(i))
          break
        }
      }
    }


  const handlePlay = async () => {
    if (!audioRef.current || !isValid) return 

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
        if (!activeEffect.effect) {
          dispatch(setEffect(effect));
        }
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