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

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#01040b] via-[#111823] to-[#010814] relative overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/landingPage/circuit-board.svg"
          alt="circuit background"
          className="w-full h-full object-cover opacity-0.2"
          fill
          priority
          aria-hidden="true"
        />
      </div>



      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        <video
          src="/video/cosmic-bg.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover -z-10 rounded-xl opacity-35"
        />
        <Navbar />
        <main className="flex-1 flex flex-col gap-12">
          <SectionOne />
          <HeroButtons />
          {/* working */}
          {/* features card */}
          {/* live demo */}
        </main>
        <Footer />
      </div>
    </div>
  )
}
