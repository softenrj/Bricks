// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"

import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export function ConfettiEffect() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      gravity={0.2}
      colors={["#ff4d4f", "#40a9ff", "#73d13d", "#9254de", "#ffd666"]}
    />
  )
}
