// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React, { useRef } from "react"
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import FeatureCard from "./FeatureCard"

function Features({rootYScrollProgress}:{rootYScrollProgress: MotionValue<number>}) {

  return (
    <div
      className="w-full min-h-[300vh] flex flex-col items-center"
    >
      <HeadingSection />

      {[1, 2, 3].map((_, i) => {
        const targetScale = 1 - (3 - i) * 0.05
        return (
          <FeatureCard
            key={i}
            progress={rootYScrollProgress}
            i={i}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}

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
