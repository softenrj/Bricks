"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchFsTree,
  setFileContent,
  setFileLanguage,
  setSelectedFile,
} from "@/store/Reducers/fsSlice";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { getFileIcon } from "@/feature/fileIconsMapper";

type FSData = { [key: string]: string | FSData };

function FileSystemPanel() {
  const dispatch = useAppDispatch();
  const fsData = useAppSelector((s) => s.fs.tree);
  const selectedFile = useAppSelector((s) => s.fs.selectedFile);

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Object.keys(fsData).length === 0) {
      dispatch(fetchFsTree());
    }
  }, [dispatch, fsData]);

  const toggleFolder = (path: string) => {
    setCollapsed((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderFS = (data: FSData, path: string = "", depth: number = 0) => {
    return Object.entries(data).map(([name, value]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (typeof value === "string") {
        const isSelected = selectedFile === fullPath;
        return (
          <li key={fullPath} className="select-none">
            <div
              className={`group flex items-center gap-2 py-1.5 px-2 mx-0.5 rounded-md cursor-pointer transition-all duration-150 relative ${
                isSelected
                  ? "bg-blue-300/5 text-blue-100"
                  : "hover:bg-gray-700/11 text-gray-300 hover:text-gray-100"
              }`}
              style={{ paddingLeft: `${depth * 16 + 12}px` }}
              onClick={() => {
                dispatch(setSelectedFile(fullPath));
                try {
                  const content = atob(value);
                  dispatch(setFileContent(content));
                  const ext = fullPath
                    .split(".")
                    .pop()
                    ?.toLowerCase() as keyof typeof LanguageEnum;
                  const lang = LanguageEnum[ext] || LanguageEnum.md;
                  dispatch(setFileLanguage(lang));
                } catch {
                  alert("Unable to decode file content");
                }
              }}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400/50 rounded-r" />
              )}
              {getFileIcon(name)}
              <span className="text-sm truncate font-normal leading-relaxed">
                {name}
              </span>
            </div>
          </li>
        );
      } else {
        const isCollapsed = collapsed[fullPath];
        const hasChildren = Object.keys(value).length > 0;
        return (
          <li key={fullPath} className="select-none">
            <div
              className="group flex items-center gap-2 py-1.5 px-2 mx-0.5 rounded-md cursor-pointer hover:bg-gray-700/30 transition-all duration-150"
              style={{ paddingLeft: `${depth * 16 + 12}px` }}
              onClick={() => toggleFolder(fullPath)}
            >
              {hasChildren ? (
                isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                )
              ) : (
                <div className="w-4" />
              )}

              {isCollapsed ? (
                <Folder className="w-4.5 h-4.5 text-sky-400 flex-shrink-0" />
              ) : (
                <FolderOpen className="w-4.5 h-4.5 text-sky-300 flex-shrink-0" />
              )}

              <span className="text-sm text-gray-200 group-hover:text-gray-100 truncate font-medium leading-relaxed">
                {name}
              </span>
            </div>

            {!isCollapsed && hasChildren && (
              <ul className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/30" />
                {renderFS(value, fullPath, depth + 1)}
              </ul>
            )}
          </li>
        );
      }
    });
  };

  return (
    <div className="bg-[#1e1e1e] h-full border-r border-gray-700/60 flex flex-col">
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-700/60 bg-[#1a1a1a]">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Explorer
        </h2>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto">
        <div className="py-1.5">
          <ul className="space-y-px">
            {Object.keys(fsData).length > 0 ? (
              renderFS(fsData)
            ) : (
              <div className="px-3 py-6 text-center">
                <p className="text-sm text-gray-500">Loading file system...</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileSystemPanel;
