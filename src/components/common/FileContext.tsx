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
          className="flex items-center gap-2 rounded-md 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
          onClick={onNewFile}
        >
          <FilePlus size={16} />
          Add File
          <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          className="flex items-center gap-2 rounded-sm 
                     data-[highlighted]:bg-gray-700/70 
                     data-[highlighted]:text-white 
                     focus:outline-none"
          onClick={onNewFolder}
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
