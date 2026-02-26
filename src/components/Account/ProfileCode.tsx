// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import QRCode from "react-qr-code"
import { Copy, Check } from "lucide-react"
import Image from "next/image"
import { defaultAppUrl } from "@/utils/constance"
import { useAppSelector } from "@/hooks/redux"
import { ImageDialog } from "./ImageDialog"

function ProfileCode() {
  const [copied, setCopied] = useState(false)
  const user = useAppSelector(state => state.user)

  const dummyLink = `${defaultAppUrl}/bricks/${user.uid}`

  async function handleCopy() {
    await navigator.clipboard.writeText(dummyLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-full p-4 flex flex-col gap-4 bg-gradient-to-br from-bg-white/5 to-bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg hover:border-white/20 transition-colors duration-300"
    >
      <h5 className="text-lg font-semibold text-gray-200">
        Platform ID Card
      </h5>

      {/* Link & Copy */}
      <div className="flex items-center w-full gap-3 bg-black/60 border border-white/10 rounded-md px-3 py-2">
        <code className="text-xs text-gray-200 truncate w-full">
          {dummyLink}
        </code>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-all"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-5 items-center md:items-start">
        
        <div className="bg-white p-3 rounded-lg shadow-md w-full max-w-[180px]">
          <QRCode
            value={dummyLink}
            style={{ height: "auto", width: "100%" }}
          />
        </div>

        <div className="flex flex-col w-full md:w-auto h-full">
          
          <h6 className="text-sm font-semibold text-gray-200">
            Share Bricks ID Card
          </h6>

          <p className="text-xs text-gray-400 mt-1 leading-snug max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate rem
            soluta quibusdam ipsum fugiat delectus dolores.
          </p>

          <div className="flex items-center gap-2 mt-3 align-baseline">
            <Image
              src="/landingPage/bricks.svg"
              width={32}
              height={32}
              alt="bricks-logo"
              className="drop-shadow-xl"
            />

            <div>
              <h4 className="text-xl font-extrabold tracking-tight text-white leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
                  BRICKS AI
                </span>
              </h4>

              <p className="text-xs text-gray-300 mt-1">
                Turn Ideas into Code — Instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        Scan this QR or copy the link to view your profile.
      </p>
    </motion.div>
    </>
  )
}

export default ProfileCode
