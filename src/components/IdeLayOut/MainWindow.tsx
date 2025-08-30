"use client";
import React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import AppEditor from "../CodeEditor/AppEditor";
import TerminalPanel from "../CodeEditor/Terminal";
import PreviewPanel from "../CodeEditor/PreviewTab";
import FileSystemPanel from "../CodeEditor/FileSystemPanel";

function MainWindow() {
  const [data, setData] = React.useState<any>({}); // FS state

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border md:min-w-[450px] max-h-[95%]"
    >
      {/* Left FS */}
      <ResizablePanel defaultSize={20} maxSize={40} minSize={10}>
        <FileSystemPanel fsData={data} />
      </ResizablePanel>
      <ResizableHandle />

      {/* Editor + Terminal */}
      <ResizablePanel defaultSize={45}>
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <AppEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <TerminalPanel setStaterFile={(fs: any) => setData(fs)} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
      <ResizableHandle />

      {/* Preview */}
      <ResizablePanel defaultSize={35}>
        <PreviewPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default MainWindow;
