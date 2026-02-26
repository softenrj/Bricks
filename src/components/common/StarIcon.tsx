// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from 'react'
import { Tooltip } from './Tooltip';
import { Star } from 'lucide-react';

function StarIcon({ isStarred, handleStarClick }: { isStarred: boolean; handleStarClick: () => void; }) {
    return (
        <div className='absolute right-2 top-2'>
            <Tooltip
                content={isStarred ? "Remove from favorites" : "Add to favorites"}
            >
                <button
                    onClick={handleStarClick}
                    className={`group relative overflow-hidden rounded-md px-2 py-0.5 text-[10px] font-medium transition-all duration-300 active:scale-95 ${isStarred
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10"
                        : "bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 border border-gray-600/30 hover:from-amber-500/10 hover:to-yellow-500/10 hover:text-amber-300 hover:border-amber-500/20"
                        }`}
                >
                    <div className="flex items-center gap-1">
                        <Star
                            size={11}
                            className={`transition-all duration-300 ${isStarred
                                ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                                : "group-hover:scale-110 group-hover:rotate-12"
                                }`}
                        />
                        {isStarred ? "Starred" : "Star"}
                    </div>

                    {/* Shimmer effect */}
                    {isStarred && (
                        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    )}
                </button>
            </Tooltip>
        </div>
    )
}

export default StarIcon