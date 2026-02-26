// Copyright (c) 2025 Raj 
// See LICENSE for details.
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
import autoTable from "jspdf-autotable";
import { Project } from '@/types/project'

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
        const projects: Project[] | null = await exportProjects(mode);

        if (!projects || projects.length === 0) {
            alert("No projects found to export.");
            return;
        }

        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        const primaryColor = "#FF5733"; 
        const darkColor = "#1a1a1a"; 

        doc.setFillColor(darkColor);
        doc.rect(0, 0, pageWidth, 25, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Project Portfolio", 14, 16);

        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.setFont("helvetica", "normal");
        const reportType = mode === 'arch' ? "Archived Projects Report" : "Full Project Overview";
        doc.text(reportType, 14, 22);

        doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 14, 16, { align: "right" });

        const tableBody = projects.map((proj) => {
            const status: string[] = [];
            if (proj.starred) status.push("★ Starred");
            if (proj.archived) status.push("Archived");
            const statusText = status.length > 0 ? status.join(" | ") : "Active";

            const techStack = [proj.tech_language, proj.web_technology]
                .filter(Boolean)
                .join(", ");

            return [
                proj.name,
                techStack,
                statusText,
                new Date(proj.createdAt).toLocaleDateString()
            ];
        });

        autoTable(doc, {
            head: [["Project Name", "Tech Stack", "Status", "Created"]],
            body: tableBody,
            startY: 30,
            theme: 'grid',

            headStyles: {
                fillColor: darkColor,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'left'
            },
            styles: {
                fontSize: 10,
                cellPadding: 4,
                lineColor: [230, 230, 230],
                lineWidth: 0.1,
                valign: 'middle'
            },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [33, 33, 33] }, 
                1: { textColor: [74, 144, 226] }, 
                2: { fontSize: 8, fontStyle: 'italic' }, 
                3: { halign: 'right', cellWidth: 30 } 
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250] 
            },


            didDrawCell: (data) => {
               
                if (data.section === 'body' && data.column.index === 0) {
                    const rawRow = projects[data.row.index];
                    if (rawRow && rawRow.starred) {
                        const { x, y, height } = data.cell;
                        doc.setFillColor(255, 215, 0); 
                        doc.rect(x, y, 1.5, height, 'F'); 
                    }
                }
            },

            didDrawPage: (data) => {
                const footerY = pageHeight - 15;
                doc.setFontSize(10);
                doc.setTextColor(primaryColor);
                doc.setFont("helvetica", "bold");
                doc.text("Bricks AI", 14, footerY + 2);

                doc.setFont("helvetica", "normal");
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Page ${data.pageNumber}`,
                    pageWidth - 14,
                    footerY + 2,
                    { align: "right" }
                );
            }
        });

        doc.save(`Bricks_Projects_${new Date().toISOString().split('T')[0]}.pdf`);
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
                {extraOptions &&
                    <Tooltip content="Start a new project">
                        <button className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-[#FD2787]/90 to-pink-500/80 text-white hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all" onClick={handleMode}>
                            <FolderPlus size={12} className="group-hover:rotate-6 transition-transform" />
                            <span>Create</span>
                        </button>
                    </Tooltip>
                }

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