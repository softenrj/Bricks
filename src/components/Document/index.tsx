// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"
import React from 'react'
import ProjectInfo from './ProjectInfo'
import ProjectDoc from './ProjectDoc'
import DepPanel from './DepPanel'

function index({projectId}: {projectId: string}) {
  return (
    <div className='m-3'>
        <ProjectInfo projectId={projectId} />
        <div className='flex flex-col gap-4 md:flex-row md:gap-2'>
            <div className='flex-2/3'><ProjectDoc projectId={projectId} /></div>
            <div className='flex-1/3'><DepPanel projectId={projectId} /></div>
        </div>
    </div>
  )
}

export default index