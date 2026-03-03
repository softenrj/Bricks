"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import CustomSplash from '../ui/Splash';

function HoliEvent() {

  return (
    <div className='fixed  flex items-center justify-center inset-0  z-999 overflow-hidden'>

      <motion.div
        className='absolute h-60 w-[40rem] z-999 cursor-pointer' 
        initial={{ scale: 2.5, opacity: 0, filter: "blur(20px)", y: -50 }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 14,
          mass: 1,
          delay: 0.2
        }}
      >
        <Image
          src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1772525442/BRICKS-removebg-preview_psviq0.png"
          fill
          className="object-contain"
          alt='Har Har Mahadev'
          onClick={() => prompt("dada")}
        />
      </motion.div>
        <CustomSplash />
    </div>
  )
}

export default HoliEvent