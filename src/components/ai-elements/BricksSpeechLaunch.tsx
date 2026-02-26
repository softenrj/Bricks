// Copyright (c) 2025 Raj 
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
import { archWebContainerProcess, rollBack } from "@/service/webContainer";
import { archCodeGeneration, archCodeRollBack } from "@/store/Reducers/fsSlice";
import { API_BRICKS_ARCH_COMMIT, API_BRICKS_ARCH_ROLLBACK, API_BRICKS_ARCH_SNAP_EXTENED, API_BRICKS_ARCH_STREAM } from "@/utils/api/APIConstant";
import { defaultApiRoute } from "@/utils/constance";
import { getFreshToken } from "@/utils/api/axios";
import { postApi } from "@/utils/api/common";
import { ApiResponse } from "@/types/Api";
import toast from "react-hot-toast";
import { ISnapshotFile } from "@/types/snapshot";
import { sendToShell } from "@/store/Reducers/webContainer";
import { setSnapIds } from "@/store/Reducers/IdeFeatures";

function BricksSpeechLaunch({ projectId }: { projectId: string }) {
  const [showLaunch, setShowLaunch] = useState(true);
  const archForge = useAppSelector(state => state.IdeFeatures).ArchForgePanel;
  const isVoiceOperate = false;
  const dispatch = useAppDispatch();
  const jobId = useAppSelector(state => state.IdeFeatures).jobId!;
  const snapIds = useAppSelector(state => state.IdeFeatures).snap;
  const IdeFeatures = useAppSelector(state => state.IdeFeatures);

  const handleCommit = async () => {
    if (!snapIds) return;
    const response = await postApi<ApiResponse<void>>({
      url: API_BRICKS_ARCH_COMMIT,
      values: snapIds
    })

    if (response?.success) {
      toast.success(response.message);
      dispatch(setSnapIds(null));
    }
  }

  const handleRollBack = async () => {
    if (!snapIds) return;
    const response = await postApi<ApiResponse<ISnapshotFile[]>>({
      url: API_BRICKS_ARCH_ROLLBACK,
      values: snapIds
    })

    if (response?.success) {
      toast.success(response.message);
      //await syncwebContainer(response.data);
      await rollBack(response.data)
      dispatch(archCodeRollBack(response.data))
      dispatch(setSnapIds(null));
    }
  }

  React.useEffect(() => {
    if (!snapIds) return;

    const timer = setTimeout(() => {
      postApi<ApiResponse<void>>({
        url: API_BRICKS_ARCH_SNAP_EXTENED,
        values: snapIds
      });
    }, 10 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [snapIds]);


  React.useEffect(() => {
    setShowLaunch(true);

    const timer = setTimeout(() => {
      setShowLaunch(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [archForge]);


  React.useEffect(() => {
    if (!jobId) return;
    let es: EventSource;
    const stream = async () => {
      const token = await getFreshToken();

      es = new EventSource(defaultApiRoute + API_BRICKS_ARCH_STREAM + `/${jobId}?token=${token}`);

      es.addEventListener("file", async (e) => {
        const gen: ArchProjectCode = JSON.parse(e.data);
        if (projectId !== gen.projectId) return;

        await archWebContainerProcess(gen.path, gen.content, gen.projectId, dispatch);
        dispatch(archCodeGeneration(gen))
        if (gen.dependency && gen.dependency.trim()) {
          await sendToShell(gen.dependency, dispatch, projectId, false);
        }
      })

      es.addEventListener("complete", (e) => {
        const snap = JSON.parse(e.data);
        dispatch(setSnapIds(snap));
        es.close();
      });

      es.onerror = () => {
        es.close();
      };
    }

    stream();

    return () => {
      if (es) {
        es.close();
      }
    };
  }, [jobId, projectId]);

  return (
    <>
      {/* First screen → shown only at first render */}
      {showLaunch && (IdeFeatures.ArchFloatPanel || IdeFeatures.ArchForgePanel) && (
        <div className="absolute w-full h-full ai-launch"></div>
      )}

      {/* Second screen → shown after first unmounts */}
      {!showLaunch && IdeFeatures.ArchVoice && (
        <div className="absolute w-full h-full ai-blob animate-blobFade"></div>
      )}
      {/* <SubtitleAi /> */}
      <ArchRealTimeStatus />
      {!showLaunch && IdeFeatures.ArchFloatPanel && <LexicalForge snap={!!snapIds} rollBack={handleRollBack} commit={handleCommit} projectId={projectId} />}
    </>
  );
}

export default BricksSpeechLaunch;
