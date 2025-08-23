import React from "react"
import Logo from "./Logo"

function Navbar(): React.JSX.Element {
  return (
    <nav className="text-amber-50 pt-4 px-6 flex items-center justify-between">
        <Logo />
      <ul className="flex items-center gap-8 text-lg font-medium">
        <li className="hover:text-yellow-400 transition">Home</li>
        <li className="hover:text-yellow-400 transition">Features</li>
        <li className="hover:text-yellow-400 transition">Docs</li>
        {/* <li className="hover:text-yellow-400 transition">Pricing</li> */}
        <SignInButton />
      </ul>
    </nav>
  )
}

function SignInButton(): React.JSX.Element {
  return (
    <button className="py-1.5 px-5 rounded-sm bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition">
      Sign In
    </button>
  )
}

export default Navbar
