import React from 'react'

function IdeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* <IdeSideBar /> */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default IdeLayout
