// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"
import React from 'react'
import AccountProfile from './Account.profile'
import { GridPattern } from '../ui/gradient-pattern'
import { cn } from '@/lib/utils'
import Achievement from './Achievement'
import Rank from './Rank'
import ProfileCode from './ProfileCode'
import Streak from './Streak'
import History from './History'
import { ImageDialog } from './ImageDialog'

export default function Index() {
  return (
    <>
    <div className="relative w-full min-h-screen overflow-hidden">
      <GridPattern
        width={15}
        height={15}
        className={cn(
          "absolute inset-0 opacity-60",
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />

      <div className="relative mx-auto p-2 flex flex-col gap-4">
        <AccountProfile />

        <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
          <div className="w-full md:w-4/5 flex">
            <Achievement />
          </div>

          <div className="w-full md:w-1/5 flex">
            <Streak />
          </div>
        </div>


        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full h-full md:w-2/5">
            <Rank />
          </div>
          <div className="w-full h-full md:w-3/5">
            <ProfileCode />
          </div>
        </div>
        <History />
      </div>
    </div>
    </>
  )
}
