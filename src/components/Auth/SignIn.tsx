// Copyright (c) 2025 Raj
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";

import React from "react";
import { Mail, Lock, User, Github } from "lucide-react";
import { AuthProvider } from "@/service/util.auth";
import { Tooltip } from "../common/Tooltip";
import toast from "react-hot-toast";
import PasswordInput from "./Password";

function SignUp({ toggle }: { toggle: () => void }) {

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const username = String(form.get("username") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    console.log(username,email,password)

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await AuthProvider.registerWithEmail(email, password, username);
      toast.success("Account created successfully");
      e.currentTarget.reset()
    } catch (err: any) {
      toast.error(err?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      await AuthProvider.signInWithGoogle();
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await AuthProvider.signInWithGitHub();
    } catch {
      toast.error("GitHub sign-in failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Create your account
        </h2>
        <p className="text-sm text-zinc-400">
          Start building with confidence
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-xs sm:text-sm text-zinc-300 mb-1">
            Username
          </label>
          <div className="flex items-center bg-[#2F2F32] px-3 py-2.5 border border-white/10 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400/40 transition">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mr-2" />
            <input
              name="username"
              id="username"
              placeholder="yourname"
              className="bg-transparent w-full outline-none text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm text-zinc-300 mb-1">
            Email
          </label>
          <div className="flex items-center bg-[#2F2F32] px-3 py-2.5 border border-white/10 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400/40 transition">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mr-2" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="bg-transparent w-full outline-none text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        <PasswordInput name="password" />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2.5
            bg-gradient-to-r from-pink-500 to-pink-600
            font-semibold text-white
            hover:opacity-90
            disabled:opacity-60 disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 text-zinc-500 text-xs">
        <div className="flex-1 h-px bg-white/10" />
        <span>or continue with</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* OAuth */}
      <div className="flex justify-center gap-4">
        <Tooltip content="GitHub">
          <button
            onClick={handleGitHubSignIn}
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 transition"
          >
            <Github className="w-5 h-5 text-white" />
          </button>
        </Tooltip>

        <Tooltip content="Google">
          <button
            onClick={handleGoogleSignIn}
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 transition"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.5-34.1-4.4-50.4H272v95.3h146.9c-6.4 34.6-25.1 63.8-53.7 83.3v68h86.9c50.7-46.6 81.4-115.2 81.4-196.2z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.6 0 133.7-24.1 178.3-65.5l-86.9-68c-24.1 16.2-54.8 25.7-91.4 25.7-70.2 0-129.6-47.3-150.9-110.7h-89.4v69.7c44.6 88.1 136.1 149 240.3 149z"
              />
              <path
                fill="#FBBC05"
                d="M121.1 325.8c-5.6-16.2-8.9-33.6-8.9-51.8s3.2-35.6 8.9-51.8v-69.7H31.7C11.6 193.1 0 233.5 0 274s11.6 80.9 31.7 114.5l89.4-62.7z"
              />
              <path
                fill="#EA4335"
                d="M272 108.1c39.5 0 74.9 13.6 102.8 40.3l77.1-77.1C405.7 24.6 344.6 0 272 0 167.8 0 76.3 60.9 31.7 159.5l89.4 69.7c21.3-63.4 80.7-110.7 150.9-110.7z"
              />
            </svg>
          </button>
        </Tooltip>
      </div>

      {/* Switch */}
      <p className="text-center text-xs text-zinc-400">
        Already have an account?{" "}
        <span
          className="text-pink-400 hover:text-pink-300 cursor-pointer hover:underline"
          onClick={toggle}
        >
          Log in
        </span>
      </p>
    </div>
  );
}

export default SignUp;
