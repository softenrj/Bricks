"use client"
import { CloudDownload, CodeXml, FileSymlink, FolderSymlink, GitPullRequestClosed } from 'lucide-react'
import React from 'react'
import { Tooltip } from '../common/Tooltip'
import { useAppSelector } from '@/hooks/redux'
import { downLoadProject } from '@/feature/projectDownload'

interface Probe {
  onNewFile: () => void;
  onNewFolder: () => void;
  onFolderCollapse: () => void;
}
function FScontroller({ onNewFile, onNewFolder, onFolderCollapse }: Probe) {
  const projectName = useAppSelector(state => state.fs).projectName;
  const fs = useAppSelector(state => state.fs).tree
  const handleDownload = async () => await downLoadProject(projectName, fs);
  return (
    <div className="mx-3 my-1 flex justify-between items-center group">
      <Tooltip content='project name'>
        <p className="flex items-center gap-1 truncate text-sm text-gray-300 max-w-[100px] sm:text-xs" title={projectName}>
        <CodeXml color="#ff00ff" size={12} />
        <span className="truncate">{projectName}</span>
      </p>
      </Tooltip>

      <div className="text-[#a2a2a2] gap-2 opacity-0 hidden group-hover:opacity-100 group-hover:flex transition-opacity duration-200">
        <Tooltip content="download">
          <CloudDownload size={16} onClick={handleDownload} />
        </Tooltip>
        <Tooltip content="Add file">
          <FileSymlink size={16} onClick={() => onNewFile()} />
        </Tooltip>
        <Tooltip content="Add folder">
          <FolderSymlink size={16} onClick={() => onNewFolder()} />
        </Tooltip>
        <Tooltip content="Collapse Folders">
          <GitPullRequestClosed size={16} onClick={onFolderCollapse} />
        </Tooltip>
      </div>
    </div>
  )
}

export default FScontroller
