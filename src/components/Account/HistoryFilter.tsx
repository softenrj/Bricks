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
import { getAllProjectHistory, getAllUserHistory } from '@/service/api.history'
import autoTable from "jspdf-autotable";
import { useAppSelector } from '@/hooks/redux'

function HistoryFilter({
    fallback,
    filter,
    setFilter,
    mode = 'user',
    projectId = null
}: { extraOptions: boolean, fallback: (type: string) => void, filter: Partial<Filter>, setFilter: React.Dispatch<React.SetStateAction<Partial<Filter>>>, mode?: 'user' | 'project', projectId?: string | null }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const searchParams = useSearchParams();
    const action_create = !!searchParams.has("create_new");
    const [textQ, setTextQ] = React.useState<string>('');
    const textDebounce = useDebounce<string>(textQ, 200);
    const project = useAppSelector(state => state.fs);

    const handleExportPDF = async () => {
    const history = mode === 'user' ? await getAllUserHistory() : projectId && await getAllProjectHistory(projectId);

    if (!history || history.length === 0) {
        alert("No history found to export.");
        return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const colors = {
        dark: "#1a1a1a",       
        primary: "#FF5733",
        text: "#2C3E50",
        lightText: "#7F8C8D",
    };

    doc.setFillColor(colors.dark);
    doc.rect(0, 0, pageWidth, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("History Report", 14, 16);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200); 
    doc.setFont("helvetica", "normal");

    const contextTitle = mode === 'user' ? "User Activity Log" : `Project ID: ${projectId}`;
    doc.text(contextTitle, 14, 22);

    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 14, 16, { align: "right" });

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    
    let metaText = `Total Records: ${history.length}`;
    if (mode === 'project' && project) {
        metaText = `Project: ${project.projectName}   |   ${metaText}`;
    } else if (mode === 'user') {
        metaText = `User Report   |   ${metaText}`;
    }

    doc.text(metaText, 14, 32);

    const tableBody = history.map((item) => [
        item.type.toUpperCase(), 
        item.description,        
        new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ]);

    autoTable(doc, {
        head: [["Action Type", "Description", "Timestamp"]],
        body: tableBody,
        startY: 38,
        theme: 'grid',

        headStyles: {
            fillColor: colors.dark,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left',
            cellPadding: 4
        },

        styles: {
            fontSize: 10,
            cellPadding: 5,
            lineColor: [230, 230, 230],
            lineWidth: 0.1,
            valign: 'middle',
            font: "helvetica",
            textColor: [50, 50, 50]
        },

        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 35 }, 
            1: { textColor: [50, 50, 50] },
            2: { halign: 'right', cellWidth: 40, fontSize: 9, textColor: [100, 100, 100], fontStyle: 'italic' } // Date
        },

        alternateRowStyles: {
            fillColor: [250, 250, 250] 
        },

        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 0) {
                const { x, y, height } = data.cell;

                const rawType = (data.cell.raw ? String(data.cell.raw) : '').toLowerCase();

               
                let indicatorColor: [number, number, number] = [149, 165, 166]; 

                if (rawType.includes('create') || rawType.includes('add')) {
                    indicatorColor = [46, 204, 113];
                } else if (rawType.includes('delete') || rawType.includes('remove')) {
                    indicatorColor = [231, 76, 60]; 
                } else if (rawType.includes('update') || rawType.includes('edit')) {
                    indicatorColor = [52, 152, 219];
                }

                doc.setFillColor(...indicatorColor);
                doc.rect(x, y, 1.5, height, 'F');
            }
        },

        didDrawPage: (data) => {
            const footerY = pageHeight - 15;
            doc.setFontSize(10);
            doc.setTextColor(colors.primary);
            doc.setFont("helvetica", "bold");
            doc.text("Bricks AI", 14, footerY);

            doc.setTextColor(100, 100, 100);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Page ${data.pageNumber}`,
                pageWidth - 14,
                footerY,
                { align: "right" }
            );
        }
    });

    doc.save(`Bricks_History_${new Date().toISOString().split("T")[0]}.pdf`);
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
