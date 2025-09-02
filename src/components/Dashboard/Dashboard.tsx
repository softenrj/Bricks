import React from 'react'
import HeadLine from './Dashboard.headline'
import DashboardRecent from './Dashboard.recent'
import DashboardAICard from './Dashboard.topcard'

function Dashboard() {
  return (
    <div className='theme-dashboard px-4 flex flex-col justify-center'>
        <HeadLine />
        <DashboardAICard />
        <DashboardRecent />
    </div>
  )
}

export default Dashboard