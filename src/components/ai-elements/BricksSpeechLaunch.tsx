// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React, { useEffect, useState } from "react";
import SubtitleAi from "./SubtitleAi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import LexicalForge from "./LexicalForge";
import ArchRealTimeStatus from "./ArchRealTimeStatus";
import { getSocket } from "@/socket/socket";
import { ArchProjectCode } from "@/types/arch.typs";
import { ARCH_BRICKS_CODE_GEN } from "@/utils/api/socket.events";
import { archWebContainerProcess } from "@/service/webContainer";
import { archCodeGeneration } from "@/store/Reducers/fsSlice";

function BricksSpeechLaunch({ projectId }: { projectId: string }) {
  const [showLaunch, setShowLaunch] = useState(true);
  const archForge = useAppSelector(state => state.IdeFeatures).ArchForgePanel;
  const isVoiceOperate = false;
  const textOperate = true;
  const socket = getSocket();
  const dispatch = useAppDispatch();

  React.useEffect((): any => {
    if (!socket) return;

    const handler = async (gen: ArchProjectCode) => {
      if (projectId !== gen.projectId) return ;
      await archWebContainerProcess(gen.fileName,gen.path,gen.content,gen.projectId,dispatch);
      dispatch(archCodeGeneration(gen))
    };

    socket.on(ARCH_BRICKS_CODE_GEN, handler);
    return () => socket.off(ARCH_BRICKS_CODE_GEN, handler);
  }, [socket]);

  React.useEffect(() => {
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
      {!showLaunch && <LexicalForge projectId={projectId} />}
    </>
  );
}

export default BricksSpeechLaunch;
