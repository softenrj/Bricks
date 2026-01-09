"use client"
import React from "react"
import { motion } from "framer-motion"

function SectionTwo() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play()
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-12 flex flex-col items-center justify-center bg-black/5 overflow-hidden"
    >
      <div className="relative w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative rounded-xl border border-white/10 overflow-hidden
                     bg-gradient-to-b from-white/[0.04] to-transparent"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-400 hidden sm:block">
              Live Preview
            </span>
          </div>

          <motion.video
            ref={videoRef}
            src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767631406/Screen_Recording_2026-01-05_215143_tqjqyq.mp4"
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            initial={{ scale: 1.02, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-auto block"
          />

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SectionTwo
