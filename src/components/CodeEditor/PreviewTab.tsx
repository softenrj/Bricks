// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import { useAppSelector } from "@/hooks/redux";
import { Globe } from "lucide-react";
import React from "react";
import DefaultPreviewPanel from "./DefaultPreviewPanel";
import { Icon } from "@iconify/react";
import { Tooltip } from "../common/Tooltip";

function PreviewPanel() {
  const wbLink = useAppSelector(state => state.webContainer.liveUrl);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const [history, setHistory] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState(-1);

  // Push new URLs into history
  React.useEffect(() => {
    if (!wbLink) return;

    setHistory(prev => {
      const next = prev.slice(0, index + 1);
      next.push(wbLink);
      return next;
    });
    setIndex(i => i + 1);
  }, [wbLink]);

  const handleReload = () => {
    if (!iframeRef.current) return;
    iframeRef.current.src = history[index];
  };

  return (
    <div className="h-full bg-[#0D0D0D]">
      {wbLink ? (
        <div className="border-t h-full border-gray-700">
          <div className="flex items-center gap-2 px-2 py-1 bg-[#0D0D0D] text-xs text-gray-300">
            <Tooltip content="Reload">
              <button onClick={handleReload}>
              <Icon icon="tabler:reload" className="text-gray-400" width="14" height="14" />
            </button>
            </Tooltip>

            <Globe size={12} />

            <span className="ml-auto truncate">{history[index]}</span>
          </div>

          <iframe
            ref={iframeRef}
            src={history[index]}
            className="w-full h-full border-0"
          />
        </div>
      ) : (
        <DefaultPreviewPanel />
      )}
    </div>
  );
}


export default PreviewPanel;
