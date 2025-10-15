"use client";
import * as monaco from 'monaco-editor'
import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import EditorNavBar from "./EditorNavBar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setFileChange, updateFileContent } from "@/store/Reducers/fsSlice";
import MediaDisplay from "./MediaDisplay";
import MarkDownPreview from "./MarkDownPreview";
import { __getSuggestion } from "@/service/api.project";
import { isEqual } from 'lodash'

function AppEditor() {
  const dispatch = useAppDispatch();
  const { selectedFile, selectedFileContent, selectedLanguage } = useAppSelector((state) => state.fs);
  const [showMd, setShowMd] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const currentFileRef = useRef<string | null>(null);
  const [tailwindModule, setTailwindModule] = useState<any>(null);
  const selectedFileContentRef = useRef<string | null>(null);

  useEffect(() => {
    // Only run on client
    import("monaco-tailwindcss").then((mod) => {
      setTailwindModule(mod);
    });
  }, []);

  useEffect(() => {
    selectedFileContentRef.current = selectedFileContent;
  }, [selectedFileContent]);

  // Keep track of current file
  useEffect(() => {
    currentFileRef.current = selectedFile;
  }, [selectedFile]);

  // Determine if selected file is media
  const isMedia = useMemo(() => {
    const ext = selectedFile?.split(".").pop()?.toLowerCase();
    const imageFormats = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "tiff"];
    return ext ? imageFormats.includes(ext) : false;
  }, [selectedFile]);

  // Sync editor content with selected file content
  useEffect(() => {
    if (editorRef.current && selectedFileContent !== null) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== selectedFileContent) {
        editorRef.current.setValue(selectedFileContent);
      }
    }
  }, [selectedFile, selectedFileContent]);

  // Inline suggestion provider
  const registerInlineSuggestions = useCallback(() => {
    if (!monacoRef.current || !editorRef.current) return;

    const monaco = monacoRef.current;
    const language = selectedLanguage || "javascript";

    const provider = monaco.languages.registerInlineCompletionsProvider(language, {
      provideInlineCompletions: async (model, position, context, token) => {
        try {
          const code = model.getValue();
          const cursorOffset = model.getOffsetAt(position);

          // Send only few lines before cursor as context
          const beforeCursor = code.slice(0, cursorOffset);
          const suggestion = await __getSuggestion(beforeCursor);

          if (!suggestion || !suggestion.trim()) {
            return { items: [], dispose: () => { } };
          }

          const suggestionLines = suggestion.split("\n");
          return {
            items: [
              {
                insertText: suggestion.trim(),
                range: {
                  startLineNumber: position.lineNumber,
                  startColumn: position.column,
                  endLineNumber: position.lineNumber + suggestionLines.length - 1,
                  endColumn:
                    suggestionLines.length > 1
                      ? suggestionLines[suggestionLines.length - 1].length + 1
                      : position.column + suggestion.length,
                },
              },
            ],
            dispose: () => { },
          };
        } catch (err) {
          console.error("Inline suggestion error:", err);
          return { items: [], dispose: () => { } };
        }
      },

      handleItemDidShow: () => { },
      freeInlineCompletions: () => { },
    });

    return provider;
  }, [selectedLanguage]);


  // Editor mount
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Disable TS/JS errors
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    // if (tailwindModule) {
    //   tailwindModule.configureMonacoTailwindcss(monaco, {
    //     languageSelector: ["html", "javascript", "typescript", "jsx", "tsx"],
    //     tailwindConfig: "/tailwind.config.js",
    //     worker: "/monaco/tailwindcss.worker.js",
    //     enableWorker: false
    //   });

    //   // Optional: CSS data provider for extra completion
    //   monaco.languages.css.cssDefaults.setOptions({
    //     data: {
    //       dataProviders: { tailwindcssData: tailwindModule.tailwindcssData },
    //     },
    //   });
    // }

    // Ctrl + S → save file
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const currentFile = currentFileRef.current;
      if (!currentFile) return;

      const value = editor.getValue();
      const savedValue = selectedFileContentRef.current;

      // Prevent save if no actual content change (normalized for line endings)
      if (
        savedValue &&
        value.replace(/\r\n/g, "\n").trimEnd() === savedValue.replace(/\r\n/g, "\n").trimEnd()
      ) {
        console.log("No changes detected — skipping save.");
        return;
      }

      dispatch(updateFileContent({ path: currentFile, content: value }));
      dispatch(setFileChange({ name: currentFile, isEditing: false }));
    });

    // Register inline suggestion provider
    const provider = registerInlineSuggestions();

    // Dispose provider on editor disposal
    editor.onDidDispose(() => provider?.dispose());
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
                tabCompletion: "on",
              }}
              onChange={(newValue) => {
                if ((newValue ?? "").replace(/\r\n/g, "\n") !== (selectedFileContent ?? "").replace(/\r\n/g, "\n")) {
                  dispatch(setFileChange({ name: selectedFile!, isEditing: true }));
                }
              }}
            />

            {showMd && selectedFileContent && <MarkDownPreview selectedFileContent={selectedFileContent} />}
          </>
        )
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">No file open</div>
      )}
    </div>
  );
}

export default AppEditor;
