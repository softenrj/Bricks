// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import HeadLine from './Dashboard.headline'
import DashboardRecent from './Dashboard.recent'
import DashboardAICard from './Dashboard.topcard'
import { getUser } from '@/service/api.user'
import { useAppDispatch } from '@/hooks/redux'
import { setUserdata } from '@/store/Reducers/user'

function Dashboard() {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // define async function inside useEffect
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          dispatch(setUserdata(user));
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [dispatch]);
  
  return (
    <div className='theme-dashboard px-4 flex flex-col'>
      <HeadLine />
      <DashboardAICard />
      <DashboardRecent />
    </div>
  )
}

export default Dashboard