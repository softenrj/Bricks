import React from 'react'
import Project from "@/components/Project"

export const metadata = {
  title: "Projects - Bricks",
  description: "Manage and explore your projects in Bricks, the AI-powered code editor for enhanced productivity.",
  keywords: ["projects", "management", "AI", "code editor", "Bricks"],
};

function page() {
  return (
    <Project />
  )
}

export default page
