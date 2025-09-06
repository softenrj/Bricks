"use client"
import React from 'react'
import ProjectCard from './ProjectCard'
import FilterOptions from './Project.recent.filter'

interface Probe {
    listName: string;
    limit: number;
    extraOptions: boolean;
    url: string
}
function ProjectList({
    listName = "All Projects",
    limit = 12,
    extraOptions = false,
    url = ""
}: Probe) {
    return (
        <div className="text-gray-100 py-6 ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
                    {listName}
                </p>
                <FilterOptions extraOptions={extraOptions}  />
            </div>
            <div className="max-w-8xl mx-auto self-start">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: limit }).map((_, i) => (
                        <ProjectCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectList