"use client";
import { useAppSelector } from "@/hooks/redux";
import { Globe } from "lucide-react";
import React from "react";

function PreviewPanel() {
  const wbLink = useAppSelector(state => state.webContainer).liveUrl
  return (
    <div className="h-full bg-white">
      {/* Live Preview */}
      {wbLink && (
        <div className="border-t border-gray-700">
          <div className="flex items-center justify-between px-2 py-1 bg-gray-900 text-xs text-white">
            <span className="flex items-center space-x-1">
              <Globe className="w-3 h-3" /> <span>{wbLink}</span>
            </span>
            <a
              href={wbLink}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-400"
            >
              Open in new tab
            </a>
          </div>
          <iframe src={wbLink} className="w-full h-full border-0" />
        </div>
      )}
    </div>
  );
}

export default PreviewPanel;
