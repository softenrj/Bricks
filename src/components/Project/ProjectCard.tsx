import { Ellipsis } from 'lucide-react'
import React from 'react'
import { Tooltip } from '../common/Tooltip'
import { Badge } from '../ui/badge'
import Image from 'next/image'

function ProjectCard() {
    return (
        <div className="bg-[#8888884a] p-4 rounded-md w-full max-w-[400px] relative shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-[#2c2c2c] p-2 rounded-md w-fit border-2 border-[#FD2787] absolute -top-6">
                <Image src="/icons/nextdotjs.svg" alt="next-js" width={28} height={28} />
            </div>

            <div className="flex justify-between items-start mt-4">
                <p className="text-xl sm:text-2xl text-gray-200 font-bold leading-snug">
                    Simple React Todo App
                </p>
                <Ellipsis color="#838383" className="cursor-pointer" />
            </div>

            <p className="mt-3 text-sm sm:text-base text-gray-300">
                React-based todo app where you can add, remove, and delete tasks. 
                You can also set a timer to auto-remove tasks.
            </p>

            <div className='flex gap-1 mt-2'>
                <Image src={"/icons/react.svg"} width={18} height={18} alt='frameworks' />
                <Image src={"/icons/typescript.svg"} width={18} height={18} alt='frameworks' />
            </div>

            <div className="flex justify-between items-end mt-4">
                <div className="flex flex-wrap gap-2">
                    <Tooltip content="React">
                        <Badge variant={'destructive'}>React</Badge>
                    </Tooltip>
                    <Tooltip content="Next.js">
                        <Badge variant={"default"}>Next.js</Badge>
                    </Tooltip>
                    <Tooltip content="Frontend">
                        <Badge variant={'destructive'}>Frontend</Badge>
                    </Tooltip>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">2 days ago</p>
            </div>
        </div>
    )
}

export default ProjectCard
