// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import React from "react";
import { Mail } from "lucide-react";
import { auth } from "@/feature/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ForgotPassword({ setForgetPass }: { setForgetPass: () => void }) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox 📩");
      setEmail("");
      setForgetPass();
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      toast.error(err.message || "Failed to send reset email");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 px-2 sm:px-3 lg:px-6">
      <h2 className="text-center text-2xl font-bold text-white">Forgot Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-1">Email</label>
          <div className="flex items-center bg-white/5 px-3 py-2 sm:py-2.5 border border-white/10 focus-within:border-pink-400 transition">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent w-full outline-none text-white text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 font-semibold text-white text-sm sm:text-base hover:opacity-90 hover:shadow-pink-500/40 hover:shadow-md transition"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={setForgetPass}
          className="text-xs sm:text-sm text-pink-400 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
