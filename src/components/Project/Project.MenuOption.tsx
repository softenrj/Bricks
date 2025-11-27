// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Ellipsis } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Project } from '@/types/project'
import { markArchieve, removeProject } from '@/service/api.project'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'

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
    const [openAlert, setAlert] = React.useState<boolean>(false);
    const router = useRouter();

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
        const response = await removeProject(project._id);
        if (!response) return ;
        onDelete?.(project._id);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis
                        className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                        size={16}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-10 bg-[#1c1c1cf0] border-[#2d2d2d] text-white" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.push(`/${project._id}/editor`)}>
                            Open
                            <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleArchieve}>
                            {isArch ? "unArchieve" : "Archieve"}
                            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAlert(true)}>
                            Delete
                            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openAlert} onOpenChange={() => setAlert(!openAlert)}>
                <AlertDialogContent className='bg-[#1f1f1f] text-white border-[#2d2d2d]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className='text-gray-300'>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='bg-gradient-to-r from-green-500/10 to-green-400/10 text-green-300 border-green-400/20 hover:from-green-500/10 hover:to-green-400/10 hover:text-green-300 hover:border-green-400/20'>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='bg-gradient-to-r from-red-500/10 to-red-500/10 text-red-400 border-red-300/20 border-1' onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default MenuOptions