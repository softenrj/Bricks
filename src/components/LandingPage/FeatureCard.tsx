// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Particles } from '../ui/shadcn-io/Particles'
import { ShootingStars } from '../ui/shadcn-io/shooting-stars'

function FeatureCard() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

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
        <div className="perspective-1000 flex justify-center">

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative group w-[80%] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl"
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
                <ShootingStars
                    className="absolute inset-0"
                    starColor="#9E00FF"
                    trailColor="#2EB9DF"
                    minSpeed={15}
                    maxSpeed={35}
                    minDelay={1200}
                    maxDelay={2200}
                />

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold tracking-widest uppercase"
                        >
                            Live Preview
                        </motion.div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Real-time <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                Code Sync
                            </span>
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            Watch your ideas materialize. Our instant preview engine renders
                            your codebase with zero latency as Bricks AI builds.
                        </p>
                    </div>

                    {/* Right Media (Video) */}
                    <motion.div
                        style={{ translateZ: "50px" }} // Pushes video "out" in 3D space
                        className="relative rounded-2xl border border-white/20 shadow-2xl overflow-hidden aspect-video bg-black"
                    >
                        <div className="absolute top-0 w-full h-6 bg-white/5 border-b border-white/10 flex items-center gap-1.5 px-3 z-20">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>

                        <video
                            ref={videoRef}
                            src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767631406/Screen_Recording_2026-01-05_215143_tqjqyq.mp4"
                            muted
                            loop
                            crossOrigin='anonymous'
                            playsInline
                            className="w-full h-full object-cover pt-6 group-hover:scale-101 transition-transform duration-600"
                        />
                    </motion.div>
                </div>

                {/* Subtle Bottom Glow */}
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full" />
            </motion.div>
        </div>
    )
}

export default FeatureCard

//✓