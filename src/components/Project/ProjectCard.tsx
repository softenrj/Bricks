"use client";
import React, { useState } from "react";
import { Tooltip } from "../common/Tooltip";
import { Badge } from "../ui/badge";
import Image from "next/image";
import StarIcon from "../common/StarIcon";
import { Project } from "@/types/project";
import { markStarred } from "@/service/api.project";
import MenuOptions from "./Project.MenuOption";

function ProjectCard({ project, projectUpdate, projectDelete }: { project?: Project, projectUpdate: (id: string, changes: Project) => void, projectDelete: (id: string) => void }) {
    const [isStarred, setStarred] = React.useState<boolean>(!!project?.starred)
    const handleStarClick = async () => {
        if (!project?._id) return ;
        const response = await markStarred(isStarred, project?._id)
        if (response) setStarred(!isStarred)
    };

    return (
        project && <div className="bg-[#1f1f1f]/80 p-3 rounded-md w-full max-w-[380px] relative shadow-sm hover:shadow-md border border-[#2d2d2d]">
            {/* Top Icon */}
            <div className="bg-[#2c2c2c] p-1.5 rounded-md w-fit border border-[#FD2787] absolute z-20 -top-4 left-4 shadow-sm">
                <Image src="/icons/nextdotjs.svg" alt="next-js" width={22} height={22} />
            </div>

            {/* Header */}
            <div className="mt-5 flex justify-between items-start">
                {/* Title */}
                <p className="text-sm sm:text-base text-gray-100 font-semibold leading-snug pr-2">
                    {project?.name}
                </p>

                {/* Right controls */}
                <MenuOptions project={project} onUpdate={projectUpdate} onDelete={projectDelete} />

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
                <p className="text-gray-400 text-[10px] whitespace-nowrap">
                    {(() => {
                        const days = Math.floor((Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                        return days === 0 ? "now" : days + "d ago";
                    })()}
                </p>
            </div>
        </div>
    );
}

export default ProjectCard;
