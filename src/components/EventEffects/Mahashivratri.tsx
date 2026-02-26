// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { BackgroundPaths } from '../ui/paths'

function Mahashivratri() {
  return (
    <div className='fixed flex items-center justify-center inset-0 bg-black z-50 overflow-hidden'>

      <motion.div 
        className="absolute inset-0 bg-blue-500/5 z-[5] pointer-events-none"
        animate={{ opacity: [0, 0.1, 0, 0.2, 0.05, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        className="absolute inset-0 bg-white z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ 
          duration: 4.5, 
          times: [0, 0.88, 0.92, 1],
          ease: "easeInOut" 
        }}
      />

      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 3 }}
      >
        <BackgroundPaths className='text-blue-500/10' />
      </motion.div>

      <motion.div 
        className='absolute h-120 w-240 z-20 pointer-events-none'
        initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
        animate={{ 
          scale: [0.1, 1, 1.05, 1.1, 30], 
          opacity: [0, 1, 1, 1, 0],
          x: [0, 0, -2, 2, -2, 2, 0],
          filter: [
            "blur(15px) brightness(0.5)", 
            "blur(0px) brightness(1)", 
            "blur(0px) brightness(1.5)", 
            "blur(2px) brightness(3)", 
            "blur(40px) brightness(20)"
          ]
        }}
        transition={{ 
          duration: 4.2, 
          times: [0, 0.6, 0.75, 0.85, 1],
          ease: "easeIn" 
        }}
      >
        <Image 
          src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1771054594/har-har-mahadev-text-design-illustration-black-white-har-har-mahadev-hindi-calligraphy-design-png-clipart-image-har-har-322390657-Photoroom_h8b7nr.png" 
          fill 
          className="object-contain" 
          alt='Har Har Mahadev' 
        />
      </motion.div>

      <motion.div 
        className='relative h-130 w-240 z-30 pointer-events-none'
        initial={{ opacity: 0, scale: 2, filter: "brightness(0) blur(50px)" }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          filter: "brightness(1) blur(0px)" 
        }}
        transition={{ 
          delay: 4.0,
          duration: 2.5,
          type: "spring",
          stiffness: 25,
          damping: 15
        }}
      >
        <Image 
          src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1771054510/Adiyogi_digital_painting__Nikhil_Mishra.jpg-removebg-preview_l7i0nr.png" 
          fill 
          className="object-contain drop-shadow-[0_0_100px_rgba(59,130,246,0.5)]" 
          alt='Adiyogi' 
        />
      </motion.div>

    </div>
  )
}

export default Mahashivratri