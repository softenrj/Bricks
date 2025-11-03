// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
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
import { configureMonacoTailwindcss, tailwindcssData } from 'monaco-tailwindcss'

function AppEditor({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const { selectedFile, selectedFileContent, selectedLanguage } = useAppSelector((state) => state.fs);
  const [showMd, setShowMd] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const currentFileRef = useRef<string | null>(null);
  const selectedFileContentRef = useRef<string | null>(null);
  const codeCompletion = useAppSelector(state => state.IdeFeatures).codeCompletion;
  const inlineProviderRef = useRef<any>(null);
  const isAutoSave = useAppSelector(state => state.IdeFeatures).autoSave

  window.MonacoEnvironment = {
    getWorker(moduleId, label) {
      switch (label) {
        case 'editorWorkerService':
          return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url))
        case 'css':
        case 'less':
        case 'scss':
          return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url))
        case 'handlebars':
        case 'html':
        case 'razor':
          return new Worker(
            new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url)
          )
        case 'json':
          return new Worker(
            new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url)
          )
        case 'javascript':
        case 'typescript':
          return new Worker(
            new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url)
          )
        case 'tailwindcss':
          return new Worker(new URL('monaco-tailwindcss/tailwindcss.worker', import.meta.url))
        default:
          throw new Error(`Unknown label ${label}`)
      }
    }
  }

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

  // Update inline suggestions when codeCompletion changes
  useEffect(() => {
    if (inlineProviderRef.current) {
      // The provider is already registered, and the callback will check codeCompletion
      // No need to re-register, as the callback depends on codeCompletion
    }
  }, [codeCompletion]);



  const codeCompletionSugg = async (snipts: string) => {
    if (codeCompletion) {
      return await __getSuggestion(snipts)
    }
    return null;
  }

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
          const suggestion = await codeCompletionSugg(beforeCursor);

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

    // Enable TS/TSX IntelliSense
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      allowJs: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      noEmit: true,
    })

    // Enable JSX in plain JS files
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowJs: true,
      module: monaco.languages.typescript.ModuleKind.ESNext,
    });

    // suppress built-in errors if you use virtual files
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    monaco.languages.css.cssDefaults.setOptions({
      data: {
        dataProviders: {
          'tailwindcss': tailwindcssData
        }
      }
    })

    configureMonacoTailwindcss(monaco)


    // Ctrl + S → save file
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const currentFile = currentFileRef.current;
      if (!currentFile) return;

      const value = editor.getValue();
      const savedValue = selectedFileContentRef.current;

      if (
        savedValue &&
        value.replace(/\r\n/g, "\n").trimEnd() === savedValue.replace(/\r\n/g, "\n").trimEnd()
      ) {
        return;
      }

      dispatch(updateFileContent({ path: currentFile, content: value, projectId}));
      dispatch(setFileChange({ name: currentFile, isEditing: false }));
    });

    // Register inline suggestion provider
    const provider = registerInlineSuggestions();
    inlineProviderRef.current = provider;

    // Dispose provider on editor disposal
    editor.onDidDispose(() => provider?.dispose());
  };

  const autoSave = (value: string) => {
    if (!selectedFile) return ;
    dispatch(updateFileContent({ path: selectedFile, content: value, projectId}));
      dispatch(setFileChange({ name: selectedFile, isEditing: false }));
  }



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
              path={selectedFile}
              onMount={handleEditorDidMount}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                quickSuggestions: true,
                hover: { enabled: true },
                suggestOnTriggerCharacters: true,
                tabCompletion: "on",
                smoothScrolling: true,
                autoClosingBrackets: 'always'
              }}
              onChange={(newValue) => {
                if ((newValue ?? "").replace(/\r\n/g, "\n") !== (selectedFileContent ?? "").replace(/\r\n/g, "\n")) {
                  dispatch(setFileChange({ name: selectedFile!, isEditing: true }));
                  if (isAutoSave && newValue ) autoSave(newValue)
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
