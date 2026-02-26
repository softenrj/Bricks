// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  FilePlus,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react"
import { TabCss } from "./OpenedTabContext";

interface Prope { children: React.ReactNode,
  onRename: (path: string, name: string) => void;
  onRemove: (fullPath: string, name: string) => void;
  onNewFile: () => void;
  onNewFolder: () => void;
  path: string;
  name: string;
 }

export function FileContext({ children, onRename, onRemove, path, name, onNewFile, onNewFolder }: Prope) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className=" bg-[#1c1c1cf0] border-[#2d2d2d] text-white" >
        {/* Core Actions */}
        <ContextMenuItem
          className={TabCss}
          onClick={onNewFile}
        >
          <FilePlus size={16} className="text-gray-300" />
          Add File
        </ContextMenuItem>

        <ContextMenuItem
         className={TabCss}
          onClick={onNewFolder}
        >
          <FolderPlus size={16} className="text-gray-300" />
          Add Folder
        </ContextMenuItem>

        <ContextMenuSeparator className="bg-gray-700" />

        {/* Edit / File Management */}
        <ContextMenuItem
          className={TabCss}
          onClick={() => onRename(path, name)}
        >
          <Pencil size={16} className="text-gray-300" />
          Rename
          <ContextMenuShortcut className="text-gray-300">⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          className={TabCss}
          onClick={() => onRemove(path, name)}
        >
          <Trash2 size={16} className="text-gray-300" />
          Delete
          <ContextMenuShortcut className="text-gray-300">⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
