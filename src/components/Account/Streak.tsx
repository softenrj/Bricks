// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import FireSvg from "../../../public/svg/fire.svg"
import Image from 'next/image'
import { useUserStats } from '@/service/api.user'

function Streak() {
    const { data: stats } = useUserStats();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group w-full h-full flex-1 flex flex-col gap-1 max-w-full p-4 bg-gradient-to-br from-bg-white/5 to-bg-white/10 rounded-md border border-white/10 backdrop-blur-xl shadow-lg hover:border-white/20 transition-colors duration-300"
        >
            <h5 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-200">
                Max Streak
            </h5>

            <div className='flex flex-col gap-3 justify-center items-center'>
                <div className="relative w-[clamp(42px,6vw,60px)] h-[clamp(42px,6vw,60px)]">
                    <Image
                        src={FireSvg.src}
                        alt={"fire streak"}
                        fill
                    />
                </div>

                <p className="text-white font-bold text-2xl sm:text-3xl tracking-tight line-clamp-1">
                    {stats?.maxStreak || 0}
                </p>
            </div>
        </motion.div>
    )
}

export default Streak