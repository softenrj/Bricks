"use client"
import React from "react";
import AuthDialog from "./AuthDialog";

function HeroButtons() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const handleAuthDialog = () => setIsOpen(!isOpen)
  return (
    <>
    <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 px-3">
      <button className="py-1.5 px-4 sm:px-6 border-2 border-pink-400 hover:border-pink-300 rounded-full text-white font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer">
        See It in Action
      </button>

      <button className="py-1.5 px-5 rounded-full bg-[#000000] bg-gradient-to-l from-[#06112b] via-[#162946] to-[#010c20] text-white hover:shadow-lg transition signIn-btn cursor-pointer" onClick={handleAuthDialog}>
        Build with AI
      </button>
    </div>
    <AuthDialog isOpen={isOpen} onClose={handleAuthDialog} />
    </>
  );
}

export default HeroButtons;
