// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from "react"
import { ReactLenis } from 'lenis/react';
import Navbar from "../common/Navbar"
import SectionOne from "./SectionOne"
import HeroButtons from "./HeroButtons"
import Footer from "../common/Footer"
import Image from "next/image"
import SectionTwo from "./SectionTwo"
import Features from "./Features"
import { useScroll } from "framer-motion";
import FlowShowCase from "./FlowShowCase";

export default function Home() {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  return (
    <ReactLenis root>
      <div ref={container} className="min-h-screen w-full bg-gradient-to-r from-[#000102] via-[#0c1118] to-[#010814] ">
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

      <div className="relative z-10 flex flex-col min-h-screen">
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
          <Features rootYScrollProgress={scrollYProgress} />
          {/* <FlowShowCase /> */}
          {/* live demo */}
        </main>
        <Footer />
      </div>
    </div>
    </ReactLenis>
  )
}
