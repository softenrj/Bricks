"use client";
import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import EditorNavBar from "./EditorNavBar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setFileLanguage, updateFileContent } from "@/store/Reducers/fsSlice";

function AppEditor() {
  const dispatch = useAppDispatch();
  const fs = useAppSelector((state) => state.fs);
  const { selectedFile, selectedFileContent, selectedLanguage, tree } = fs;

  const [isEditorReady, setIsEditorReady] = useState(false);
  const webContainerRef = useRef<any>(null);

  // Initialize WebContainer once
  useEffect(() => {
    async function initWebContainer() {
      const { bootWebContainer } = await import("@/store/Reducers/webContainer");
      webContainerRef.current = await bootWebContainer();
    }
    initWebContainer();
  }, []);

  // Populate Monaco from FS tree
  useEffect(() => {
    async function setupEditor() {
      if (Object.keys(tree).length > 0) {
        const mod = await import("@/service/monacoFeeder.client");
        await mod.populateMonacoFromFS(tree);
        setIsEditorReady(true);
      }
    }
    setupEditor();
  }, [tree]);

  // Handle file selection
  useEffect(() => {
    if (selectedFile) {
      // You can set language based on file extension
      const ext = selectedFile.split(".").pop() || "";
      const langMap: Record<string, string> = {
        ts: "typescript",
        tsx: "typescript",
        js: "javascript",
        jsx: "javascript",
        css: "css",
        html: "html",
        md: "markdown",
      };
      dispatch(setFileLanguage(langMap[ext] as any || "plaintext"));
    }
  }, [selectedFile, dispatch]);

  if (!isEditorReady) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <EditorNavBar />
      <Editor
        height="100%"
        value={selectedFileContent || ""}
        language={selectedLanguage}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
        }}
        onChange={(newValue) => {
          if (selectedFile) {
            dispatch(updateFileContent({ path: selectedFile, content: newValue || "" }));
          }
        }}
      />
    </div>
  );
}

export default AppEditor;
