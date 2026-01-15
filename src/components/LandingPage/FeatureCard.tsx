// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { GridPattern } from '../ui/gradient-pattern'
import { cn } from '@/lib/utils'
import { GitBranch } from 'lucide-react'
import Image from 'next/image'
import AiTyper from '../common/AiTyper'

function FeatureCard() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const [startTyping, setStartTyping] = useState(false)


    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return

        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartTyping(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.4 }
        )

        if (textRef.current) observer.observe(textRef.current)
        return () => observer.disconnect()
    }, [])

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) videoRef.current?.play()
                    else videoRef.current?.pause()
                })
            },
            { threshold: 0.5 }
        )
        if (videoRef.current) observer.observe(videoRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="flex justify-center">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative group w-[90%] sm:w-[84%] rounded-xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl p-4 sm:p-8"
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useTransform(
                            [mouseXSpring, mouseYSpring],
                            ([latestX, latestY]) => `radial-gradient(600px circle at ${((latestX as number) + 0.5) * 100}% ${((latestY as number) + 0.5) * 100}%, rgba(236, 72, 153, 0.15), transparent 80%)`
                        )
                    }}
                />

                <GridPattern
                    width={20}
                    height={20}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-50",
                    )}
                />

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-end">
                    {/* Left */}
                    <div className="space-y-2 sm:space-y-6">
                        {/* Icons */}
                        <div className="flex items-center -space-x-1.5 sm:-space-x-2 ">
                            {[1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        y: -2,
                                        scale: 1.05,
                                        zIndex: 10,
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="absolute inset-0 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

                                    <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12  rounded-full border border-white/20  bg-gradient-to-b from-[#2a2a2a57] via-[#1a1a1a3f] to-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.5)]  group-hover:border-white/40 transition-all duration-300" >
                                        <GitBranch className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                            <motion.div
                                                initial={{ x: '-150%', skewX: -20 }}
                                                whileHover={{ x: '150%' }}
                                                transition={{ duration: 0.75, ease: "easeInOut" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold flex gap-3 flex-wrap text-white leading-tight">
                            <span>Real-time</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                Code Sync
                            </span>
                        </h3>

                        <div ref={textRef} className="float sm:-mt-4">
                            <span className="text-green-600 text-sm">/* </span>

                            {startTyping ? (
                                <AiTyper
                                    textColour="text-green-600"
                                    className="text-green-400 text-[12pt] sm:text-md leading-relaxed ml-2"
                                    messages={[
                                        "Watch your ideas materialize. Our instant preview engine renders your codebase with zero latency as Bricks AI builds."
                                    ]}
                                    typingSpeed={20}
                                    cursor={false}
                                />
                            ) : (
                                <span className="ml-2 text-green-400 opacity-0">
                                    placeholder
                                </span>
                            )}

                            <span className="text-green-600 text-sm"> */</span>
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

                    {/* Right Media (Video) */}
                    <div className="relative sm:-right-4 sm:-bottom-12 base:min-w-xl sm:min-w-3xl rounded-md sm:rounded-2xl items-baseline">

                        <div className="relative p-[6px] sm:p-[10px] rounded-md sm:rounded-2xl bg-gradient-to-r from-rose-500/80 via-fuchsia-500/80 to-amber-400/80">
                            <div className="absolute -inset-13 sm:-inset-24 z-0 pointer-events-none ">
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
                                    loop
                                    crossOrigin="anonymous"
                                    playsInline
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Subtle Bottom Glow */}
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full" />
            </motion.div>
        </div>
    )
}

export default FeatureCard

//✓

