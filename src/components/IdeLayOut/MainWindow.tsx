// Copyright (c) 2025 Raj 
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
import { projectFileSystem, useProject, useProjectFile } from "@/service/api.project";
import { resetFs, setProjectName, setTree } from "@/store/Reducers/fsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { initialFSWebContainer, stopFSWatcher } from "@/service/webContainer";
import ProcessBar from "../CodeEditor/ProcessBar";
import RealTimePanel from "../common/RealTimePanel";
import FooterController from "../CodeEditor/FooterController";
import { chageWriteTree } from "@/store/Reducers/webContainer";
import ArchPanel from "../ai-elements/ArchPanel";

function MainWindow({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const { data: project } = useProject(projectId);
  const { data: projectFile } = useProjectFile(projectId);
  const archPanel = useAppSelector(state => state.IdeFeatures).ArchForgePanel;

  React.useEffect(() => {
    dispatch(resetFs(projectId));
  }, [dispatch, projectId]);

  React.useEffect(() => {
    if (project) {
      dispatch(setProjectName(project.name));
    }
  }, [project, dispatch]);

  React.useEffect(() => {
    if (!projectFile) return;

    dispatch(setTree(projectFile));
    stopFSWatcher();

    const initFs = async () => {
      await initialFSWebContainer(projectFile, dispatch, projectId);
      dispatch(chageWriteTree(true));
    };

    initFs();
  }, [projectFile, dispatch, projectId]);

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

          <ResizableHandle />

          {archPanel &&  <ResizablePanel defaultSize={30} minSize={25}>
            <ArchPanel projectId={projectId} />
          </ResizablePanel>}

          <RealTimePanel />
        </ResizablePanelGroup>
      </div>

      {/* Bottom Strip */}
      <FooterController projectId={projectId} />
    </div>
  );
}

export default MainWindow;