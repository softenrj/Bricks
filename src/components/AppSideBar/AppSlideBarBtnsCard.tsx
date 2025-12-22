// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import Link from "next/link";
import { Tooltip } from "../common/Tooltip";
import { ChevronDown } from "lucide-react";
import { AppSideBarItems } from "../../../types/sidebarItems";

interface Props {
  item: AppSideBarItems;
  index: number;
  tab: string;
  open: boolean;
}

function AppSlideBarBtnsCard({ item, index, tab, open }: Props) {
  const [isOpen, setIsOpen] = React.useState(true); // individual state per item

  return (
    <Collapsible
      key={index}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible mb-1 sm:mb-2"
    >
      <SidebarMenuItem>
        {/* Main Item */}
        <div
          className={`flex items-center justify-between w-fit min-w-[80%] rounded-md ${
            tab === item.href ? "glass-card" : ""
          }`}
        >
          <Link
            className="cursor-pointer flex-1"
            href={item.href}
          >
            <div className="flex items-center gap-2 px-3 py-2">
              {/* Icon with glow + tooltip */}
              <Tooltip content={item.title} show={!open}>
                <item.icon
                  color={item.color}
                  className="flex-shrink-0"
                  size={20}
                />
              </Tooltip>
              {open && (
                <p className="text-sm sm:text-base text-gray-100 font-medium truncate">
                  {item.title}
                </p>
              )}
            </div>
          </Link>

          {/* Chevron with smooth rotation */}
          {open && item.subItems && (
            <CollapsibleTrigger asChild>
              <ChevronDown
                size={16}
                className={`mr-2 text-gray-300 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </CollapsibleTrigger>
          )}
        </div>

        {/* Sub Items */}
        <CollapsibleContent>
          {item.subItems && (
            <SidebarMenuSub className="ml-6 sm:ml-7 mt-1.5 sm:mt-2">
              {item.subItems.map((sub, subIndex) => {
                const isActive = tab === sub.href;
                return (
                  <Link key={subIndex} href={sub.href}>
                    <SidebarMenuSubItem
                      className={`relative flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors ${
                        isActive ? "text-white font-medium" : ""
                      }`}
                    >
                      <p className="text-xs sm:text-sm truncate">{sub.title}</p>
                      {isActive && (
                        <span className="ml-1 h-1 w-1 rounded-full bg-pink-500 shadow-[0_0_3px_0.5px_rgba(236,72,153,0.7)]" />
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

export default AppSlideBarBtnsCard;
