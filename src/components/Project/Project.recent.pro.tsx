// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import StarIcon from '../common/StarIcon';
import { Tooltip } from '../common/Tooltip';
import { Badge } from '../ui/badge';

function RecentlyWorkedProject() {
  const [isStarred, setIsStarred] = React.useState(false);

    const handleStarClick = () => {
        setIsStarred(!isStarred);
    };

    return (
        <div>
            <div>
                <p></p>
            </div>
            <div className="bg-[#1f1f1f]/80 p-3 rounded-md w-full max-w-[380px] relative shadow-sm hover:shadow-md border border-[#2d2d2d]">
            {/* Top Icon */}
            <div className="bg-[#2c2c2c] p-1.5 rounded-md w-fit border border-[#FD2787] absolute -top-4 left-4 shadow-sm">
                <Image src="/icons/nextdotjs.svg" alt="next-js" width={22} height={22} />
            </div>

            {/* Header */}
            <div className="mt-5 flex justify-between items-start">
                {/* Title */}
                <p className="text-sm sm:text-base text-gray-100 font-semibold leading-snug pr-2">
                    Simple Todo App
                </p>

                {/* Right controls */}
                <Ellipsis
                    className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                    size={16}
                />

                {/* Star Button */}
                <StarIcon isStarred={isStarred} handleStarClick={handleStarClick} />
            </div>

            {/* Description */}
            <p className="mt-1 text-[11px] text-gray-300 leading-snug line-clamp-2">
                React-based todo app where you can add, remove, and delete tasks with a
                timer.
            </p>

            {/* Tech Icons */}
            <div className="flex gap-1.5 mt-2">
                <Image src={"/icons/react.svg"} width={14} height={14} alt="React" />
                <Image src={"/icons/typescript.svg"} width={14} height={14} alt="TypeScript" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3">
                <div className="flex flex-wrap gap-1">
                    <Tooltip content="React">
                        <Badge variant={"destructive"} className="text-[10px] px-2 py-0.5">
                            React
                        </Badge>
                    </Tooltip>
                    <Tooltip content="Next.js">
                        <Badge
                            variant={"default"}
                            className="text-[10px] rounded-full px-2 py-0.5"
                        >
                            Next.js
                        </Badge>
                    </Tooltip>
                </div>
                <p className="text-gray-400 text-[10px] whitespace-nowrap">2d ago</p>
            </div>
        </div>
        </div>
    );
}

export default RecentlyWorkedProject