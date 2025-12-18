// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import { Braces, ChevronsLeftRightEllipsis, ChevronLeft, ChevronRight, Save, SaveOff } from "lucide-react";
import { Tooltip } from "../common/Tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleAutoSave, toggleCodeCompletion, togglePanel } from "@/store/Reducers/IdeFeatures";
import { getSocket } from "@/socket/socket";
import { ProcessSocketType } from "@/types/processSocket";
import { IO_BRICKS_PROCESS_STATUS } from "@/utils/api/socket.events";
import { __getCodeCompletion } from "@/service/api.project";
import { aiCodeGen, setFileChange, setFileContent } from "@/store/Reducers/fsSlice";
import { Switch } from "../ui/switch";

interface Snapshot {
  fileName: string;
  snapshots: {
    content: string;
    date: string;
  }[];
}

export default function FooterController({projectId}: {projectId: string}) {
  const [processRunning, setProcessRunning] = React.useState(false);
  const [snapshotIndex, setSnapshotIndex] = React.useState<number>(-1);
  const [snapshotData, setSnapshotData] = React.useState<Snapshot | null>(null);
  const socket = getSocket();
  const dispatch = useAppDispatch();

  const { codeCompletion, autoSave, realTimePanel } = useAppSelector((state) => state.IdeFeatures);
  const { selectedFile, selectedFileContent, selectedLanguage } = useAppSelector((state) => state.fs);

  /** Toggle inline code suggestion (on/off) */
  const handleCodeCompletion = () => {
    dispatch(toggleCodeCompletion(!codeCompletion));
  };

  /** Trigger full code completion with animated typing */
  const handleCodePopulate = async () => {
    if (!selectedFileContent) return;

    setSnapshotData((prev) => {
      const newSnap = {
        fileName: selectedFile || "untitled",
        snapshots: [
          ...(prev?.snapshots || []),
          { content: selectedFileContent, date: new Date().toISOString() },
        ],
      };
      setSnapshotIndex(newSnap.snapshots.length - 1);
      return newSnap;
    });

    if (!selectedFileContent || !selectedLanguage || !selectedFile) return ;
    const response = await __getCodeCompletion(selectedFileContent, selectedFile, selectedLanguage, projectId);
    if (!response) return;

    dispatch(setFileChange({name: selectedFile || '', isEditing: true}))
    let frameId: number;
    let index = 0;
    const speed = 8;

    const animate = () => {
      index += speed;
      if (index >= response.length) {
        dispatch(aiCodeGen(response));
        cancelAnimationFrame(frameId);
        return;
      }
      dispatch(aiCodeGen(response.slice(0, index)));
      frameId = requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  /** Navigate backward in snapshot history */
  const handleSnapShotPrev = () => {
    if (!snapshotData || snapshotIndex <= 0) return;
    const prevIndex = snapshotIndex - 1;
    setSnapshotIndex(prevIndex);
    dispatch(setFileContent(snapshotData.snapshots[prevIndex].content));
  };

  /** Navigate forward in snapshot history */
  const handleSnapShotForward = () => {
    if (!snapshotData || snapshotIndex >= snapshotData.snapshots.length - 1) return;
    const nextIndex = snapshotIndex + 1;
    setSnapshotIndex(nextIndex);
    dispatch(setFileContent(snapshotData.snapshots[nextIndex].content));
  };

  /** Listen for socket process updates */
  React.useEffect((): any => {
    if (!socket) return;
    const handler = (payload: ProcessSocketType) => setProcessRunning(payload.status);
    socket.on(IO_BRICKS_PROCESS_STATUS, handler);
    return () => socket.off(IO_BRICKS_PROCESS_STATUS, handler);
  }, [socket]);

  return (
    <div className="bg-[#0E0E0E] h-8 px-4 flex gap-4 items-center border-t border-gray-800 shadow-sm w-full">
      {/* Toggle AI Code Suggestion */}
      <Tooltip content={codeCompletion ? "Code suggestion is ON" : "Code suggestion is OFF"}>
        <div
          className="flex items-center gap-2 text-xs cursor-pointer select-none"
          onClick={handleCodeCompletion}
          aria-label="Toggle code suggestion"
        >
          <ChevronsLeftRightEllipsis
            size={18}
            className={`transition-colors duration-200 ${
              codeCompletion ? "text-green-500" : "text-pink-500"
            }`}
          />
          <span
            className={`transition-colors duration-200 ${
              codeCompletion ? "text-white" : "text-gray-400"
            }`}
          >
            Code Suggestion
          </span>
        </div>
      </Tooltip>

      {/* Full AI Code Generation */}
      <Tooltip content="Run full AI code generation">
        <button
          className="flex items-center gap-2 bg-transparent hover:bg-transparent border-none"
          onClick={handleCodePopulate}
          disabled={processRunning}
          aria-label="Run full code completion"
        >
          <Braces size={15} className="text-pink-500 rotate-3" />
          <span className="text-xs text-white">Code Completion</span>
        </button>
      </Tooltip>

      <div className="ml-auto flex items-center gap-3">
        {snapshotData && snapshotData.snapshots.length > 0 && (
        <div className="flex items-center gap-1 ">
          <Tooltip content="Previous snapshot">
            <button
              className="p-1 bg-transparen"
              disabled={snapshotIndex <= 0}
              onClick={handleSnapShotPrev}
            >
              <ChevronLeft size={14} className="text-gray-300" />
            </button>
          </Tooltip>
          <Tooltip content="Next snapshot">
            <button
              className="p-1 bg-transparent"
              disabled={snapshotIndex >= snapshotData.snapshots.length - 1}
              onClick={handleSnapShotForward}
            >
              <ChevronRight size={14} className="text-gray-300" />
            </button>
          </Tooltip>
        </div>
      )}

      <Tooltip content={realTimePanel ? "RealTime Panel is on" : "RealTime Panel is off"}>
        <Switch checked={realTimePanel} onClick={() => dispatch(togglePanel(!realTimePanel))} />
      </Tooltip>
      <Tooltip content={autoSave ? "Auto Save on" : "Auto Save close"}>
        <div onClick={() => dispatch(toggleAutoSave(!autoSave))}>
          {autoSave ? <SaveOff size={14} className="text-green-400" /> : <Save size={14} className="text-pink-500" />}
        </div>
      </Tooltip>
      </div>
    </div>
  );
}
