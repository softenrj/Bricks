import React from 'react'

function HeroButtons() {
  return (
    <div className='flex items-center justify-center gap-4 -mt-16'>
        <button className='py-1.5 px-5 border-2 border-pink-400 hover:border-pink-300 rounded-full text-white font-bold cursor-pointer'>See It in Action</button>
        <button className='py-1.5 px-5 rounded-full bg-[#000000] bg-gradient-to-l from-[#06112b] via-[#162946] to-[#010c20] text-white hover:shadow-lg transition signIn-btn cursor-pointer'>Build with AI</button>
    </div>
  )
}

export default HeroButtons