// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { Tooltip } from "../common/Tooltip";

export default function AppSideBarProfile() {
  const { open } = useSidebar();
  const user = useAppSelector(state => state.user);

  return (
    <div
      className={`
        p-2 px-4 mb-3 flex items-center gap-3 rounded-xl 
        transition-all duration-300
        ${open ? "glass-card shadow-lg w-54" : "hover:bg-[#2a2b30]/70 hover:shadow-md"}
      `}
    >
      <Avatar className="h-10 w-10 ring-2 ring-blue-500/50 shadow-sm transition-all duration-300">
        <AvatarImage src={user.profile || "https://avatars.githubusercontent.com/u/149652817?v=4"} />
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>

      {open && (
        <div>
          <h2 className="text-lg font-semibold text-gray-200 whitespace-nowrap transition-all duration-300">
            {user.username}
          </h2>
          <Tooltip content={user.email || ""}>
            <p className="text-gray-400 text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[135px]">
            {user.email}
          </p>
          </Tooltip>

        </div>
      )}
    </div>
  );
}
