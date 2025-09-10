"use client"
import React from 'react'
import ProjectList from './ProjectList'
import { getProjects } from '@/service/api.project'

export default function index() {
  return (
    <div className='theme-dashboard px-4'>
      {/* Last Working Project */}
      {/* All  */}
      <ProjectList listName='All projects' extraOptions={true} fetchFun={getProjects} limit={12} />
      {/* Archive */}
      <ProjectList listName='Archieve' fetchFun={getProjects} extraOptions={false} limit={12} />
    </div>
  )
}
