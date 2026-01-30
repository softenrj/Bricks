// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import {
    Settings,
    FileText,
    Grid,
    Layers,
    Fan,
    User,
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
        color: "#daf512", // vibrant blue
        subItems: [
            { title: "Overview", href: "/dashboard", color: "#facc15" },
            { title: "Stats", href: "/dashboard?stats", color: "#16a34a" },
        ],
    },
    {
        title: "Projects",
        href: "/projects",
        icon: Layers,
        color: "#dd1944",
        subItems: [
            { title: "All Projects", href: "/projects", color: "#ef4444" },
            { title: "Starred", href: "/projects?starred", color: "#f59e0b" },
        ],
    },
    {
        title: "Documents",
        href: "/doc",
        icon: FileText,
        color: "#0ea5e9", // bright cyan
    },
    {
        title: "Events",
        href: "/events",
        icon: Fan,
        color: "#089e0a", // bright cyan
    },
    {
        title: "Account",
        href: "/account",
        icon: User,
        color: "#8a3beb", // Vo,
    },
];

function AppSideBarContent() {
    const tab = usePathname()
    const { open } = useSidebar();
    return (
        <div className="ml-4 mt-4 ">
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
