"use client"

import React from 'react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from '../ui/context-menu'
import { TabCss } from './OpenedTabContext'
import { Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { deleteFolder } from '@/store/Reducers/fsSlice'
import { toggleDevServerRefresh } from '@/store/Reducers/IdeFeatures'

function FolderContext({children, path, projectId}: {children: React.ReactNode, projectId: string, path: string}) {
    const dispath = useAppDispatch();
    const hadleRemoveFolder = async () => {
        dispath(deleteFolder({path,projectId}))
        dispath(toggleDevServerRefresh());
    }
  return (
    <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>

        <ContextMenuContent className=" bg-[#1c1c1cf0] border-[#2d2d2d] text-white" >

        <ContextMenuItem
          className={TabCss}
          onClick={hadleRemoveFolder}
        >
          <Trash2 size={16} className="text-gray-300" />
          Delete
          <ContextMenuShortcut className="text-gray-300">⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default FolderContext