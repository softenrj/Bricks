// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip } from '../common/Tooltip'
import { useUserStats } from '@/service/api.user';
import Image from 'next/image';
import { ImageDialog } from './ImageDialog';

function Achievement() {
    const { data: stats } = useUserStats();
    const [open, setOpen] = React.useState(false);

    const [selected, setSelected] = React.useState<{
        img: string;
        header: string;
        description: string;
    } | null>(null);

    const achievements = stats?.achievements
        ? [...stats.achievements].sort(() => Math.random() - 0.5)
        : [];

    const handleOpen = (ach: any) => {
        setSelected({
            img: ach.badge,
            header: ach.name,
            description: ach.description || "",
        });
        setOpen(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col gap-1 max-w-full p-4 bg-gradient-to-br from-bg-white/5 to-bg-white/10 rounded-md border border-white/10 backdrop-blur-xl shadow-lg hover:border-white/20 transition-colors duration-300"
            >
                <h5 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-200">
                    Bricks Achievements
                </h5>

                <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto hide-scrollbar px-2 sm:px-4 py-2">
                    {achievements.map((achievement, i) => (
                        <Tooltip key={achievement._id || i} content={achievement.name}>
                            <motion.div
                                whileHover={{ scale: 1.12, rotate: 2 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                className="shrink-0 cursor-pointer"
                                style={{ originX: 0.5, originY: 0.5 }}
                                onClick={() => handleOpen(achievement)}
                            >
                                <div className="relative w-[clamp(42px,8vw,80px)] h-[clamp(42px,8vw,80px)]">
                                    <Image
                                        src={achievement.badge}
                                        alt={achievement.name}
                                        fill
                                        className="rounded-md shadow-md ring-1 ring-white/15 object-contain"
                                    />
                                </div>
                            </motion.div>
                        </Tooltip>
                    ))}
                </div>
            </motion.div>

            <ImageDialog
                open={open}
                onOpenChange={setOpen}
                img={selected?.img || ""}
                header={selected?.header || ""}
                description={selected?.description || ""}
            />
        </>
    );
}

export default Achievement;
