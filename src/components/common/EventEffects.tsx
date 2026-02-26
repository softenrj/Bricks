// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"

import { useAppSelector } from "@/hooks/redux"
import { EffectEnum } from "@/types/event"
import Snowfall from "react-snowfall"
import { useEffect, useState } from "react"
import { ConfettiEffect } from "./ConfettiEffect"
import { FestivalFlags } from "./FestivalFlags"
import RepublicDay from "../EventEffects/RepublicDay"
import Mahashivratri from "../EventEffects/Mahashivratri"
import { X } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { clearEffect } from '@/store/Reducers/effects'

function EventEffects() {
  const features = useAppSelector(state => state.Effects)
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="fixed inset-0 z-[999] pointer-events-none">
        {features.effect === EffectEnum.CHRISTMAS && (
          <>
            <Snowfall snowflakeCount={40} color="#ff4d4f" />
            <Snowfall snowflakeCount={40} color="#40a9ff" />
            <Snowfall snowflakeCount={40} color="#73d13d" />
            <Snowfall snowflakeCount={40} color="#9254de" />
          </>
        )}

        {features.effect === EffectEnum.NEW_YEAR && <NewYearSequence />}
        {features.effect === EffectEnum.Mahashivratri && <Mahashivratri />}
        {/* { features.effect === EffectEnum.REPUBLIC_DAY && <RepublicDay />} */}
      </div>
      {features.effect && <div className='absolute top-5 p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-md right-5 z-[999] transition-colors'>
        <X className='text-white cursor-pointer' size={18} onClick={() => dispatch(clearEffect())} />
      </div>}
    </>
  )
}

function NewYearSequence() {
  const [countdown, setCountdown] = useState<number | null>(3)
  const [stage, setStage] = useState({
    flags: false,
    confetti: false
  })

  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCountdown(null)
      triggerCelebration()
    }
  }, [countdown])

  const triggerCelebration = () => {
    setStage(prev => ({ ...prev, flags: true }))

    setTimeout(() => {
      setStage(prev => ({ ...prev, confetti: true }))
    }, 2000)
  }

  return (
    <>
      {countdown !== null && countdown > 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/20 backdrop-blur-sm">
          <div
            key={countdown}
            className="animate-ping-once"
          >
            <span className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 drop-shadow-2xl">
              {countdown}
            </span>
          </div>
        </div>
      )}


      <div className={`transition-transform duration-700 ease-out ${stage.flags ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
        {stage.flags && <FestivalFlags />}
      </div>

      <div className={`transition-opacity duration-500 ${stage.confetti ? 'opacity-100' : 'opacity-0'}`}>
        {stage.confetti && <ConfettiEffect />}
      </div>
    </>
  )
}

export default EventEffects