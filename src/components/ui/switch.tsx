"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-3 w-6 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "bg-gray-300 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-pink-400",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-2 w-2 rounded-full bg-white shadow transition-transform",
          "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}


export { Switch }
