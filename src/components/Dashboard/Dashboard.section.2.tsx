import React from 'react'
import ProjectCard from '../Project/ProjectCard'

function Section2() {
    return (
        <div className="text-gray-100 py-6 px-4">
            <p className="text-3xl font-medium mb-10 mt-4">Recent</p>

            <div className="flex flex-wrap justify-center gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="w-full sm:w-[48%] lg:w-[32%] flex justify-center"
                    >
                        <ProjectCard />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Section2
