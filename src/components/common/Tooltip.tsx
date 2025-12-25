// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
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
  triggClass?: string
} & React.HtmlHTMLAttributes<HTMLDivElement>

export function Tooltip({ children, content, show=true, triggClass,  ...probe}: AppTooltipProps) {
  return (
    <ToolTipComp {...probe}>
      <TooltipTrigger asChild className={`${triggClass ? triggClass : "cursor-pointer"}`}>
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
