"use client"
import Image from "next/image";
import React from "react";
import FeatureBadge from "../common/FeatureBadge";
import { motion } from "framer-motion";

function SectionOne() {
  return (
    <div className="flex flex-col items-center text-center w-full px-4 sm:mt-8 md:mt-12 lg:mt-16">
      {/* Logo */}
      <div className="relative mb-6">
        {/* Animated Glow */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.3 }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-800 via-fuchsia-800 to-blue-800 blur-3xl"
        ></motion.div>

        {/* Logo with intro + float effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/landingPage/transparent-bricks.png"
              width={160}
              height={160}
              alt="#bricks-logo"
              className="relative drop-shadow-[0_0_25px_rgba(255,100,150,0.6)] sm:w-[180px] sm:h-[180px] w-[130px] h-[130px]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 sm:mb-4"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500 animate-gradient-x">
          BRICKS AI
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="text-base sm:text-lg md:text-xl text-gray-300 mb-3 sm:mb-4"
      >
        Turn Ideas into Code — Instantly.
      </motion.h2>

      {/* Description */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed px-2 sm:px-0"
      >
        Talk, type, or sketch.{" "}
        <span className="font-semibold text-pink-400">BRICKS AI</span> transforms
        your voice, text, or images into a full, working codebase — live in your
        browser.
      </motion.h3>

      {/* Feature Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="mt-2"
      >
        <FeatureBadge />
      </motion.div>
    </div>
  );
}

export default SectionOne;
