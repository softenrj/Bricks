"use client"
import {
    Star,
    Calendar,
    Settings,
    Inbox,
    Home,
    Users,
    Folder,
} from "lucide-react"
import React from "react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "../ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible"
import { usePathname } from "next/navigation"

// Dummy sidebar data with different icons
const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        color: "#3b82f6", // blue
        subItems: [
            { title: "Overview", href: "/dashboard/overview", icon: Star, color: "#facc15" }, // yellow
            { title: "Stats", href: "/dashboard/stats", icon: Calendar, color: "#10b981" }, // green
        ],
    },
    {
        title: "Projects",
        href: "/projects",
        icon: Folder,
        color: "#8b5cf6", // purple
        subItems: [
            { title: "All Projects", href: "/projects", icon: Star, color: "#ef4444" }, // red
            { title: "Starred", href: "/projects/starred", icon: Star, color: "#f59e0b" }, // orange
        ],
    },
    {
        title: "Messages",
        href: "/messages",
        icon: Inbox,
        color: "#06b6d4", // cyan
        subItems: [
            { title: "Inbox", href: "/messages/inbox", icon: Inbox, color: "#3b82f6" },
            { title: "Archived", href: "/messages/archived", icon: Inbox, color: "#9ca3af" }, // gray
        ],
    },
    {
        title: "Team",
        href: "/team",
        icon: Users,
        color: "#22c55e", // green
        subItems: [
            { title: "Members", href: "/team/members", icon: Users, color: "#3b82f6" },
            { title: "Roles", href: "/team/roles", icon: Settings, color: "#f97316" }, // orange
        ],
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        color: "#f87171", // pink/red
        subItems: [
            { title: "Profile", href: "/settings/profile", icon: Star, color: "#10b981" },
            { title: "Billing", href: "/settings/billing", icon: Star, color: "#ef4444" },
        ],
    },
]

function AppSideBarContent() {
    const tab = usePathname()
    console.log(tab)
    return (
        <div className="ml-4 mt-4">
            <SidebarMenu>
                {sidebarItems.map((item, index) => (
                    <Collapsible key={index} defaultOpen className="group/collapsible mb-2">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <a className="cursor-pointer" href={item.href}>
                                    <div className="ml-2 text-white">
                                        <div
                                            className={`flex items-center gap-2 px-3 py-1 rounded-lg w-fit ${tab === item.href ? "glass-card" : ""
                                                }`}
                                        >
                                            <item.icon color={item.color} className="svg-glow" />
                                            <p className="text-lg">{item.title}</p>
                                        </div>
                                    </div>
                                </a>

                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <SidebarMenuSub className="ml-7 mt-2">
                                    {item.subItems.map((sub, subIndex) => {
                                        const isActive = tab === sub.href;

                                        return (
                                            <a key={subIndex} className="cursor-pointer w-full" href={sub.href}>
                                                <SidebarMenuSubItem
                                                    className={`relative text-gray-300 flex gap-2 items-center pr-5 
          ${isActive ? "text-white font-medium" : ""}`}
                                                >
                                                    <sub.icon size={14} color={sub.color} className="svg-glow" />
                                                    <p className="text-sm">{sub.title}</p>

                                                    {/* Pink dot on the right */}
                                                    {isActive && (
                                                        <span className="absolute right-0 h-1 w-1 rounded-full bg-pink-500 shadow-[0_0_6px_2px_rgba(236,72,153,0.8)]" />
                                                    )}
                                                </SidebarMenuSubItem>
                                            </a>
                                        );
                                    })}

                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </div>
    )
}

export default AppSideBarContent
