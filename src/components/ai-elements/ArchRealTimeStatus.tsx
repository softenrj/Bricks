// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "../ui/spinner";
import { ArchEnginStatusSocket } from "@/types/processSocket";
import { getSocket } from "@/socket/socket";
import { ARCH_BRICKS_PROCESS_STATUS } from "@/utils/api/socket.events";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { upsertArchProcess } from "@/store/Reducers/ArchProcessChat";

function ArchRealTimeStatus() {
  const [pipeline, setPipeline] = React.useState<ArchEnginStatusSocket[]>([]);
  const socket = getSocket();
  const dispatch = useAppDispatch()
  const ArchPanel = useAppSelector(state => state.IdeFeatures).ArchForgePanel

  React.useEffect((): any => {
    if (!socket) return;

    const handler = (process: ArchEnginStatusSocket) => {
      dispatch(upsertArchProcess({...process, role: "ai" }));
      setPipeline(prev => {
        const index = prev.findIndex(p => p.processId === process.processId);

        if (process.process === "render") {
          if (index === -1) return [...prev, process];
          return prev;
        }

        if (process.process === "complete" && index !== -1) {
          const updated = [...prev];
          updated[index] = process;

          // hide after delay
          setTimeout(() => {
            setPipeline(p => p.filter(x => x.processId !== process.processId));
          }, 1000);

          return updated;
        }

        return prev;
      });
    };

    socket.on(ARCH_BRICKS_PROCESS_STATUS, handler);
    return () => socket.off(ARCH_BRICKS_PROCESS_STATUS, handler);
  }, [socket]);


  const last = pipeline[pipeline.length - 1];

  return last ? (
    !ArchPanel && <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="
        fixed top-20 left-1/2 -translate-x-1/2
        flex items-center gap-2
        max-w-[50vw] w-auto
        bg-[#1f1f1f]/80 text-gray-300 text-xs
        px-3 py-2
        rounded-md border border-[#2d2d2d]
        shadow-sm hover:shadow-md
        z-[999]
      "
    >
      {last.process === "render" && (
        <Spinner className="w-4 h-4 text-green-400" />
      )}

      <p
        className={`
          truncate max-w-full leading-relaxed
          ${last.process === "complete" ? "line-through text-gray-400" : ""}
        `}
      >
        {last.message}
      </p>
    </motion.div>
  ) : null;
}

export default ArchRealTimeStatus;
