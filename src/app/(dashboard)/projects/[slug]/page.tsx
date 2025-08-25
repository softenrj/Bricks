import React from 'react'
import Project from "@/components/Project"

type Params = {
  params: {
    slug: string
  }
}

async function page({ params }: Params) {
  const param = await params.slug
  console.log(param)
  return (
    <Project />
  )
}

export default page