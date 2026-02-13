// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

"use client"
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EffectEnum, IEvent } from '@/types/event'
import { MessageSquare, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Tooltip } from '../common/Tooltip'
import { formatDistanceToNow, isBefore, isWithinInterval } from 'date-fns'
import { Switch } from '../ui/switch'
import EventAudio from './EventAudio'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearEffect, setEffect } from '@/store/Reducers/effects'
import { Icon } from '@iconify/react'
import EventCommentSection from './EventCommentSection'

function FeatureEvent({
  event,
  incLikeToEvent,
  decLikeToEvent
}: {
  event: IEvent,
  incLikeToEvent: (eventId: string) => void,
  decLikeToEvent: (eventId: string) => void
}) {
  const eventEffect = useAppSelector(state => state).Effects;
  const dispatch = useAppDispatch();

  const [effectEnabled, setEffectEnabled] = React.useState<boolean>(!!eventEffect.effect);
  const [comment, setComment] = React.useState<boolean>(false);

  const now = new Date();
  const start = new Date(event.liveAt);
  const end = new Date(event.expireAt);

  let status = "Expired";

  if (isBefore(now, start)) {
    status = "Upcoming";
  } else if (isWithinInterval(now, { start, end })) {
    status = "Live";
  }
  React.useEffect(() => {
    setEffectEnabled(!!eventEffect.effect);
  }, [eventEffect.effect]);

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
    if (effectEnabled) {
      dispatch(clearEffect())
      setEffectEnabled(false);
    } else {
      dispatch(setEffect(event.effect as EffectEnum))
      setEffectEnabled(true);
    }
  }

  const handleLike = () => {
    if (event.isLiked) {
      decLikeToEvent(event._id);
    } else {
      incLikeToEvent(event._id);
    }
  }

  const handleComment = () => setComment(!comment);

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
                Featured · {status}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Calendar size={14} />
                {formatDistanceToNow(new Date(event.createdAt))} ago
              </span>
              {event.audio && <EventAudio effect={event.effect as EffectEnum} lyrics={event.lyrics} src={`/api/audio?src=${encodeURIComponent(event.audio)}`} isValid={status !== "Upcoming"} />}
            </div>

            <h1 className="text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
              {event.name}
            </h1>

            <p className="text-zinc-400 text-base md:text-md leading-relaxed max-w-xl">
              {event.description}
            </p>

            <div className="flex flex-wrap justify-between items-center gap-6 pt-4">
              <div className='flex gap-3'>
                <Tooltip content="Likes">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>
                    {event.isLiked ? (
                      <Icon icon="heroicons-solid:thumb-up" width="18" height="18" style={{ color: "#eb195f" }} />
                    ) : (
                      <Icon icon="heroicons-outline:thumb-up" width="22" height="22" style={{ color: "#ffffff99" }} />
                    )}
                    <span className="text-zinc-300 font-medium">{event.liked || 0}</span>
                  </div>
                </Tooltip>

                <Tooltip content="Comments">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="text-zinc-400" size={18} onClick={handleComment} />
                    <span className="text-zinc-300 font-medium">{event.comments || 0}</span>
                  </div>
                </Tooltip>
              </div>

              {event.effect && <Tooltip content={'On Special Effect'} triggClass={`${status === "Upcoming" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}>
                <div className={`flex gap-2 justify-center items-center `}>
                  <Sparkles className='text-green-400' size={18} />
                  <Switch disabled={status === "Upcoming"} checked={effectEnabled} onClick={handleEffect} />
                </div>
              </Tooltip>}
            </div>
            <EventCommentSection fallback={handleComment} open={comment} eventId={event._id} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureEvent