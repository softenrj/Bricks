// See LICENSE for details.
"use client";

import React from "react";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { AuthProvider } from "@/service/util.auth";

function AccountSettingMenu({ open, onOpenChange, children, edit }: { open: boolean,onOpenChange: (open: boolean) => void, children: React.ReactNode, edit: () => void }) {
  const handleLogOut = () => AuthProvider.logOut();
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className=" w-10 bg-[#1c1c1cf0] border-[#2d2d2d] text-white"
      >
        {/* Edit */}
        <DropdownMenuItem onClick={edit}>
          <Settings size={14} />
          Edit Details
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut size={14} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountSettingMenu;
