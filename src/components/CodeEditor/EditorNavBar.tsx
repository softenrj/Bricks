// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React, { SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { switchTab, closeTab } from "@/store/Reducers/fsSlice";
import { X } from "lucide-react";
import { Switch } from "../ui/switch";
import { Tooltip } from "../common/Tooltip";
import OpenedTabContext from "./OpenedTabContext";

interface EditorNavBarProps {
  showMd: boolean;
  setShowMd: React.Dispatch<SetStateAction<boolean>>;
}

function EditorNavBar({ showMd, setShowMd }: EditorNavBarProps) {
  const dispatch = useAppDispatch();
  const { openTabs, selectedFile } = useAppSelector((state) => state.fs);
  if (openTabs.length === 0) {
    return (
      <div className="h-10 bg-[#0D0D0D] flex items-center px-3 text-gray-500 text-sm">
        No file open
      </div>
    );
  }

  const isMdFormat =
    selectedFile?.split("/").pop()?.split(".").pop() === "md";

  return (
    <div className="flex flex-col">
      <div className="h-10 bg-[#0D0D0D] flex items-center overflow-x-auto whitespace-nowrap hide-scrollbar">
        {openTabs.map((tab) => {
          const fileName = tab.name.split("/").pop();
          const isActive = selectedFile === tab.name;
          const isEditing = tab.isEditing
          return (
            <OpenedTabContext name={fileName} key={tab.name}>
              <div
                className={`flex items-center px-3 mr-1 h-full cursor-pointer select-none border-b-2 transition-all ${isActive
                  ? "bg-[#1E1E1E] border-blue-500/60 text-white"
                  : "bg-[#0D0D0D] border-transparent text-gray-300 hover:bg-[#111111]"
                  }`}
                onClick={() => dispatch(switchTab(tab.name))}
              >
                <span className="truncate max-w-[150px]">{fileName}</span>
                {isEditing && (
                  <span
                    className="ml-2 bg-[#cccccc5d] h-2 w-2 rounded-full 
      group-hover:opacity-0 transition-opacity duration-150"
                  ></span>
                )}

                <X
                  size={12}
                  className={`ml-2 text-gray-400 
      ${isEditing ? "hidden hover:block" : ""} 
      transition-opacity duration-150`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(closeTab(tab.name));
                  }}
                />
              </div>
            </OpenedTabContext>
          );
        })}
      </div>

      {isMdFormat && (
        <div className="bg-[#0D0D0D] flex items-center px-3 h-8 border-t border-gray-700">
          <p className="text-white text-xs mr-4 truncate">{selectedFile}</p>
          <Tooltip content={showMd ? "Hide Markdown" : "Show Markdown"}>
            <Switch
              checked={showMd}
              onCheckedChange={(checked: boolean) => setShowMd(checked)}
              className={`relative inline-flex items-center rounded-full transition-colors duration-200 ${showMd ? "bg-pink-500" : "bg-gray-700"
                }`}
            />
          </Tooltip>
        </div>
      )}

      {isMdFormat && showMd && (
        <div className="bg-[#0D0D0D] text-gray-200 px-2 py-1 text-xs">
          Markdown preview enabled for <strong>{selectedFile}</strong>
        </div>
      )}
    </div>
  );
}

export default EditorNavBar;
