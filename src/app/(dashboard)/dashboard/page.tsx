import Dashboard from '@/components/Dashboard/Dashboard'
import React from 'react'

export const metadata = {
  title: "Dashboard - Bricks",
  description: "Access your Bricks dashboard to overview your projects, activities, and AI-powered coding insights.",
  keywords: ["dashboard", "overview", "projects", "activities", "Bricks"],
};

function page() {
  return (
    <Dashboard />
  )
}

export default page
