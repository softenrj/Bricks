// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import * as React from "react"

interface ImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  header: string
  description?: string
  img?: string
}

export function ImageDialog({
  open,
  onOpenChange,
  header,
  description,
  img,
}: ImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          p-4 sm:p-6
          bg-black/50 backdrop-blur-2xl
          border border-white/20 
          rounded-2xl
          shadow-[0_0_25px_rgba(0,0,0,0.35)]
          flex flex-col gap-5 text-white
        "
      >

        {/* Header */}
        <DialogHeader className="text-center space-y-1.5">
          <DialogTitle
            className="
              text-gray-100 font-semibold text-xl sm:text-2xl
              tracking-tight
            "
          >
            {header}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-gray-400 text-sm leading-snug">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Image Container */}
        <div
          className="
            relative overflow-hidden
            mx-auto
            w-[60vw] max-w-[300px]
            h-[60vw] max-h-[300px]
            rounded-xl
            border border-white/10
            bg-neutral-900/40
            animate-in fade-in
          "
        >
          {img ? (
            <Image
              src={img}
              alt={header}
              fill
              className="object-cover select-none"
              sizes="(max-width: 768px) 80vw, 500px"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300 text-sm">
              No Image
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
