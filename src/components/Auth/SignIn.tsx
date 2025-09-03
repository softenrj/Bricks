"use client"
import React from "react"
import { Mail, Lock, User } from "lucide-react"

function SignIn() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Sign Up Form */}
      <form className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">
            Full Name
          </label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="text"
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
              placeholder="Confirm your password"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white text-sm sm:text-base hover:opacity-90 hover:shadow-pink-500/40 hover:shadow-md transition"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignIn
