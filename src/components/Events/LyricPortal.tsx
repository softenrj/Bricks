"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector } from '@/hooks/redux'

const LyricPortal = () => {
  const lyrics = useAppSelector(state => state.Effects).lyrics;
  const activeIdx = useAppSelector(state => state.Effects).lyricsIdx;
  const eff = useAppSelector(state => state.Effects).effect

  return (
    <div className="pointer-events-none fixed bottom-18 left-1/2 z-999 w-full max-w-4xl -translate-x-1/2 px-4 text-center">
      {eff && lyrics?.length > 0 && activeIdx >= 0 && (
          <AnimatePresence mode="sync">
            <motion.p
              key={activeIdx}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="subtitle text-3xl md:text-5xl tracking-tighter bg-gradient-to-b from-white via-cyan-250 to-cyan-500 bg-clip-text text-transparent drop-shadow-[10_10_15px_rgba(34,211,238,0.9)]"
            >
              {lyrics[activeIdx].text}
            </motion.p>
            <div className="mt-2 h-1 w-24 rounded-full bg-cyan-500/30 blur-md" />
          </AnimatePresence>
      )}
    </div>
  )
}

export default LyricPortal