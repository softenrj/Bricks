import Image from "next/image";
import React from "react";
import FeatureBadge from "../common/FeatureBadge";

function SectionOne() {
  return (
    <div className="flex flex-col items-center text-center w-full px-4 pt-8 sm:pt-8 md:pt-12 lg:pt-16">
      {/* Logo */}
      <div className="relative mb-6">
        {/* Glow behind logo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-800 via-fuchsia-800 to-blue-800 blur-3xl opacity-50 animate-glow"></div>

        {/* Actual logo */}
        <Image
          src="/landingPage/transparent-bricks.png"
          width={140}
          height={140}
          alt="#bricks-logo"
          className="relative drop-shadow-2xl sm:w-[160px] sm:h-[160px] w-[120px] h-[120px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
          BRICKS AI
        </span>
      </h1>

      {/* Tagline */}
      <h2 className="text-base sm:text-lg md:text-xl text-gray-300 mb-3 sm:mb-4">
        Turn Ideas into Code — Instantly.
      </h2>

      {/* Description */}
      <h3 className="max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed px-2 sm:px-0">
        Talk, type, or sketch.{" "}
        <span className="font-semibold text-pink-400">BRICKS AI</span> transforms
        your voice, text, or images into a full, working codebase — live in your
        browser.
      </h3>

      {/* Feature Badge */}
      <div className="mt-1 sm:mt-2">
        <FeatureBadge />
      </div>
    </div>
  );
}

export default SectionOne;