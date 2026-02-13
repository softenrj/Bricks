"use client"
import React, { useEffect, useRef, useState } from "react"
import { CirclePause, CirclePlay } from "lucide-react"
import { EffectEnum } from "@/types/event"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setEffect, setLyricsIdx } from "@/store/Reducers/effects"
import { motion, AnimatePresence } from "framer-motion";

type LyricLine = { time: number; text: string }

function EventAudio({
  src,
  lyrics = [],
  isValid,
  effect,
}: {
  src: string
  lyrics?: LyricLine[]
  isValid: boolean
  effect: EffectEnum
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const activeEffect = useAppSelector(state => state).Effects
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.6
    audioRef.current = audio

    const onTimeUpdate = () => {
      const t = audio.currentTime
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (t >= lyrics[i].time) {
          dispatch(setLyricsIdx(i))
          break
        }
      }
    }

    audio.addEventListener("timeupdate", onTimeUpdate)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audioRef.current = null
    }
  }, [src, lyrics])

  const handlePlay = async () => {
    if (!audioRef.current || !isValid) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
        if (!activeEffect.effect) {
          dispatch(setEffect(effect))
        }
      }
      setIsPlaying(!isPlaying)
    } catch (err) {
      console.error("Audio play failed:", err)
      setIsPlaying(false)
    }
  }

  return (
    <div className="flex gap-3">
      {/* ▶️ Play / Pause */}
      <span
        className={`mt-1 inline-block ${!isValid ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        onClick={handlePlay}
      >
        {isPlaying ? (
          <CirclePause size={14} className="text-pink-500" />
        ) : (
          <CirclePlay size={14} className="text-gray-600" />
        )}
      </span>

      {/* {lyrics.length > 0 && activeIndex >= 0 && (
        <div className="pointer-events-none fixed -bottom-2 left-1/2 z-999 w-full max-w-4xl -translate-x-1/2 px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="subtitle text-3xl md:text-5xl tracking-tighter bg-gradient-to-b from-white via-cyan-250 to-cyan-500 bg-clip-text text-transparent drop-shadow-[10_10_15px_rgba(34,211,238,0.9)]"
            >
              {lyrics[activeIndex].text}
            </motion.p>
            <div className="mt-2 h-1 w-24 rounded-full bg-cyan-500/30 blur-md" />
          </AnimatePresence>
        </div>
      )} */}
    </div>
  )
}

export default EventAudio