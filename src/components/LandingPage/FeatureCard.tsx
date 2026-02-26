// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"

import React, { useRef, useState } from "react"
import { motion, MotionValue, useTransform } from "framer-motion"
import { GridPattern } from "../ui/gradient-pattern"
import { cn } from "@/lib/utils"
import { GitBranch, Play, Pause } from "lucide-react"
import Image from "next/image"
import { Tooltip } from "../common/Tooltip"

function FeatureCard({
    progress,
    targetScale,
    i,
}: {
    progress: MotionValue<number>
    targetScale: number
    i: number
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // === STACK ANIMATION (UNCHANGED) ===
    const start = i * 0.2
    const end = start + 0.5
    const scale = useTransform(progress, [start, end], [1, targetScale])

    // === VIDEO PLAY / PAUSE LOGIC ===
    const togglePlay = () => {
        if (!videoRef.current) return

        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div
            className=" min-h-[100svh] sm:h-screen flex items-center justify-center sticky top-0 "
        >
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className=" relative -top-[10%] sm:-top-[18%] lg:-top-[25%] flex justify-center "
            >
                <div className="relative group w-[90%] sm:w-[88%] md:w-[86%] lg:w-[84%] rounded-xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl p-4 sm:p-8">
                    <GridPattern
                        width={20}
                        height={20}
                        x={-1}
                        y={-1}
                        className={cn(
                            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-50"
                        )}
                    />

                    <div
                        className=" relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-end"
                    >
                        {/* Play Button */}
                        <Tooltip content={isPlaying ? "Pause Preview" : "Click to Play Preview"}>
                            <button
                                onClick={togglePlay}
                                className=" absolute top-2 right-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-gradient-to-b from-[#2a2a2a57] via-[#1a1a1a3f] to-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.5)] group-hover:border-white/40 transition-all"
                            >
                                {isPlaying ? (
                                    <Pause className="w-3 h-3 text-white" />
                                ) : (
                                    <Play className="w-3 h-3 text-gray-400 group-hover:text-white transition" />
                                )}
                            </button>
                        </Tooltip>

                        {/* LEFT CONTENT */}
                        <div className="space-y-2 sm:space-y-6">
                            {/* Icons */}
                            <div className="flex items-center -space-x-1.5 sm:-space-x-2">
                                {[1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -2, scale: 1.05, zIndex: 10 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className="relative group cursor-pointer"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 scale-150" />
                                        <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-gradient-to-b from-[#2a2a2a57] via-[#1a1a1a3f] to-[#0a0a0a]">
                                            <GitBranch className="w-4 h-4 text-gray-400 group-hover:text-white transition" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex gap-3 flex-wrap text-white leading-tight">
                                <span>Real-time</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                    Code Sync
                                </span>
                            </h3>

                            <div>
                                <span className="text-green-600 text-sm">/*</span>
                                <p className="text-green-600 text-[12pt] sm:text-md leading-relaxed ml-2 line-clamp-4 md:line-clamp-5 lg:line-clamp-none">
                                    "Watch your ideas materialize. Our instant preview engine renders
                                    your codebase with zero latency as Bricks AI builds."
                                    "Watch your ideas materialize. Our instant preview engine renders
                                    your codebase with zero latency as Bricks AI builds."
                                    "Watch your ideas materialize. Our instant preview engine renders
                                    your codebase with zero latency as Bricks AI builds."
                                </p>
                                <span className="text-green-600 text-sm">*/</span>
                            </div>

                            <ul className="space-y-2 text-md text-zinc-200">
                                {[
                                    "Live preview with zero latency",
                                    "Bi-directional real-time sync",
                                    "Ping-based transport layer",
                                    "Conflict-free intelligent merges",
                                    "Instant state propagation",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <span className="text-pink-400">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* RIGHT MEDIA */}
                        <div className="relative sm:-right-4 sm:-bottom-12 base:min-w-xl sm:min-w-3xl rounded-md sm:rounded-2xl items-baseline">

                            <div className="relative p-[6px] sm:p-[10px] rounded-md sm:rounded-2xl bg-gradient-to-r from-rose-500/80 via-fuchsia-500/80 to-amber-400/80">
                                <div className="absolute -inset-8 sm:-inset-24 z-0 pointer-events-none ">
                                    <Image
                                        src="/svg/featureBox.svg"
                                        alt="noise texture"
                                        fill
                                        className="object-cover "
                                        priority
                                    />
                                </div>

                                <div className="relative rounded-md sm:rounded-2xl overflow-hidden bg-black">
                                    <video
                                        ref={videoRef}
                                        src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767631406/Screen_Recording_2026-01-05_215143_tqjqyq.mp4"
                                        muted
                                        autoPlay={false}
                                        crossOrigin="anonymous"
                                        playsInline
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Glow */}
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full" />
                </div>
            </motion.div>
        </div>
    )
}

export default FeatureCard
