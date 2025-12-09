// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react"
import { motion } from "framer-motion"
import { useUserStats } from "@/service/api.user"
import Image from "next/image"
import { ImageDialog } from "./ImageDialog"

function Rank() {
    const { data: stats } = useUserStats()

    const [open, setOpen] = React.useState(false)

    const selected = stats?.rank
        ? {
            img: stats.rank.badge,
            header: stats.rank.name,
            description: stats.rank.description ?? "You earned this rank by reaching required milestones.",
        }
        : null

    const handleOpen = () => {
        if (stats?.rank) {
            setOpen(true)
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group w-full flex flex-col gap-2 max-w-full p-4 bg-gradient-to-br from-bg-white/5 to-bg-white/10 rounded-md border border-white/10 backdrop-blur-xl shadow-lg hover:border-white/20 transition-colors duration-300"
            >
                <h5 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-200">
                    Rank {stats?.rank && ": " + stats.rank.rank}
                </h5>

                {stats?.rank ? (
                    <div
                        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            className="relative w-[clamp(100px,22vw,260px)] h-[clamp(100px,22vw,260px)] overflow-hidden rounded-full"
                        >
                            <Image
                                src={stats.rank.badge}
                                alt={stats.rank.name}
                                fill
                                className="object-contain z-10"
                            />
                        </motion.div>

                        <p className="mt-2 font-bold text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)] transition-all duration-300">
                            {stats.rank.name}
                        </p>

                        <p className="text-gray-300 text-center text-xs max-w-xs opacity-80 mt-1">
                            {stats.rank.description ?? "A special rank awarded to outstanding builders."}
                        </p>
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">
                        No rank yet. Keep building!
                    </p>
                )}
            </motion.div>

            <ImageDialog
                open={open}
                onOpenChange={setOpen}
                img={selected?.img || ""}
                header={selected?.header || ""}
                description={selected?.description || ""}
            />
        </>
    )
}

export default Rank
