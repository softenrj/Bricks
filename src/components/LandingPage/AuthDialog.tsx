// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react"
import Auth from "../Auth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

function AuthDialog({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const { checking, user }  = useAuth();
  const router = useRouter();
  React.useEffect(() => {
  if (isOpen && !checking && user) {
    setIsAuth(true);
    router.push('/dashboard')
  }
}, [checking, user, router, isOpen])

  return !isAuth && <AppDialog open={isOpen} close={onClose} />
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
    <Dialog open={open} onOpenChange={close} aria-describedby="dialog-desc">
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
          src="https://res.cloudinary.com/dcyn3ewpv/video/upload/v1767630846/cosmic-bg_gqcncx.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 rounded-xl opacity-40"
          crossOrigin="anonymous"
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
