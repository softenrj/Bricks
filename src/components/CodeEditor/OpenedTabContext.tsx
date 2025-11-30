// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"

import React from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { useAppDispatch } from "@/hooks/redux";
import { closeAll, closeOher, closeSaved, closeTab, closeToRight } from "@/store/Reducers/fsSlice";

export const TabCss = "flex items-center gap-2 rounded-md px-2 data-[highlighted]:bg-white/5 data-[highlighted]:text-gray-100 focus:outline-none";

function OpenedTabContext({ children, name }: { children: React.ReactNode, name: string | undefined }) {
    const dispatch = useAppDispatch();
  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-full">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent
        className="
          bg-[#1c1c1cf0]
          border border-[#2d2d2d]
          text-white
          rounded-md
          min-w-[160px]
          shadow-lg
        "
      >
        {/* Core Actions */}
        <ContextMenuItem
          className={TabCss}
          onClick={() => name && dispatch(closeTab(name))}
        >
          Close
        </ContextMenuItem>

        <ContextMenuItem
          className={TabCss}
          onClick={() => dispatch(closeOher(name))}
        >
          Close Other
        </ContextMenuItem>

        {/* Edit / File Management */}
        <ContextMenuSeparator className="bg-[#383838]" />

        <ContextMenuItem
          className={TabCss}
          onClick={() => dispatch(closeToRight(name))}
        >
          Close to the Right
        </ContextMenuItem>

        <ContextMenuItem
          className={TabCss}
          onClick={() => dispatch(closeSaved(name))}
        >
          Close Saved
        </ContextMenuItem>

        <ContextMenuItem
          className={TabCss}
          onClick={() => dispatch(closeAll())}
        >
          Close All
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default OpenedTabContext
