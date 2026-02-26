// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"
import React, { useState, useRef, useEffect } from 'react' 
import { motion, AnimatePresence } from "motion/react"
import { useComment, useAddComment } from '@/service/api.event'
import { BType, IComment } from '@/types/comment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Send, MessageCircle, Loader2 } from 'lucide-react'
import { CommentItem } from './EventCommentItem'

function EventCommentSection({ fallback, open, eventId }: { fallback: () => void, open: boolean, eventId: string }) {

    const [inputValue, setInputValue] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling
    const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the container

    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = useComment('asc', eventId, BType.EVENT)

    const { mutate: addComment, isPending } = useAddComment(BType.EVENT, eventId);

    const allComments = React.useMemo<IComment[]>(() => {
        if (!data) return []
        return data.pages.flatMap(page => page?.data ?? [])
    }, [data])


    useEffect(() => {
        if (bottomRef.current) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 100);
        }
    }, [allComments.length]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        addComment({ content: inputValue });
        setInputValue("");

        setTimeout(() => {
             bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="comment-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.4 }}
                    className="overflow-hidden bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl mt-2"
                >
                    <div className="flex flex-col h-full">

                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-2">
                                <MessageCircle size={16} className="text-indigo-400" />
                                <h3 className="text-zinc-100 font-semibold text-sm tracking-wide">
                                    Discussion 
                                    <span className="text-zinc-500 font-normal ml-1">
                                        {allComments.length > 0 ? allComments.length : ''}
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <div
                            id="comment-scroll-container"
                            ref={scrollContainerRef}
                            className="max-h-[400px] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent scroll-smooth"
                        >
                            <InfiniteScroll
                                dataLength={allComments.length}
                                next={fetchNextPage}
                                hasMore={!!hasNextPage}
                                scrollableTarget="comment-scroll-container"
                                loader={
                                    <div className="py-6 flex justify-center gap-2">
                                        <Loader2 className="animate-spin text-indigo-500" size={20} />
                                    </div>
                                }
                                endMessage={
                                    allComments.length > 5 && (
                                        <div className="py-8 flex flex-col items-center gap-2 opacity-50">
                                            <div className="w-12 h-[1px] bg-zinc-700"></div>
                                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">End of Discussion</span>
                                        </div>
                                    )
                                }
                            >
                                <div className="flex flex-col p-4 gap-4">
                                    {allComments.length === 0 ? (
                                        <div className="text-center py-10 text-zinc-500 text-sm flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                                <MessageCircle className="text-zinc-600" size={20} />
                                            </div>
                                            <p>No comments yet. <br /> Be the first to start the conversation!</p>
                                        </div>
                                    ) : (
                                        allComments.map((comment, index) => (
                                            <CommentItem key={comment._id || index} comment={comment} />
                                        ))
                                    )}
                                    
                                    <div ref={bottomRef} className="h-px w-full" />
                                </div>
                            </InfiniteScroll>
                        </div>

                        <div className="p-4 bg-gradient-to-t from-zinc-900/90 to-zinc-900/0 border-t border-white/5 relative z-10">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add to the discussion..."
                                    disabled={isPending}
                                    className="w-full bg-zinc-800/40 text-sm text-zinc-200 rounded-2xl pl-4 pr-12 py-3 
                                                border border-white/5 focus:border-indigo-500/50 focus:bg-zinc-800/80
                                                focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-zinc-600
                                                disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isPending}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-xl 
                                                text-white shadow-lg shadow-indigo-600/20 
                                                hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all duration-200
                                                disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <Send size={14} className="ml-0.5" />
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default EventCommentSection