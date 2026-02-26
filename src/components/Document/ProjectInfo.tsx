// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"
import React from 'react'
import { Icon } from '@iconify/react'
import { Eye, EyeOff, Star, Calendar, Info } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns' // Recommended for industry-standard dates
import { Tooltip } from '../common/Tooltip'
import { markArchieve, markStarred, useProject } from '@/service/api.project'
import { Project } from '@/types/project'

function ProjectInfo({ projectId }: { projectId: string }) {
    const { data } = useProject(projectId);
    const [project, setProject] = React.useState<Project | null>(null)
    const [isStarred, setStarred] = React.useState<boolean>(false)
    const [isArch, setISArch] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (data) {
            setProject(data);
            setStarred(!!data.starred);
            setISArch(!!data.archived);
        }
    }, [data]);

    const handleArchieve = async () => {
        if (!project) return;
        const response = await markArchieve(isArch, project._id);
        if (response) setISArch(!isArch);
    };

    const handleStarClick = async () => {
        if (!project?._id) return;
        const response = await markStarred(isStarred, project?._id)
        if (response) setStarred(!isStarred)
    };

    if (!project) return <div className="animate-pulse h-32 bg-white/5 rounded-lg" />;

    return (
        <div className='text-slate-50 space-y-4 mb-6'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div className='flex gap-4 items-center'>
                    <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-3 rounded-xl border border-white/10 shadow-xl">
                        <Icon icon="vscode-icons:file-type-vite" width="40" height="40" />
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                                {project.name}
                            </h1>
                            {isArch && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
                                    Archived
                                </span>
                            )}
                        </div>
                        <div className='flex items-center gap-3 mt-1.5 text-slate-400 text-sm'>
                            <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                                <Icon 
                                    icon={project.tech_language === "JS" ? "devicon:javascript" : "devicon:typescript"} 
                                    className="text-lg"
                                />
                                <span className='text-xs'>{project.tech_language === 'JS' ? "JavaScript" : "TypeScript"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span className='text-xs'>Created {formatDistanceToNow(new Date(project.createdAt))} ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Tooltip content={isStarred ? "Remove from favorites" : "Add to favorites"}>
                        <button 
                            onClick={handleStarClick}
                            className={`p-2.5 rounded-md border transition-all duration-200 ${
                                isStarred 
                                ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Star size={12} fill={isStarred ? "currentColor" : "none"} />
                        </button>
                    </Tooltip>

                    <Tooltip content={isArch ? "Unarchive Project" : "Archive Project"}>
                        <button 
                            onClick={handleArchieve}
                            className={`p-2.5 rounded-md border transition-all duration-200 ${
                                isArch 
                                ? "bg-red-500/10 border-red-500/50 text-red-500" 
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {isArch ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Description Section */}
            <div className="relative group max-w-3xl">
                <p className="leading-relaxed text-slate-400 text-base">
                    {project.description || "No description provided for this project."}
                </p>
            </div>
        </div>
    )
}

export default ProjectInfo