// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React, { useEffect, useState } from "react";
import SubtitleAi from "./SubtitleAi";
import { useAppSelector } from "@/hooks/redux";
import LexicalForge from "./LexicalForge";
import ArchRealTimeStatus from "./ArchRealTimeStatus";

function BricksSpeechLaunch() {
  const [showLaunch, setShowLaunch] = useState(true);
  const archForge = useAppSelector(state => state.IdeFeatures).ArchForgePanel;
  const isVoiceOperate = false;
  const textOperate = true;

  useEffect(() => {
  setShowLaunch(true);

  const timer = setTimeout(() => {
    setShowLaunch(false);
  }, 3000);

  return () => clearTimeout(timer);
}, [archForge]);


  return (
    archForge && 
    <>
      {/* First screen → shown only at first render */}
      {showLaunch && (
        <div className="absolute w-full h-full ai-launch"></div>
      )}

      {/* Second screen → shown after first unmounts */}
      {!showLaunch && isVoiceOperate && (
        <div className="absolute w-full h-full ai-blob animate-blobFade"></div>
      )}
      {/* <SubtitleAi /> */}
      <ArchRealTimeStatus />
      {!showLaunch && <LexicalForge />}
    </>
  );
}

export default BricksSpeechLaunch;
