"use client";
import React from "react";

function PreviewPanel() {
  return (
    <div className="h-full bg-white">
      <iframe
        id="preview"
        title="Live Preview"
        className="w-full h-full border-none"
      />
    </div>
  );
}

export default PreviewPanel;
