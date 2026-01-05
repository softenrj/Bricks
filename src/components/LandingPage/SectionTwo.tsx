// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'

function SectionTwo() {
    return (
        <section className="w-full py-20 flex flex-col items-center justify-center bg-black/5 overflow-hidden">
            <div className="relative w-full max-w-6xl px-5 pl-6">
                <div className="relative rounded-xl border border-white/1 bg-gray-900/5 backdrop-blur-xs shadow-2xl overflow-hidden ring-1 ring-white/20">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>

                    <video
                        src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767631406/Screen_Recording_2026-01-05_215143_tqjqyq.mp4"
                        crossOrigin="anonymous"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto block"
                    />
                </div>
            </div>
        </section>
    )
}

export default SectionTwo