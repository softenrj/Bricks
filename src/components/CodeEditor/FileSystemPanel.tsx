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
    const iconClass = "w-4 h-4 mr-2 flex-shrink-0";
    switch (ext) {
      case "js":
      case "jsx":
        return <File className={`${iconClass} text-yellow-400`} />;
      case "ts":
      case "tsx":
        return <File className={`${iconClass} text-blue-400`} />;
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
              className={`flex items-center py-1 px-2 mx-1 rounded cursor-pointer transition-colors duration-150 ${isSelected ? "bg-blue-600/30 text-blue-200" : "hover:bg-gray-700/50 text-gray-300"
                }`}
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
              onClick={() => {
                dispatch(setSelectedFile(fullPath));
                try {
                  const content = atob(value);
                  dispatch(setFileContent(content));

                  const ext = fullPath.split(".").pop()?.toLowerCase() as keyof typeof LanguageEnum;
                  const lang = LanguageEnum[ext] || LanguageEnum.md;
                  console.log(lang, ext)
                  dispatch(setFileLanguage(lang));
                } catch {
                  alert("Unable to decode file content");
                }
              }}
            >
              {getFileIcon(name)}
              <span className="text-sm truncate">{name}</span>
            </div>
          </li>
        );
      } else {
        const isCollapsed = collapsed[fullPath];
        const hasChildren = Object.keys(value).length > 0;
        return (
          <li key={fullPath} className="select-none">
            <div
              className="flex items-center py-1 px-2 mx-1 rounded cursor-pointer hover:bg-gray-700/50 transition-colors duration-150"
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
              onClick={() => toggleFolder(fullPath)}
            >
              {hasChildren &&
                (isCollapsed ? (
                  <ChevronRight className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                ))}
              {!hasChildren && <div className="w-4 mr-1" />}
              {isCollapsed ? (
                <Folder className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
              ) : (
                <FolderOpen className="w-4 h-4 mr-2 text-blue-300 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-200 truncate">{name}</span>
            </div>
            {!isCollapsed && hasChildren && <ul>{renderFS(value, fullPath, depth + 1)}</ul>}
          </li>
        );
      }
    });
  };

  return (
    <div className="bg-[#181818] h-full border-r border-gray-700 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-700">
        <h2 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Explorer</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="py-2">
          <ul className="space-y-0.5">
            {Object.keys(fsData).length > 0 ? renderFS(fsData) : <p className="text-gray-500 px-4">Loading FS…</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileSystemPanel;
