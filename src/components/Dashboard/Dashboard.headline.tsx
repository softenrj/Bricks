"use client"
import { useAppSelector } from '@/hooks/redux';
import React from 'react'

function HeadLine() {
  const user = useAppSelector( state => state.user );
  return (
    <div className='text-gray-100 my-4'>
      <p className='text-5xl font-medium'>Hi {user.username}!</p>
    </div>
  )
}

export default HeadLine;