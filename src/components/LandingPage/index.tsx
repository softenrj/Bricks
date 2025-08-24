"use client"
import React from "react"
import Navbar from "../common/Navbar"
import SectionOne from "./SectionOne"
import HeroButtons from "./HeroButtons"
import Footer from "../common/Footer"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#01040b] via-[#111823] to-[#010814] relative overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/landingPage/circuit-board.svg"
          alt="circuit background"
          className="w-full h-full object-cover opacity-0.2"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <SectionOne />
        <HeroButtons />
        {/* working */}
        {/* features card */}
        {/* live demo */}
        <Footer />
      </div>
    </div>
  )
}
