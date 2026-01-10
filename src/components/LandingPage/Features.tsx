// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import FeatureCard from './FeatureCard';

function Features() {
    return (
        <div className='w-full flex flex-col items-center py-20 gap-20'>
            <HeadingSection />

            {[1, 2, 3].map((_, index) => (
                <ScrollFocusedCard key={index} />
            ))}
        </div>
    )
}

function ScrollFocusedCard() {
    const ref = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center", "end start"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.5,
    })

    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9])
    const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3])
    const y = useTransform(smoothProgress, [0, 0.5, 1], [40, 0, -40])

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity, y }}
            className="w-full flex justify-center will-change-transform"
        >
            <FeatureCard />
        </motion.div>
    )
}


function HeadingSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1]);

    return (
        <motion.h2
            ref={ref}
            style={{ scale, opacity }}
            className=" text-center font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
            Features of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
                Bricks AI
            </span>
        </motion.h2>

    );
}

export default Features