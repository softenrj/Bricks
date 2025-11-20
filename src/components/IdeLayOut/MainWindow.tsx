// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import AppEditor from "../CodeEditor/AppEditor";
import TerminalPanel from "../CodeEditor/Terminal";
import PreviewPanel from "../CodeEditor/PreviewTab";
import FileSystemPanel from "../CodeEditor/FileSystemPanel";
import { getProjectDetails, projectFileSystem } from "@/service/api.project";
import { resetFs, setProjectName, setTree } from "@/store/Reducers/fsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { initialFSWebContainer } from "@/service/webContainer";
import ProcessBar from "../CodeEditor/ProcessBar";
import RealTimePanel from "../common/RealTimePanel";
import FooterController from "../CodeEditor/FooterController";
import { chageWriteTree } from "@/store/Reducers/webContainer";

function MainWindow({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const writing = useAppSelector(state => state.webContainer).writeTree

  const getProjectFs = async () => {
    const response1 = await projectFileSystem(projectId);
    const response2 = await getProjectDetails(projectId);
    dispatch(setTree(response1));
    if (response2) dispatch(setProjectName(response2?.name));
    await initialFSWebContainer(response1);
    dispatch(chageWriteTree(false))
  };

  React.useEffect(() => {
    dispatch(resetFs(projectId))
    getProjectFs();
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Main resizable area */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full border md:min-w-[450px]"
        >
          {/* Left FS */}
          <ResizablePanel defaultSize={15} maxSize={25} minSize={10}>
            <FileSystemPanel projectId={projectId} />
          </ResizablePanel>
          <ResizableHandle />

          {/* Editor + Terminal */}
          <ResizablePanel defaultSize={45}>
            <div className="flex flex-col h-full">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={75}>
                  <AppEditor projectId={projectId} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={35} maxSize={45}>
                  <TerminalPanel projectId={projectId} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Preview */}
          <ResizablePanel defaultSize={35}>
            <div className="flex flex-col h-full">
              <PreviewPanel />
              <ProcessBar />
            </div>
          </ResizablePanel>

          <RealTimePanel />
        </ResizablePanelGroup>
      </div>

      {/* Bottom Strip */}
      <FooterController />
    </div>
  );
}

export default MainWindow;
