"use client"
import React from "react"
import Auth from "../Auth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

function AuthDialog({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return <AppDialog open={isOpen} close={onClose} />
}

export default AuthDialog

function AppDialog({
  open,
  close,
}: {
  open: boolean
  close: () => void
}): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className="
          w-[95%] sm:w-[90%] md:max-w-md 
          rounded-xl bg-black/90 text-white 
          border border-white/10 backdrop-blur-md
          px-4 sm:px-6 py-6 sm:py-8
          overflow-hidden
          flex flex-col
        "
      >
        {/* Background video */}
        <video
          src="/video/ai-card-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 rounded-xl opacity-40"
        />

        <DialogHeader className="text-center">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold text-pink-400">
            Turn Ideas into Code — Instantly.
          </DialogTitle>
        </DialogHeader>

        {/* Auth component (Login/SignUp forms) */}
        <div className="mt-4 sm:mt-6">
          <Auth />
        </div>
      </DialogContent>
    </Dialog>
  )
}
