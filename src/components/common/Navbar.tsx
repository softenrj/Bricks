// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import React from "react";
import Logo from "./Logo";
import { Sparkles } from "lucide-react";
import AuthDialog from "../LandingPage/AuthDialog";

function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleAuthDialog = () => setIsOpen(!isOpen)
  return (
    <>
    <nav className="py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-between">
      {/* Logo */}
      <Logo />

      {/* Nav Links - compact + glossy dark look */}
      <ul
        className="hidden sm:flex items-center gap-3 md:gap-5 
        text-xs sm:text-sm md:text-base font-medium
        bg-white/5 backdrop-blur-md border border-white/10 shadow-sm
        rounded-full text-white px-3 py-1"
      >
        <li className="hover:text-pink-400 transition cursor-pointer">Home</li>
        <li className="hover:text-pink-400 transition cursor-pointer">Features</li>
        <li className="hover:text-pink-400 transition cursor-pointer">Docs</li>
      </ul>

      {/* Sign In Button */}
      < div onClick={handleAuthDialog}><SignInButton /></div>
    </nav>
    <AuthDialog isOpen={isOpen} onClose={handleAuthDialog} />
    </>
  );
}

function SignInButton(): React.JSX.Element {
  return (
    <button className="py-1.5 px-4 sm:px-5 rounded-full bg-[#000000] bg-gradient-to-l from-[#06112b] via-[#0a2c63] to-[#010c20] text-white hover:shadow-lg transition signIn-btn2 cursor-pointer">
      <div className="flex gap-1 items-center">
        <Sparkles size={18} className="sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Sign In</span>
      </div>
    </button>
  );
}

export default Navbar;
