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

interface Prope { children: React.ReactNode,
  onRename: (path: string, name: string) => void;
  onRemove: (fullPath: string, name: string) => void;
  path: string;
  name: string;
 }

export function FileContext({ children, onRename, onRemove, path, name }: Prope) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-40 rounded-md p-1 bg-[#1f1f21] text-sm text-gray-300 shadow-lg border border-gray-700">
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
          onClick={() => onRename(path, name)}
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
          onClick={() => onRemove(path, name)}
        >
          <Trash2 size={16} />
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
