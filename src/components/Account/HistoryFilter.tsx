// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import { Tooltip } from '../common/Tooltip'
import {
    ArrowUpDown, Download,
    Search,
    RefreshCcwDot
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { exportProjects, Filter } from '@/service/api.project'
import { useDebounce } from '@/hooks/debounce'
import jsPDF from "jspdf";


function HistoryFilter({
    fallback,
    filter,
    setFilter
}: { extraOptions: boolean, fallback: (type: string) => void, filter: Partial<Filter>, setFilter: React.Dispatch<React.SetStateAction<Partial<Filter>>> }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const searchParams = useSearchParams();
    const action_create = !!searchParams.has("create_new");
    const [textQ, setTextQ] = React.useState<string>('');
    const textDebounce = useDebounce<string>(textQ, 200);

    const handleExportPDF = async () => {

    };


    const handleSearch = (): void => setFilter(prev => ({ ...prev, q: textQ }));
    React.useEffect(handleSearch, [textDebounce])

    React.useEffect(() => {
        if (action_create) {
            setOpen(true);
        }
    }, [action_create]);
    return (
        <>
            <div className="flex flex-wrap gap-2 sm:gap-1.5 my-2 self-end">

                <div className="relative">
                    <Search
                        size={14}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search History"
                        className="pl-7 pr-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-gray-700/40 to-gray-600/40 border border-gray-600/30 text-gray-200 focus:outline-none focus:border-pink-400/60 focus:ring-[0.2px] focus:ring-pink-400/100 transition"
                        onChange={(e) => setTextQ(e.target.value)}
                    />
                </div>


                <Tooltip content="Sort History">
                    <button
                        className={`group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium
      bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20
      hover:from-green-500/10 hover:to-green-400/10 hover:text-green-300 hover:border-green-400/20
      transition-all
      ${filter.sort === 'asc' ? "from-green-500/10 to-green-400/10 text-green-300 border-green-400/20" : ""}`}
                        onClick={() =>
                            filter.sort
                                ? filter.sort === "asc"
                                    ? setFilter((prev) => ({ ...prev, sort: "dsc" }))
                                    : setFilter((prev) => ({ ...prev, sort: "asc" }))
                                : setFilter((prev) => ({ ...prev, sort: "dsc" }))
                        }
                    >
                        <ArrowUpDown size={12} />
                        <span>Sort</span>
                    </button>
                </Tooltip>

                <Tooltip content="Export project list">
                    <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-teal-500/10 hover:to-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/20 transition-all"
                        onClick={handleExportPDF}>
                        <Download size={12} />
                        <span>Export</span>
                    </button>
                </Tooltip>

                <Tooltip content="Load more History">
                    <button onClick={() => fallback("LOADMORE")} className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-yellow-300 hover:border-yellow-400/20 transition-all">
                        <RefreshCcwDot size={12} />
                        <span>Load More</span>
                    </button>
                </Tooltip>
            </div>
        </>
    )
}

export default HistoryFilter
