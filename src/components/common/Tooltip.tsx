import {
  Tooltip as ToolTipComp,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

type AppTooltipProps = {
  children: React.ReactNode
  content: string
}

export function Tooltip({ children, content }: AppTooltipProps) {
  return (
    <ToolTipComp>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </ToolTipComp>
  )
}
