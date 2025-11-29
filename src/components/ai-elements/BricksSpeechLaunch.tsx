// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React, { useEffect, useState } from "react";
import SubtitleAi from "./SubtitleAi";

function BricksSpeechLaunch() {
  const [showLaunch, setShowLaunch] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLaunch(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* First screen → shown only at first render */}
      {showLaunch && (
        <div className="absolute w-full h-full ai-launch"></div>
      )}

      {/* Second screen → shown after first unmounts */}
      {!showLaunch && (
        <div className="absolute w-full h-full ai-blob animate-blobFade"></div>
      )}
      <SubtitleAi />
    </>
  );
}

export default BricksSpeechLaunch;
