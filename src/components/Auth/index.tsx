// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import React from "react"
import LogIn from "./LogIn"
import SignIn from "./SignIn"

function AuthTabs() {
  const [toggle,setToggle] = React.useState<boolean>(true);
  const handleTogle = () => setToggle(!toggle);
  return (
    <>
    {toggle ? <LogIn toggle={handleTogle} /> : <SignIn toggle={handleTogle}/>}
    </>
  )
}

export default AuthTabs
