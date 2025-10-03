import { CloudDownload, FileSymlink, FolderSymlink } from 'lucide-react'
import React from 'react'
import { Tooltip } from '../common/Tooltip'

function FScontroller() {
  return (
    <div className="mx-3 my-1 flex justify-between items-center group">
      <p className="text-white truncate text-sm sm:text-xs max-w-[100px]">
        Ai chatbot
      </p>
      <div className="text-[#a2a2a2] gap-2 opacity-0 hidden group-hover:opacity-100 group-hover:flex transition-opacity duration-200">
        <Tooltip content="download">
          <CloudDownload size={16} />
        </Tooltip>
        <Tooltip content="Add file">
          <FileSymlink size={16} />
        </Tooltip>
        <Tooltip content="Add folder">
          <FolderSymlink size={16} />
        </Tooltip>
      </div>
    </div>
  )
}

export default FScontroller
