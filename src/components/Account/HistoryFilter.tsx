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
import { getAllUserHistory } from '@/service/api.history'
import autoTable from "jspdf-autotable";

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
        const history = await getAllUserHistory();
        if (!history || history.length === 0) {
            alert("No history found to export.");
            return;
        }
        const doc = new jsPDF("p", "mm", "a4");
        const secondaryColor = "#2C3E50";
        const pageWidth = doc.internal.pageSize.width;

        doc.setFillColor(secondaryColor);
        doc.rect(0, 0, pageWidth, 20, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("User History Report", 14, 13);

        const dateStr = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated: ${dateStr}`, pageWidth - 14, 13, { align: "right" });

        const tableBody = history.map((item) => [
            item.type.toUpperCase(),
            item.description,
            new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString(),
        ]);

        autoTable(doc, {
            head: [["Type", "Description", "Created At"]],
            body: tableBody,
            startY: 25,
            theme: "grid",
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [220, 220, 220],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: secondaryColor,
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            columnStyles: {
                0: { fontStyle: "bold", cellWidth: 30 },
                1: { cellWidth: "auto" },
                2: { cellWidth: 40, halign: "right" },
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },

            didDrawPage: (data) => {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                const footerY = pageHeight - 15;

                doc.saveGraphicsState();

                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.setFont("helvetica", "bold");
                doc.text("Bricks AI", pageWidth / 2 - 16, footerY);

                doc.text(
                    "Page " + data.pageNumber,
                    data.settings.margin.left,
                    pageHeight - 10
                );

                doc.restoreGraphicsState();
            },
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
