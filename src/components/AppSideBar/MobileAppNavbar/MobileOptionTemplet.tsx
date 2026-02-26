// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function MobileOptionTemplet({ href, Icon, name, onClose }: { href: string, Icon: LucideIcon, name: string, onClose: () => void }) {
    return (
        <Link href={href}>
            <div
                className="inline-flex gap-2 w-fit items-center bg-white/10 backdrop-blur-md px-3 py-2 cursor-pointer rounded-2xl  text-white  border border-white/20  shadow-md  transition-all duration-200  active:scale-95 hover:bg-white/20" onClick={onClose}>
                <Icon className="w-5 h-5 mb-1" />
                <p className="text-xs font-medium tracking-wide">{name}</p>
            </div>
        </Link>
    );
}

export default MobileOptionTemplet;
