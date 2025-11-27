// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import ProjectList from './ProjectList'
import { getProjects } from '@/service/api.project'
import { useSearchParams } from 'next/navigation'

export default function index() {
  return (
    <div className='theme-dashboard px-4'>
      {/* Last Working Project */}
      {/* All  */}
      <ProjectList filterMode='none' listName='All projects' extraOptions={true} fetchFun={getProjects} limit={12} />
      {/* Archive */}
      <ProjectList filterMode='arch' listName='Archieve' fetchFun={getProjects} extraOptions={false} limit={12} />
    </div>
  )
}
