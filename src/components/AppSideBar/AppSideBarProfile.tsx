"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";

export default function AppSideBarProfile() {
  const { open } = useSidebar();

  return (
    <div
      className={`
        p-2 px-4 mb-3 flex items-center gap-3 rounded-xl 
        transition-all duration-300
        ${open ? "glass-card shadow-lg w-54" : "hover:bg-[#2a2b30]/70 hover:shadow-md"}
      `}
    >
      <Avatar className="h-10 w-10 ring-2 ring-blue-500/50 shadow-sm transition-all duration-300">
        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVsZ4Il2r8DBJZ0O79S9zkdeNEUtK34XvkA&s" />
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>

      {open && (
        <h2 className="text-lg font-semibold text-gray-200 whitespace-nowrap transition-all duration-300">
          Raj Sharma
        </h2>
      )}
    </div>
  );
}
