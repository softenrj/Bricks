import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function AppSideBarProfile() {
  return (
    <div className='glass-card p-2 flex gap-3 items-center'>
        <Avatar className=' h-10 w-10'>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVsZ4Il2r8DBJZ0O79S9zkdeNEUtK34XvkA&s" />
                <AvatarFallback>Bricks</AvatarFallback>
            </Avatar>
            <h2 className='text-xl font-semibold text-gray-200'>Raj Sharma</h2>
    </div>
  )
}
