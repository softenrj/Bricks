import Image from 'next/image'
import React from 'react'
import FeatureBadge from '../common/FeatureBadge'

function SectionOne() {
    return (
        <div className="flex flex-col justify-center items-center text-center w-screen min-h-screen -mt-20">

            {/* Logo */}
            <div className="relative mb-6">
                {/* Glow behind logo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-800 via-fuchsia-800 to-blue-800 blur-3xl opacity-50 animate-glow"></div>

                {/* Actual logo */}
                <Image
                    src="/landingPage/transparent-bricks.png"
                    width={160}
                    height={160}
                    alt="#bricks-logo"
                    className="relative drop-shadow-2xl"
                />
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
                    BRICKS AI
                </span>
            </h1>

            {/* Tagline */}
            <h2 className="text-lg sm:text-xl text-gray-300 mb-4">
                Turn Ideas into Code — Instantly.
            </h2>

            {/* Description */}
            <h3 className="max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed">
                Talk, type, or sketch. <span className="font-semibold text-pink-400">BRICKS AI</span> transforms your voice,
                text, or images into a full, working codebase — live in your browser.
            </h3>

            <FeatureBadge />
        </div>
    )
}

export default SectionOne
