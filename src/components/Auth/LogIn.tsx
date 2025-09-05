"use client";
import React from "react";
import { Github, Mail, Lock } from "lucide-react";
import { Tooltip } from "../common/Tooltip";
import { AuthProvider } from "@/utils/util.auth";

function LogIn() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) return;

    const result = await AuthProvider.registerWithEmail(email, pass);
    if (result) {
      console.log("Signed in with email:", result.user.email);
    }

    setPass(""); // clear password for security
  };

  const handleGoogleSignIn = async () => {
    const result = await AuthProvider.signInWithGoogle();
    if (result) {
      console.log("Signed in with Google:", result.user.email);
    }
  };

  const handleGitHubSignIn = async () => {
    const result = await AuthProvider.signInWithGitHub();
    if (result) {
      console.log("Signed in with GitHub:", result.user.email);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Email + Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">Email</label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">Password</label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 rounded-lg border border-white/10 focus-within:border-pink-400 transition">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="button"
            className="text-right text-xs sm:text-sm text-pink-400 hover:underline mt-1 cursor-pointer w-full"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 font-semibold text-white text-sm sm:text-base hover:opacity-90 hover:shadow-pink-500/40 hover:shadow-md transition"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
        <div className="flex-1 h-px bg-white/10"></div>
        <span>or continue with</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <Tooltip content="GitHub">
          <button
            type="button"
            aria-label="Sign in with GitHub"
            onClick={handleGitHubSignIn}
            className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 hover:shadow-md hover:shadow-pink-500/20 transition"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </Tooltip>

        <Tooltip content="Google">
          <button
            type="button"
            aria-label="Sign in with Google"
            onClick={handleGoogleSignIn}
            className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400 hover:shadow-md hover:shadow-pink-500/20 transition"
          >
            {/* Google Icon */}
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
    </div>
  );
}

export default LogIn;
