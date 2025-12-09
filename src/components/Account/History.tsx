// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Filter } from '@/service/api.project'
import HistoryFilter from './HistoryFilter'
import { IBricksHistry } from '@/types/history'
import { useQuery } from '@tanstack/react-query'
import { cleanUserHistory, getUserHistory, removeUserHistory } from '@/service/api.history'
import { Cookie, Trash, User } from 'lucide-react'
import { historyIcons } from '@/feature/HistoryIconMap'
import { Tooltip } from '../common/Tooltip'

function History() {
    const [filter, setFilter] = React.useState<Partial<Filter>>({});
    const [history, setHistory] = React.useState<IBricksHistry[]>([]);
    const [nextCursor, setNextCursor] = React.useState<Date | null>(null);
    const [hasMore, setHasMore] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    // Load first batch
    React.useEffect(() => {
        fetchHistory(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchHistory = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;
        setLoading(true);
        try {
            const cursor = reset ? null : nextCursor;
            const result = await getUserHistory(10, cursor, filter);

            if (reset) {
                setHistory(result.data);
            } else {
                setHistory(prev => [...prev, ...result.data]);
            }

            setNextCursor(result.nextCursor);
            setHasMore(!!result.nextCursor);
        } catch (error) {
            console.error("Error loading projects:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    const onFallBack = (type: string) => {
        if (type === "LOADMORE" && hasMore) fetchHistory()
    }

    const handleRemoveHistory = async (historyId: string) => {
        const res = await removeUserHistory(historyId);
        if (res) {
            setHistory(history.filter(item => item._id !== historyId))
        }
    }

    const handleCleanHistory = async () => {
        const res = await cleanUserHistory();
        if (res) {
            setHistory([])
        }
    }

    React.useEffect(() => {
        fetchHistory(true)
    }, [filter])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group w-full h-full flex-1 flex flex-col gap-1 max-w-full p-4 bg-gradient-to-br from-bg-white/5 to-bg-white/10 rounded-md border border-white/10 backdrop-blur-xl shadow-lg hover:border-white/20 transition-colors duration-300"
        >
            <h5 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-200">
                History
            </h5>
            <Suspense fallback={<div>Loading filters...</div>}>
                <HistoryFilter extraOptions={true} fallback={onFallBack} filter={filter} setFilter={setFilter} />
            </Suspense>

            {history.map((item, index) => {
                const { Icon, color } = historyIcons[item.type]

                return (
                    <div key={index} className="flex items-start my-1 gap-3 w-full bg-white/2 hover:bg-white/4 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 transition-all duration-200 group">

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex items-center justify-center rounded-md p-1.5 shadow-sm ${color}`}
                        >
                            <Icon className="w-4 h-4" />
                        </motion.div>

                        <div className="flex flex-1 items-start justify-between gap-3">
                            <p className="text-xs text-gray-200 leading-normal line-clamp-2 flex-1">
                                {item.description}
                            </p>

                            <button className="opacity-60 group-hover:opacity-100 transition-all rounded-md p-1 hover:bg-red-500/10 cursor-pointer" onClick={() => handleRemoveHistory(item._id)}>
                                <Trash className="text-red-400 w-4 h-4" />
                            </button>
                        </div>

                    </div>
                )
            })}

            <Tooltip content="Clean History">
                <button  className="group w-fit h-8 flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-red-300 hover:border-red-400 transition-all" onClick={handleCleanHistory}>
                    <Cookie size={12} />
                    <span>Clean history</span>
                </button>
            </Tooltip>

        </motion.div>
    )
}

export default History