// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { IEvent } from '@/types/event'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, ThumbsUp, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Events({ events, eventFallback }: { events: IEvent[], eventFallback: (eventId: string) => void }) {
    return (
        <div className=" grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event, idx) => (
                <div key={event._id + idx} className=" group rounded-sm overflow-hidden bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={event.thumbnail}
                            alt={event.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0bg-gradient-to-tfrom-black/70via-black/20to-transparent"/>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase text-indigo-400">
                                {/* {event.} */}
                            </span>

                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <Calendar size={13} />
                                {formatDistanceToNow(new Date(event.createdAt))} ago
                            </span>
                        </div>

                        <h2 className="text-base font-semibold text-white line-clamp-1">
                            {event.name}
                        </h2>

                        <p className="text-sm text-zinc-400 line-clamp-2">
                            {event.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-zinc-400 text-sm">
                                <div className="flex items-center gap-1.5 hover:text-indigo-400 transition cursor-pointer">
                                    <ThumbsUp size={16} />
                                    <span>{event.liked}</span>
                                </div>

                                <div className="flex items-center gap-1.5 hover:text-indigo-400 transition cursor-pointer">
                                    <MessageSquare size={16} />
                                    <span>{event.comments}</span>
                                </div>
                            </div>

                            <button className=" text-sm font-medium text-indigo-400 hover:text-indigo-300 transition " onClick={() => eventFallback(event._id)}>
                                View →
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Events