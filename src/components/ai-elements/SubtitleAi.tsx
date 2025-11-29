// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Tooltip } from '../common/Tooltip'

function SubtitleAi() {
    return (
        <div className="w-fit max-w-[620px] absolute top-20 left-1/2 -translate-x-1/2 
                bg-[#1f1f1f]/80 text-gray-300 p-3 rounded-md 
                border border-[#2d2d2d] shadow-sm hover:shadow-md">

            <div className="flex items-start gap-3">
                <p className="leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Amet ut non nostrum atque architecto ipsam exercitationem
                    quas dolores nesciunt porro laborum.
                </p>

                <Tooltip content='Run'>
                    <button className="inline-flex items-center justify-center 
                       shrink-0 w-6 h-6 
                       border border-gray-500 rounded-full 
                       hover:bg-gray-700/40 transition">
                    <ChevronRight size={14} />
                </button>
                </Tooltip>
            </div>

        </div>
    )
}

export default SubtitleAi