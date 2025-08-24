import React from "react"
import Logo from "./Logo"
import { Sparkles } from "lucide-react"

function Navbar(): React.JSX.Element {
  return (
    <nav className="py-4 px-6 flex items-center justify-between">
        <Logo />
      <ul className="flex items-center gap-6 text-lg font-medium nav-glass text-[12pt] p-[5] rounded-full overflow-hidden text-white px-4">
        <li className="hover:text-pink-500 transition cursor-pointer">Home</li>
        <li className="hover:text-pink-500 transition cursor-pointer">Features</li>
        <li className="hover:text-pink-500 transition cursor-pointer">Docs</li>
        {/* <li className="hover:text-yellow-400 transition">Pricing</li> */}
      </ul>
        <SignInButton />
    </nav>
  )
}

function SignInButton(): React.JSX.Element {
  return (
    <button className="py-1.5 px-5 rounded-full bg-[#000000] bg-gradient-to-l from-[#06112b] via-[#0a2c63] to-[#010c20] text-white hover:shadow-lg transition signIn-btn cursor-pointer" >
      <div className=" flex gap-1 justify-center items-center">
        <Sparkles size={20} /> <p>Sign In</p>
      </div>
    </button>
  )
}

export default Navbar
