// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import React from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { IComment } from "@/types/comment";
import { formatDistanceToNow } from "date-fns";

const getAvatarGradient = (id: string) => {
    const gradients = [
        "from-pink-500 to-rose-500",
        "from-indigo-500 to-blue-500",
        "from-emerald-500 to-teal-500",
        "from-orange-500 to-amber-500"
    ];
    const index = id ? id.charCodeAt(0) % gradients.length : 0;
    return gradients[index];
}

export const CommentItem = React.memo(({ comment }: { comment: IComment }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 group items-start"
        >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarGradient(comment._id || 'user')} p-[1px] mt-1`}>
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                    {comment.profile ? (
                        <Avatar className="h-full w-full">
                            <AvatarImage src={comment.profile} alt="User" className="object-cover" crossOrigin="anonymous" />
                            <AvatarFallback className="bg-zinc-800 text-[10px] text-zinc-400">
                                {comment.userName?.charAt(0).toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <User size={14} className="text-zinc-400" />
                    )}
                </div>
            </div>

            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300">
                        {comment?.userName || `User_${comment._id?.slice(-4) || 'Anon'}`}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                        {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : 'Just now'}
                    </span>
                </div>

                <div className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-3 rounded-2xl rounded-tl-none hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 break-words">
                    {comment.content}
                </div>

                <div className="flex gap-4 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="text-[10px] text-zinc-500 hover:text-indigo-400 font-medium transition-colors">Reply</button>
                    <button className="text-[10px] text-zinc-500 hover:text-pink-400 font-medium transition-colors">Like</button>
                </div>
            </div>
        </motion.div>
    )
});
CommentItem.displayName = "CommentItem";