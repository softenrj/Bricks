"use client";
import React from "react";

function EditorNavBar() {
  return (
    <div className="h-10 bg-[#1e1e1e] flex items-center px-3 text-gray-300 text-sm">
      <span className="mr-4">index.js</span>
      <span className="opacity-50">+ Add File</span>
    </div>
  );
}

export default EditorNavBar;
