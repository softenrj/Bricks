"use client"
import {
  Tooltip as ToolTipComp,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

type AppTooltipProps = {
  children: React.ReactNode
  content: string
  show?: boolean
}

export function Tooltip({ children, content, show=true }: AppTooltipProps) {
  return (
    <ToolTipComp>
      <TooltipTrigger asChild className="cursor-pointer">
        {children}
      </TooltipTrigger>
      {
        show && <TooltipContent className="bg-black">
        <p>{content}</p>
      </TooltipContent>
      }
    </ToolTipComp>
  )
}
