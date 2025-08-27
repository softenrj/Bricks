"use client"
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible"
import { SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from '../ui/sidebar';
import Link from 'next/link';
import { Tooltip } from '../common/Tooltip';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AppSideBarItems } from '../../../types/sidebarItems';

interface Props {
    item: AppSideBarItems,
    index: number,
    tab: string,
    open: boolean,
}
function AppSlideBarBtnsCard({ item, index, tab, open}: Props) {
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
                    {open && item.subItems && <CollapsibleTrigger asChild>
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
}

export default AppSlideBarBtnsCard