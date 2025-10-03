"use client";
import React, { useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import EditorNavBar from "./EditorNavBar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { updateFileContent } from "@/store/Reducers/fsSlice";
import MediaDisplay from "./MediaDisplay";
import ReactMarkdown from "react-markdown";
import MarkDownPreview from "./MarkDownPreview";

function AppEditor() {
  const dispatch = useAppDispatch();
  const { selectedFile, selectedFileContent, selectedLanguage } = useAppSelector(
    (state) => state.fs
  );
  const [isMedia, setIsMedia] = React.useState<boolean>(false);
  const [showMd, setShowMd] = React.useState<boolean>(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && selectedFile !== null) {
      editorRef.current.setValue(selectedFileContent || "");
    }
  }, [selectedFile]);

  // Editor mount handler
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Ctrl+S save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (selectedFile) {
        const value = editor.getValue();
        dispatch(updateFileContent({ path: selectedFile, content: value }));
      }
    });
  };

  // Detect media type by extension
  useEffect(() => {
    if (!selectedFile) {
      setIsMedia(false);
      return;
    }
    const extension = selectedFile.split(".").pop()?.toLowerCase();
    const imageFormats = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "tiff"];
    setIsMedia(extension ? imageFormats.includes(extension) : false);
  }, [selectedFile]);

  return (
    <div className="h-full flex flex-col">
      {/* Nav bar */}
      <EditorNavBar showMd={showMd} setShowMd={setShowMd} />

      {/* Editor / Media */}
      {selectedFile ? (
        isMedia ? (
          <MediaDisplay />
        ) : (
          <>
            <Editor
              height={showMd ? "50%" : "100%"} // shrink editor if markdown preview is shown
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
                if (selectedFile) {
                  dispatch(
                    updateFileContent({ path: selectedFile, content: newValue || "" })
                  );
                }
              }}
            />

            {/* Markdown Preview */}
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
