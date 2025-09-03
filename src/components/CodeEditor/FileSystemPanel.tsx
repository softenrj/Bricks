"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchFsTree, setFileContent, setFileLanguage, setSelectedFile } from "@/store/Reducers/fsSlice";
import { LanguageEnum } from "@/feature/LanguageEnum";

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

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const iconClass = "w-3.5 h-3.5 flex-shrink-0";
    switch (ext) {
      case "js":
      case "jsx":
        return <File className={`${iconClass} text-yellow-400`} />;
      case "ts":
      case "tsx":
        return <File className={`${iconClass} text-sky-400`} />;
      case "css":
        return <File className={`${iconClass} text-blue-300`} />;
      case "html":
        return <File className={`${iconClass} text-orange-400`} />;
      case "json":
        return <File className={`${iconClass} text-green-400`} />;
      case "md":
        return <File className={`${iconClass} text-gray-300`} />;
      case "svg":
        return <File className={`${iconClass} text-purple-400`} />;
      case "py":
        return <File className={`${iconClass} text-green-400`} />;
      case "php":
        return <File className={`${iconClass} text-purple-500`} />;
      case "go":
        return <File className={`${iconClass} text-cyan-400`} />;
      case "rs":
        return <File className={`${iconClass} text-orange-500`} />;
      case "java":
        return <File className={`${iconClass} text-red-400`} />;
      case "c":
      case "cpp":
      case "h":
        return <File className={`${iconClass} text-blue-500`} />;
      default:
        return <File className={`${iconClass} text-gray-400`} />;
    }
  };

  const renderFS = (data: FSData, path: string = "", depth: number = 0) => {
    return Object.entries(data).map(([name, value]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (typeof value === "string") {
        const isSelected = selectedFile === fullPath;
        return (
          <li key={fullPath} className="select-none">
            <div
              className={`group flex items-center gap-1.5 py-1 px-2 mx-0.5 rounded-sm cursor-pointer transition-all duration-150 relative ${
                isSelected 
                  ? "bg-blue-600/25 text-blue-100" 
                  : "hover:bg-gray-700/40 text-gray-300 hover:text-gray-100"
              }`}
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
              onClick={() => {
                dispatch(setSelectedFile(fullPath));
                try {
                  const content = atob(value);
                  dispatch(setFileContent(content));
                  const ext = fullPath.split(".").pop()?.toLowerCase() as keyof typeof LanguageEnum;
                  const lang = LanguageEnum[ext] || LanguageEnum.md;
                  dispatch(setFileLanguage(lang));
                } catch {
                  alert("Unable to decode file content");
                }
              }}
            >
              {isSelected && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400 rounded-r" />}
              {getFileIcon(name)}
              <span className="text-xs truncate font-normal leading-relaxed">{name}</span>
            </div>
          </li>
        );
      } else {
        const isCollapsed = collapsed[fullPath];
        const hasChildren = Object.keys(value).length > 0;
        return (
          <li key={fullPath} className="select-none">
            <div
              className="group flex items-center gap-1 py-1 px-2 mx-0.5 rounded-sm cursor-pointer hover:bg-gray-700/30 transition-all duration-150"
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
              onClick={() => toggleFolder(fullPath)}
            >
              {hasChildren ? (
                isCollapsed ? (
                  <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                )
              ) : (
                <div className="w-3" />
              )}
              
              {isCollapsed ? (
                <Folder className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              ) : (
                <FolderOpen className="w-3.5 h-3.5 text-sky-300 flex-shrink-0" />
              )}
              
              <span className="text-xs text-gray-200 group-hover:text-gray-100 truncate font-medium leading-relaxed">
                {name}
              </span>
            </div>
            
            {!isCollapsed && hasChildren && (
              <ul className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700/30" />
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
      <div className="px-3 py-2.5 border-b border-gray-700/60 bg-[#1a1a1a]">
        <h2 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
          Explorer
        </h2>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-auto">
        <div className="py-1">
          <ul className="space-y-px">
            {Object.keys(fsData).length > 0 ? (
              renderFS(fsData)
            ) : (
              <div className="px-3 py-6 text-center">
                <p className="text-xs text-gray-500">Loading file system...</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileSystemPanel;