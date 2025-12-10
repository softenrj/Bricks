// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";

import React from "react";
import { Tooltip } from "../common/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/hooks/redux";
import { Icon } from "@iconify/react";
import AiTyper from "../common/AiTyper";
import { useUserStats } from "@/service/api.user";
import { motion } from "framer-motion";
import { ShootingStars } from "../ui/shadcn-io/shooting-stars";
import { ImageDialog } from "./ImageDialog";
import { Pencil } from "lucide-react";
import { UserProfileUpdate } from "./UserProfileUpdate";

export default function AccountProfile() {
    const user = useAppSelector((s) => s.user);
    const { data: stats } = useUserStats();
    const bio = user?.bio?.slice(0, 250) || "";
    const [open, setOpen] = React.useState(false)
    const [openProfile, setOpenProfile] = React.useState(false)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className=" w-full max-w-full p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-neutral-900/0 to-neutral-800/10 rounded-md border border-white/10 backdrop-blur-xl shadow-lg hover:border-white/20 transition-colors duration-300"
            >
                <div className="flex-shrink-0 flex justify-center cursor-pointer z-50" onClick={() => setOpen(true)}>
                    <div className="relative">
                        <Avatar className="h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40 rounded-xl ring-1 ring-blue-500/30 overflow-hidden shadow-[0_0_20px_5px_rgba(0,122,255,0.35)]">
                            <AvatarImage
                                src={user.profile}
                                className="object-cover"
                                crossOrigin="anonymous"
                            />
                            <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-3 z-50">
                    <div className="flex items-center gap-2 -ml-3">
                        <Icon
                            icon="material-symbols:star-rate-rounded"
                            className="text-yellow-300 drop-shadow-md"
                            width={26}
                        />
                        <p className="text-white font-bold text-2xl sm:text-3xl tracking-tight line-clamp-1">
                            {user.username}
                        </p>
                    </div>

                    <blockquote className="border-l-2 border-yellow-400 pl-3">
                        <AiTyper
                            messages={[bio]}
                            typingSpeed={18}
                            loop={false}
                            cursorColor="#3b82f6"
                            textColour="text-gray-300"
                            className="text-xs opacity-80 md:text-sm lg:text-md "
                        />
                    </blockquote>

                    <div
                        className=" flex flex-wrap gap-4 mt-1 text-sm sm:text-base z-50">
                        <Tooltip content="Edit profie">
                            <Pencil className="text-gray-300 w-4 h-4" onClick={() => setOpenProfile(true)} />
                        </Tooltip>
                        <StatBlock
                            icon="ph:squares-four-duotone"
                            label="Projects"
                            value={stats?.projects}
                            color="text-sky-300"
                        />
                        <StatBlock
                            icon="ph:archive-box-duotone"
                            label="Archived"
                            value={stats?.archived}
                            color="text-purple-300"
                        />
                        <StatBlock
                            icon="ph:sparkle-duotone"
                            label="Star Marked"
                            value={stats?.starMarked}
                            color="text-amber-300"
                        />
                        <StatBlock
                            icon="ph:medal-military-duotone"
                            label="Reputation"
                            value={stats?.reputation}
                            color="text-emerald-300"
                        />
                        <StatBlock
                            icon="ph:fire-duotone"
                            label="Daily Streak"
                            value={stats?.streak}
                            color="text-rose-300"
                        />
                    </div>
                </div>
                <ShootingStars
                    starColor="#9E00FF"
                    trailColor="#2EB9DF"
                    minSpeed={15}
                    maxSpeed={35}
                    minDelay={1000}
                    maxDelay={3000}
                />
                <ShootingStars
                    starColor="#FF0099"
                    trailColor="#FFB800"
                    minSpeed={10}
                    maxSpeed={25}
                    minDelay={2000}
                    maxDelay={4000}
                />
                <ShootingStars
                    starColor="#00FF9E"
                    trailColor="#00B8FF"
                    minSpeed={20}
                    maxSpeed={40}
                    minDelay={1500}
                    maxDelay={3500}
                />
            </motion.div>
            {/* Image Dialog */}
            <ImageDialog
                open={open}
                onOpenChange={setOpen}
                img={user.profile || ""}
                header={user.penname || user.username || ""}
                description={user.bio || ""}
            />

            <UserProfileUpdate
                open={openProfile}
                onOpenChange={() => setOpenProfile(false)}
            />

        </>
    );
}

function StatBlock({ icon, label, value, color }: any) {
    return (
        <Tooltip content={label}>
            <div
                className={`text-sm md:text-xl lg:text-2xl flex items-center gap-2 ${color} opacity-90 hover:opacity-100 hover:${color} transition-colors`} >
                <Icon icon={icon} />
                <span className="text-xs md:text-md -ml-1 ">{value ?? 0}</span>
            </div>
        </Tooltip>
    );
}
