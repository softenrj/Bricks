"use client"
import {
    Settings,
    FileText,
    Grid,
    Layers,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import React from "react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "../ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible"
import { usePathname } from "next/navigation"
import { Tooltip } from "../common/Tooltip"
import Link from "next/link"

// Dummy sidebar data with different icons
const sidebarItems = [
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
                {sidebarItems.map((item, index) => {
                    const [isOpen, setIsOpen] = React.useState(true); // individual state per item

                    return (
                        <Collapsible
                            key={index}
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="group/collapsible mb-2"
                        >
                            <SidebarMenuItem>
                                <div className={`flex items-center w-fit pr-2 ${tab === item.href ? "glass-card" : ""}`}>
                                    <Link className="cursor-pointer" href={item.href}>
                                        <div className="ml-0 text-white">
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg w-fit">
                                                <Tooltip content={item.title} show={!open}>
                                                    <item.icon color={item.color} className="svg-glow" />
                                                </Tooltip>
                                                {open && <p className="text-lg">{item.title}</p>}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Rotate Chevron based on individual collapsible */}
                                   {item.subItems &&  <CollapsibleTrigger asChild>
                                        {isOpen ? <ChevronUp size={14} color="white" /> : <ChevronDown size={14} color="white" />}
                                    </CollapsibleTrigger>}
                                </div>

                                <CollapsibleContent>
                                    {item.subItems && (
                                        <SidebarMenuSub className="ml-7 mt-2">
                                            {item.subItems.map((sub, subIndex) => {
                                                const isActive = tab === sub.href;
                                                return (
                                                    <Link key={subIndex} href={sub.href}>
                                                        <SidebarMenuSubItem
                                                            className={`relative text-gray-400 flex gap-2 items-center pr-5 ${isActive ? "text-white font-medium" : ""
                                                                }`}
                                                        >
                                                            <p className="text-sm">{sub.title}</p>
                                                            {isActive && (
                                                                <span className="ml-2 mt-1 h-1 w-1 rounded-full bg-pink-600 shadow-[0_0_3px_0.2px_rgba(236,72,153,0.8)]" />
                                                            )}
                                                        </SidebarMenuSubItem>
                                                    </Link>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    )}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </div>
    )
}

export default AppSideBarContent
