// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import LogIn from "./LogIn"
import SignIn from "./SignIn"

function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="lg:max-w-[360px] mx-auto">
      <TabsList
        className="
          flex w-1/2 mx-auto justify-center gap-2 
          bg-white/5 backdrop-blur-md border border-white/10
          rounded-lg p-1 shadow-lg
        "
      >
        <TabsTrigger
          value="login"
          className="
            flex-1 py-2 text-sm font-medium text-gray-300
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-red-500
            data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(236,72,153,0.7)]
            rounded-full transition-all
          "
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="
            flex-1 py-2 text-sm font-medium text-gray-300
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500
            data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(147,51,234,0.7)]
            rounded-full transition-all
          "
        >
          Sign Up
        </TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent
        value="login"
        className="mt-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-gray-200 shadow-xl"
      >
        <LogIn />
      </TabsContent>

      <TabsContent
        value="signup"
        className="mt-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-gray-200 shadow-xl"
      >
        <SignIn />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
