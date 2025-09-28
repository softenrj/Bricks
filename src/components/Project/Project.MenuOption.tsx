"use client"
import { Ellipsis } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Project } from '@/types/project'
import { markArchieve } from '@/service/api.project'

function MenuOptions({
    project,
    onUpdate,
    onDelete
}: {
    project: Project;
    onUpdate?: (id: string, changes: Project) => void;
    onDelete?: (id: string) => void;
}) {
    const [isArch, setISArch] = React.useState<boolean>(!!project.archived);

    const handleArchieve = async () => {
        if (!project._id) return;
        const response = await markArchieve(isArch, project._id);
        if (response) {
            setISArch(!isArch);
            onUpdate?.(project._id, response);
        }
    };

    const handleDelete = async () => {
        if (!project._id) return;
        // Call your delete API here
        onDelete?.(project._id);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis
                    className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                    size={16}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10 bg-[#1c1c1cf0] border-[#2d2d2d] text-white" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Open
                        <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleArchieve}>
                        {isArch ? "unArchieve" : "Archieve"}
                        <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuOptions