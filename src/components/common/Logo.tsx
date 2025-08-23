import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

function Logo() {
    return (
        <div className=' flex bg-[#000000] border-[0.2px] w-24 h-8 rounded-full justify-center items-center'>
            <Avatar className=' h-6 w-6'>
                <AvatarImage src="/landingPage/bricks.png" />
                <AvatarFallback>Bricks</AvatarFallback>
            </Avatar>
            <p className=' text-gray-400 pr-2 hover:text-gray-100'>
                #Bricks
            </p>
        </div>
    )
}

export default Logo