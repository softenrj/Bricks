"use client";
import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import EditorNavBar from "./EditorNavBar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { updateFileContent } from "@/store/Reducers/fsSlice";
import { fileUpdate } from "@/socket/project";

function AppEditor() {
  const dispatch = useAppDispatch();
  const fs = useAppSelector((state) => state.fs);
  const { selectedFile, selectedFileContent, selectedLanguage } = fs;

  const editorRef = useRef<any>(null);

  // Mount handler
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure TypeScript and JavaScript for JSX/TSX support
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      allowJs: true,
      checkJs: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      strict: true,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      allowJs: true,
      checkJs: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
    });

    // Enable code suggestions (IntelliSense)
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // Ctrl+S shortcut to save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (selectedFile) {
        const value = editor.getValue();
        dispatch(updateFileContent({ path: selectedFile, content: value }));
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <EditorNavBar />
      <Editor
        height="100%"
        value={selectedFileContent || ""}
        language={selectedLanguage}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
        onChange={(newValue) => {
          // Optional: live update
          if (selectedFile) {
            dispatch(updateFileContent({ path: selectedFile, content: newValue || "" }));
            fileUpdate(newValue)
          }
        }}
      />
    </div>
  );
}

export default AppEditor;
