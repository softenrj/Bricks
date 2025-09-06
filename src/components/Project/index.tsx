"use client"
import React from 'react'
import ProjectList from './ProjectList'

export default function index() {
  return (
    <div className='theme-dashboard px-4'>
      {/* Last Working Project */}
      {/* All  */}
      <ProjectList listName='All projects' extraOptions={true} url='' limit={12} />
      {/* Archive */}
      <ProjectList listName='Archieve' extraOptions={false} url='' limit={4} />
    </div>
  )
}
