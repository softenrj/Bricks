"use client"
import React from 'react'
import { Tooltip } from '../common/Tooltip'
import {
    ArrowUpDown, FolderPlus, Star, Archive, Download,
    Search,
    RefreshCcwDot
} from 'lucide-react'
import CreateNewProject from './Project.create.new'
import { useSearchParams } from 'next/navigation'
import { exportProjects, Filter } from '@/service/api.project'
import { useDebounce } from '@/hooks/debounce'
import jsPDF from "jspdf";


function FilterOptions({
    extraOptions = false,
    fallback,
    filter,
    setFilter
}: { extraOptions: boolean, fallback: (type: string) => void, filter: Partial<Filter>, setFilter: React.Dispatch<React.SetStateAction<Partial<Filter>>> }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const searchParams = useSearchParams();
    const action_create = !!searchParams.has("create_new");
    const handleMode = () => setOpen(!open);
    const [textQ, setTextQ] = React.useState<string>('');
    const textDebounce = useDebounce<string>(textQ, 200);

    const handleExportPDF = async () => {
        const mode = filter.ach ? 'arch' : 'all';
        const projects = await exportProjects(mode); // your API data

        if (!projects || projects.length === 0) return;

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        let y = 10;

        pdf.setFontSize(16);
        pdf.text("Projects List", pageWidth / 2, y, { align: "center" });
        y += 10;

        pdf.setFontSize(10);
        projects.forEach((proj: any, idx: number) => {
            const text = `
${idx + 1}. ${proj.name}
   Description: ${proj.description}
   Tech: ${proj.tech_language}, Web: ${proj.web_technology}
   Starred: ${proj.starred ? "Yes" : "No"}, Archived: ${proj.archived ? "Yes" : "No"}
   Created At: ${new Date(proj.createdAt).toLocaleDateString()}
    `.trim();

            pdf.text(text, margin, y);
            y += 25; // spacing between projects

            // Add new page if needed
            if (y > pdf.internal.pageSize.getHeight() - 20) {
                pdf.addPage();
                y = 10;
            }
        });

        pdf.save("projects.pdf");
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
                            onChange={(e) => setTextQ(e.target.value)}
                        />
                    </div>
                </>}


                <Tooltip content="Sort projects">
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


                <Tooltip content="View starred projects">
                    <button
                        className={`group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium
      bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20
      hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-yellow-300 hover:border-yellow-400/20
      transition-all
      ${filter.att ? "from-yellow-500/10 to-yellow-400/10 text-yellow-300 border-yellow-400/20" : ""}`}
                        onClick={() =>
                            filter.att
                                ? filter.att === true
                                    ? setFilter((prev) => ({ ...prev, att: false }))
                                    : setFilter((prev) => ({ ...prev, att: true }))
                                : setFilter((prev) => ({ ...prev, att: true }))
                        }
                    >
                        <Star size={12} />
                        <span>Star</span>
                    </button>
                </Tooltip>


                <Tooltip content="Export project list">
                    <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-teal-500/10 hover:to-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/20 transition-all"
                        onClick={handleExportPDF}>
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