// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"

import React, { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import FeatureCard from "./FeatureCard"

function Features() {
  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-16 lg:py-24 gap-28">
      <HeadingSection />

      {[1, 2, 3].map((_, index) => (
        <ScrollFocusedCard key={index} />
      ))}
    </div>
  )
}

/* --------------------------------------------- */
/* Card Scroll Animation */
/* --------------------------------------------- */
function ScrollFocusedCard() {
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center", "end 10%"],
  })

  // 🔥 Heavy, buttery spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    mass: 1,
  })

  // 🎯 Subtle transforms only
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1, 0.96])
  const opacity = useTransform(smoothProgress, [0, 0.3, 1], [0.75, 1, 0.75])
  const y = useTransform(smoothProgress, [0, 0.5, 1], [24, 0, -24])

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

/* --------------------------------------------- */
/* Heading Animation */
/* --------------------------------------------- */
function HeadingSection() {
  const ref = useRef<HTMLHeadingElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
  })

  const scale = useTransform(smooth, [0, 1], [0.95, 1])
  const opacity = useTransform(smooth, [0, 1], [0.7, 1])
  const y = useTransform(smooth, [0, 1], [20, 0])

  return (
    <motion.h2
      ref={ref}
      style={{ scale, opacity, y }}
      className="
        text-center font-bold text-white
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
        leading-tight tracking-tight
      "
    >
      Features of{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
        Bricks AI
      </span>
    </motion.h2>
  )
}

export default Features
