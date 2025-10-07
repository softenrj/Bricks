"use client";
import React from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteFile,
  fetchFsTree,
  FSData,
  newFile,
  newFolder,
  renameFileName,
  setActivepath,
  setFileContent,
  setFileLanguage,
  setSelectedFile,
} from "@/store/Reducers/fsSlice";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { getFileIcon } from "@/feature/fileIconsMapper";
import FScontroller from "./FScontroller";
import { FileContext } from "../common/FileContext";

type CreatingState = {
  parentPath: string;
  type: "file" | "folder";
};

function FileSystemPanel({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const fsData = useAppSelector((s) => s.fs.tree);
  const selectedFile = useAppSelector((s) => s.fs.selectedFile);
  const currentActivePath = useAppSelector((s) => s.fs.activePath);

  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const [editingPath, setEditingPath] = React.useState<string | null>(null);
  const [newName, setNewName] = React.useState<string>("");
  const [creating, setCreating] = React.useState<CreatingState | null>(null);
  const [fileName, setFileName] = React.useState("New File");

  React.useEffect(() => {
    if (Object.keys(fsData).length === 0) {
      dispatch(fetchFsTree());
    }
  }, [dispatch, fsData]);

  const toggleFolder = (path: string) => {
    setCollapsed((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleFolderClick = (fullPath: string) => {
    toggleFolder(fullPath);
    dispatch(setActivepath(fullPath));
  };

  const handleRename = (fullPath: string) => {
    dispatch(renameFileName({ oldPath: fullPath, newName }));
    setEditingPath(null);
  };

  const renameRequest = (path: string, name: string) => {
    setNewName(name);
    setEditingPath(path);
  };

  const removeFile = (fullPath: string, name: string) => {
    dispatch(deleteFile({ fullPath, name }));
  };

  const startCreating = (parentPath: string, type: "file" | "folder") => {
    setFileName(type === "file" ? "New File" : "New Folder");
    setCreating({ parentPath, type });
  };

  const handleCreateFile = (parentPath: string, name: string, type: "file" | "folder") => {
    if (!name.trim()) return;
    const normalized = parentPath === "" ? "." : parentPath;
    if (type === "file") dispatch(newFile({ parentPath: normalized, name, projectId }));
    else dispatch(newFolder({ parentPath: normalized, name, projectId }));
    setCreating(null);
    setFileName("New File");
  };

  const renderFile = (name: string, fullPath: string, depth: number) => {
    const isSelected = selectedFile === fullPath;
    return (
      <li key={fullPath} className="select-none">
        <FileContext onRename={renameRequest} onRemove={removeFile} path={fullPath} name={name} onNewFile={() => startCreating(currentActivePath, "file")} onNewFolder={() => startCreating(currentActivePath, "folder")}>
          <div
            className={`group flex items-center gap-2 py-1 px-2 mx-0.5 cursor-pointer transition-all duration-150 relative ${isSelected ? "bg-blue-300/5 text-blue-100" : "hover:bg-gray-700/11 text-gray-300 hover:text-gray-100"
              }`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
            onClick={() => {
              if (!editingPath) {
                dispatch(setSelectedFile(fullPath));
                try {
                  const content = atob(name);
                  dispatch(setFileContent(content));
                  const ext = fullPath.split(".").pop()?.toLowerCase() as keyof typeof LanguageEnum;
                  const lang = LanguageEnum[ext] || LanguageEnum.md;
                  dispatch(setFileLanguage(lang));
                } catch { }
              }
            }}
          >
            {isSelected && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400/40" />}
            {getFileIcon(name)}

            {editingPath === fullPath ? (
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => handleRename(fullPath)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newName.trim()) handleRename(fullPath);
                  if (e.key === "Escape") setEditingPath(null);
                }}
                className="text-xs font-normal text-gray-100 bg-transparent border-none outline-none truncate"
                style={{ padding: 0, margin: 0, lineHeight: "1.25rem", width: "100%" }}
              />
            ) : (
              <span className="text-xs truncate font-normal leading-relaxed">{name}</span>
            )}
          </div>
        </FileContext>
      </li>
    );
  };

  const renderFolder = (name: string, fullPath: string, data: FSData, depth: number) => {
    const isCollapsed = collapsed[fullPath];
    const hasChildren = Object.keys(data).length > 0;

    return (
      <li key={fullPath} className="select-none">
        <div
          className="group flex items-center gap-2 py-1.5 px-2 mx-0.5 cursor-pointer hover:bg-gray-700/30 transition-all duration-150"
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => handleFolderClick(fullPath)}
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

          {isCollapsed ? <Folder className="w-4.5 h-4.5 text-sky-400 flex-shrink-0" /> : <FolderOpen className="w-4.5 h-4.5 text-sky-300 flex-shrink-0" />}
          <span className="text-sm text-gray-200 group-hover:text-gray-100 truncate font-medium leading-relaxed">{name}</span>
        </div>

        {!isCollapsed && (
          <ul className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/30" />
            {hasChildren && Object.entries(data).sort(([aName, aValue], [bName, bValue]) => {
              const aIsFolder = typeof aValue !== "string";
              const bIsFolder = typeof bValue !== "string";
              if (aIsFolder && !bIsFolder) return -1;
              if (!aIsFolder && bIsFolder) return 1;
              return aName.localeCompare(bName);
            }).map(([childName, childValue]) =>
              typeof childValue === "string" ? renderFile(childName, `${fullPath}/${childName}`, depth + 1) : renderFolder(childName, `${fullPath}/${childName}`, childValue, depth + 1)
            )}

            {/* Render input under folder if creating */}
            {creating?.parentPath === fullPath && (
              <li key={`${fullPath}/__new`}>
                <input
                  autoFocus
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  onBlur={() => setCreating(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && fileName.trim()) handleCreateFile(fullPath, fileName, creating.type);
                    if (e.key === "Escape") setCreating(null);
                  }}
                  className="text-xs font-normal text-gray-100 bg-transparent border-none outline-none truncate px-4 py-1"
                />
              </li>
            )}
          </ul>
        )}
      </li>
    );
  };

  const renderTree = () => {
    return (
      <>
        {creating?.parentPath === "." && (
          <li key="__root_new">
            <input
              autoFocus
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onBlur={() => setCreating(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && fileName.trim()) handleCreateFile(".", fileName, creating.type);
                if (e.key === "Escape") setCreating(null);
              }}
              className="text-xs font-normal text-gray-100 bg-transparent border-none outline-none truncate px-4 py-1"
            />
          </li>
        )}

        {Object.entries(fsData).length === 0 ? (
          <div className="px-3 py-6 text-center">
            <p className="text-sm text-gray-500">Loading file system...</p>
          </div>
        ) : (
          Object.entries(fsData)
            .sort(([aName, aValue], [bName, bValue]) => {
              const aIsFolder = typeof aValue !== "string";
              const bIsFolder = typeof bValue !== "string";
              if (aIsFolder && !bIsFolder) return -1;
              if (!aIsFolder && bIsFolder) return 1;
              return aName.localeCompare(bName);
            })
            .map(([name, value]) =>
              typeof value === "string" ? renderFile(name, name, 0) : renderFolder(name, name, value, 0)
            )
        )}
      </>
    );
  };

  return (
    <div className="bg-[#0D0D0D] h-full border-r border-gray-700/60 flex flex-col">
      <div className="px-3 py-2 border-b border-gray-700/60">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Explorer</h2>
      </div>

      <FScontroller
        onNewFile={() => startCreating(currentActivePath, "file")}
        onNewFolder={() => startCreating(currentActivePath, "folder")}
      />

      <div className="flex-1 overflow-auto">
        <div className="py-1.5">
          <ul className="space-y-px">{renderTree()}</ul>
        </div>
      </div>
    </div>
  );
}

export default FileSystemPanel;
