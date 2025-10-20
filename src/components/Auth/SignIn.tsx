// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react"
import { Mail, Lock, User } from "lucide-react"
import { AuthProvider } from "@/service/util.auth"
import { Button } from "../ui/button"

function SignIn() {
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")
  const [confirmPass, setConfirmPass] = React.useState("")

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !email || !pass || !confirmPass) {
      alert("All fields are required")
      return
    }
    if (pass !== confirmPass) {
      alert("Passwords do not match")
      return
    }

    try {
      setLoading(true);
      const result = await AuthProvider.registerWithEmail(email, pass, username)
    } catch (error) {
      console.error("Sign in failed:", error)
    } finally {
      setPass("")
      setConfirmPass("")
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">
            Full Name
          </label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your full name"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">
            Email
          </label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">
            Password
          </label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">
            Confirm Password
          </label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm your password"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white text-sm sm:text-base hover:opacity-90 hover:shadow-pink-500/40 hover:shadow-md transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>
    </div>
  )
}

export default SignIn
