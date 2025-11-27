// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { useAppDispatch } from '@/hooks/redux'
import { getProjectContext } from '@/service/api.context'
import { setContext } from '@/store/Reducers/fileContext'
import { Project } from '@/types/project'
import React from 'react'

function ProjectContext({ projectId }: { projectId: string }) {
    const [project, setProject] = React.useState<Project | null>(null)
    const dispatch = useAppDispatch();
    const fetchProjectContext = async () => {
        const response = await getProjectContext(projectId);
        if (response) {
            setProject(response.project);
            dispatch(setContext(response.context));
        }
    }
    React.useEffect(() => {
        fetchProjectContext()
    }, [])
    return (
        <div className='absolute'>ProjectContext</div>
    )
}

export default ProjectContext