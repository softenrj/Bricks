// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

"use client"
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EffectEnum, IEvent } from '@/types/event'
import { ThumbsUp, MessageSquare, Calendar, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Tooltip } from '../common/Tooltip'
import { formatDistanceToNow } from 'date-fns'
import { Switch } from '../ui/switch'
import EventAudio from './EventAudio'
import { useAppDispatch } from '@/hooks/redux'
import { clearEffect, setEffect } from '@/store/Reducers/effects'

function FeatureEvent({ event }: { event: IEvent }) {
  const [effect, setEffectS] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleEffect = () => {
    if (effect) {
      dispatch(clearEffect())
      setEffectS(false);
    } else {
      dispatch(setEffect(EffectEnum.CHRISTMAS))
      setEffectS(true);
    }
  }

  return (
    <div className="w-full py-1 flex justify-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-pink-600/10" />

        <div className="relative flex flex-col md:flex-row">
          <div className="relative w-full md:w-3/5 aspect-[16/9] md:aspect-auto md:min-h-[420px]">
            <Image
              src={event.thumbnail}
              alt={event.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 hidden md:block" />
          </div>

          <div className="relative flex-1 p-6 md:p-12 flex flex-col justify-center gap-4">

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2 py-1 text-xs font-semibold uppercase rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Featured · {event.status}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Calendar size={14} />
                {formatDistanceToNow(new Date(event.createdAt))} ago
              </span>
              { event.audio && <EventAudio src={`/api/audio?src=${encodeURIComponent(event.audio)}`} />}
            </div>

            <h1 className="text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
              {event.name}
            </h1>

            <p className="text-zinc-400 text-base md:text-md leading-relaxed max-w-xl">
              {event.description}
            </p>

            <div className="flex flex-wrap justify-between items-center gap-6 pt-4">
              <div className='flex gap-3'><Tooltip content="Likes">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="text-zinc-400" size={18} />
                  <span className="text-zinc-300 font-medium">{event.like || 0}</span>
                </div>
              </Tooltip>

                <Tooltip content="Comments">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="text-zinc-400" size={18} />
                    <span className="text-zinc-300 font-medium">{event.comments || 0}</span>
                  </div>
                </Tooltip></div>
              <Tooltip content={'On Special Effect'}>
                <div className='flex gap-2 justify-center items-center'>
                  <Sparkles className='text-green-400' size={18} />
                  <Switch checked={effect} onClick={handleEffect} />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureEvent
