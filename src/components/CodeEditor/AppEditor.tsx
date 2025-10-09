"use client";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { useRef, useEffect, useMemo, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import EditorNavBar from "./EditorNavBar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setFileChange, updateFileContent } from "@/store/Reducers/fsSlice";
import MediaDisplay from "./MediaDisplay";
import MarkDownPreview from "./MarkDownPreview";

function AppEditor() {
  const dispatch = useAppDispatch();
  const { selectedFile, selectedFileContent, selectedLanguage, openTabs } = useAppSelector(
    (state) => state.fs
  );

  const [showMd, setShowMd] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const currentFileRef = useRef<string | null>(null);

  useEffect(() => {
    currentFileRef.current = selectedFile;
  }, [selectedFile]);

  const isMedia = useMemo(() => {
    const ext = selectedFile?.split(".").pop()?.toLowerCase();
    const imageFormats = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "tiff"];
    return ext ? imageFormats.includes(ext) : false;
  }, [selectedFile]);

  useEffect(() => {
    if (editorRef.current && selectedFileContent !== null) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== selectedFileContent) {
        editorRef.current.setValue(selectedFileContent);
      }
    }
  }, [selectedFile, selectedFileContent]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Disable TS/JS errors AFTER Monaco has loaded
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    // Ctrl+S save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const currentFile = currentFileRef.current;
      if (currentFile) {
        const value = editor.getValue();
        dispatch(updateFileContent({ path: currentFile, content: value }));
        dispatch(setFileChange({ name: currentFile, isEditing: false }));
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <EditorNavBar showMd={showMd} setShowMd={setShowMd} />

      {selectedFile ? (
        isMedia ? (
          <MediaDisplay />
        ) : (
          <>
            <Editor
              height={showMd ? "50%" : "100%"}
              value={selectedFileContent || ""}
              language={selectedLanguage || "plaintext"}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                quickSuggestions: false,
                hover: { enabled: false },
                suggestOnTriggerCharacters: false,
              }}
              onChange={(newValue) => {
                if (
                  (newValue ?? "").replace(/\r\n/g, "\n") !==
                  (selectedFileContent ?? "").replace(/\r\n/g, "\n")
                ) {
                  dispatch(setFileChange({ name: selectedFile!, isEditing: true }));
                }
              }}
            />

            {showMd && selectedFileContent && (
              <MarkDownPreview selectedFileContent={selectedFileContent} />
            )}
          </>
        )
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No file open
        </div>
      )}
    </div>
  );
}

export default AppEditor;
