// Copyright (c) 2025 Raj
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";

import React from "react";
import { Github, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Tooltip } from "../common/Tooltip";
import { AuthProvider } from "@/service/util.auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgetPassword";
import PasswordInput from "./Password";

function LogIn({ toggle }: { toggle: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgetPass, setForgetPass] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await AuthProvider.loginWithEmail(email, password);

      if (result) {
        setPassword("");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Invalid credentials");
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

  if (forgetPass) {
    return <ForgotPassword setForgetPass={() => setForgetPass(false)} />;
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Welcome back
        </h2>
        <p className="text-sm text-zinc-400">
          Sign in to continue building
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm text-zinc-300 mb-1">
            Email
          </label>
          <div className="group flex items-center bg-[#2F2F32] px-3 py-2.5 border border-white/10 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400/40 transition">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mr-2" />
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base placeholder:text-zinc-500"
              required
            />
          </div>
        </div>

        {/* <PasswordInput /> */}
        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm text-zinc-300 mb-1">
            Password
          </label>
          <div className="group flex items-center bg-[#2F2F32] px-3 py-2.5 border border-white/10 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400/40 transition">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base placeholder:text-zinc-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-zinc-400 hover:text-zinc-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="cursor-pointer" size={16} /> : <Eye className="cursor-pointer" size={16} />}
            </button>
          </div>


          <button
            type="button"
            onClick={() => setForgetPass(true)}
            className="mt-2 text-xs sm:text-sm text-pink-400 hover:text-pink-300 transition w-full text-right"
          >
            Forgot password?
          </button>
        </div>


        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2.5 sm:py-3
            bg-gradient-to-r from-pink-500 to-red-500
            font-semibold text-white
            hover:opacity-90
            disabled:opacity-60 disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 text-zinc-500 text-xs sm:text-sm">
        <div className="flex-1 h-px bg-white/10" />
        <span>or continue with</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* OAuth */}
      <div className="flex justify-center gap-4">
        <Tooltip content="GitHub">
          <button
            type="button"
            aria-label="Sign in with GitHub"
            onClick={handleGitHubSignIn}
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 hover:shadow-pink-500/20 hover:shadow-md transition"
          >
            <Github className="w-5 h-5 text-white" />
          </button>
        </Tooltip>

        <Tooltip content="Google">
          <button
            type="button"
            aria-label="Sign in with Google"
            onClick={handleGoogleSignIn}
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 hover:shadow-pink-500/20 hover:shadow-md transition"
          >
            {/* Google SVG unchanged */}
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
      <p className="text-center text-xs text-zinc-400">
        Don&apos;t have an account?{' '}
        <span className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors underline-offset-4 hover:underline" onClick={toggle}>
          Sign Up
        </span>
      </p>

    </div>
  );
}

export default LogIn;
