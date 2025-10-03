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
  Download,
  RefreshCw,
} from "lucide-react"

export function FileContext({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-50 rounded-lg p-1 bg-[#1f1f21] text-sm text-gray-200 shadow-lg border border-gray-700">
        {/* Core Actions */}
        <ContextMenuItem
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <FilePlus size={16} />
          Add File
          <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <FolderPlus size={16} />
          Add Folder
          <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator className="bg-gray-700" />

        {/* Edit / File Management */}
        <ContextMenuItem
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <Pencil size={16} />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          className="flex items-center gap-2 rounded-md text-red-400
                     data-[highlighted]:bg-red-600/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <Trash2 size={16} />
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator className="bg-gray-700" />

        {/* Utility */}
        <ContextMenuItem
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <Download size={16} />
          Download
        </ContextMenuItem>

        <ContextMenuItem
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
        >
          <RefreshCw size={16} />
          Refresh
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
