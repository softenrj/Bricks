// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from 'react'
import MobileNavProfile from './MobileNavProfile'
import AppNavBarOptions from './AppNavBarOptions';

function MobileAppNavbar() {
    const [open, onOpen] = React.useState<boolean>(false);
    const handleOpen = () => onOpen(!open);
  return (
    <div className='flex flex-col gap-3 items-end'>
        <MobileNavProfile onOpen={handleOpen} />
        { open && <AppNavBarOptions onClose={handleOpen} />}
    </div>
  )
}

export default MobileAppNavbar