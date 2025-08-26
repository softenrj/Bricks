"use client"
import {
    Settings,
    FileText,
    Grid,
    Layers,
} from "lucide-react"
import React from "react"
import {
    SidebarMenu,
    useSidebar,
} from "../ui/sidebar"

import { usePathname } from "next/navigation"
import { AppSideBarItems } from "../../../types/sidebarItems"
import AppSlideBarBtnsCard from "./AppSlideBarBtnsCard"

// Dummy sidebar data with different icons
const sidebarItems: AppSideBarItems[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Grid, // unique alternative to Home
        color: "#2563eb", // vibrant blue
        subItems: [
            { title: "Overview", href: "/dashboard", color: "#facc15" },
            { title: "Stats", href: "/dashboard/stats", color: "#16a34a" },
        ],
    },
    {
        title: "Projects",
        href: "/projects",
        icon: Layers,
        color: "#7c3aed",
        subItems: [
            { title: "All Projects", href: "/projects", color: "#ef4444" },
            { title: "Starred", href: "/projects/starred", color: "#f59e0b" },
        ],
    },
    {
        title: "Documents",
        href: "/doc",
        icon: FileText,
        color: "#0ea5e9", // bright cyan
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        color: "#f472b6", // soft pink
    },
];

function AppSideBarContent() {
    const tab = usePathname()
    const { open } = useSidebar();
    return (
        <div className="ml-4 mt-4">
            <SidebarMenu>
                {sidebarItems.map((item, index) => (
                    <AppSlideBarBtnsCard
                        key={item.href || index}
                        item={item}
                        index={index}
                        open={open}
                        tab={tab}
                    />
                ))}
            </SidebarMenu>
        </div>
    )
}

export default AppSideBarContent
