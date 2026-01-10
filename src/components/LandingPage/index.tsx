// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react"
import Navbar from "../common/Navbar"
import SectionOne from "./SectionOne"
import HeroButtons from "./HeroButtons"
import Footer from "../common/Footer"
import Image from "next/image"
import SectionTwo from "./SectionTwo"
import Features from "./Features"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#000102] via-[#0c1118] to-[#010814] relative overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-80">
        <div className="fixed inset-0 -z-20 opacity-40 pointer-events-none">
          <Image
            src="/landingPage/circuit-board.svg"
            alt="circuit background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        <video
          src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767630846/cosmic-bg_gqcncx.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-screen object-cover -z-10 opacity-50"
          crossOrigin="anonymous"
        />
        <Navbar />
        <main className="flex-1 flex flex-col gap-12">
          <SectionOne />
          <HeroButtons />
          {/* working */}
          <SectionTwo />
          {/* features card */}
          <Features />
          {/* live demo */}
        </main>
        <Footer />
      </div>
    </div>
  )
}
