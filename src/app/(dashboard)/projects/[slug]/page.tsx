import React from 'react'
import Project from "@/components/Project"

async function page({ params }: any) {
  const param = await params.slug
  console.log(param)
  return (
    <Project />
  )
}

export default page