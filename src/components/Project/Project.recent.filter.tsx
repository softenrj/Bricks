"use client"
import React from 'react'
import { Tooltip } from '../common/Tooltip'
import {
    ArrowUpDown, FolderPlus, Star, Archive, Download,
    Search,
    RefreshCcwDot
} from 'lucide-react'
import CreateNewProject from './Project.create.new'

function FilterOptions({
    extraOptions = false,
    fallback
}: { extraOptions: boolean, fallback: (type: string) => void }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleMode = () => setOpen(!open);
    return (
        <>
            <div className="flex flex-wrap gap-2 sm:gap-1.5">
                {extraOptions && <>
                    <Tooltip content="Start a new project">
                        <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-[#FD2787]/90 to-pink-500/80 text-white hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all" onClick={handleMode}>
                            <FolderPlus size={12} className="group-hover:rotate-6 transition-transform" />
                            <span>Create</span>
                        </button>
                    </Tooltip>

                    <div className="relative">
                        <Search
                            size={14}
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-7 pr-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-600/30 text-gray-200 focus:outline-none focus:border-pink-400/60 focus:ring-[0.2px] focus:ring-pink-400/100 transition"
                        />
                    </div>
                </>}


                <Tooltip content="Sort projects">
                    <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-amber-500/10 hover:to-yellow-500/10 hover:text-amber-300 hover:border-amber-500/20 transition-all">
                        <ArrowUpDown size={12} />
                        <span>Sort</span>
                    </button>
                </Tooltip>

                <Tooltip content="View starred projects">
                    <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-yellow-300 hover:border-yellow-400/20 transition-all">
                        <Star size={12} />
                        <span>Star</span>
                    </button>
                </Tooltip>

                {extraOptions &&
                    <Tooltip content="Archive old projects">
                        <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-red-500/10 hover:to-rose-500/10 hover:text-rose-300 hover:border-rose-500/20 transition-all">
                            <Archive size={12} />
                            <span>Archive</span>
                        </button>
                    </Tooltip>}

                <Tooltip content="Export project list">
                    <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-teal-500/10 hover:to-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/20 transition-all">
                        <Download size={12} />
                        <span>Export</span>
                    </button>
                </Tooltip>

                <Tooltip content="Load more project list">
                    <button onClick={() => fallback("LOADMORE")} className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-yellow-300 hover:border-yellow-400/20 transition-all">
                        <RefreshCcwDot size={12} />
                        <span>Load More</span>
                    </button>
                </Tooltip>

            </div>
            <CreateNewProject open={open} onClose={handleMode} /></>
    )
}

export default FilterOptions