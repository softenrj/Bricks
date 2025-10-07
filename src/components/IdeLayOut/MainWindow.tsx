"use client";
import React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import AppEditor from "../CodeEditor/AppEditor";
import TerminalPanel from "../CodeEditor/Terminal";
import PreviewPanel from "../CodeEditor/PreviewTab";
import FileSystemPanel from "../CodeEditor/FileSystemPanel";
import { getProjectDetails, projectFileSystem } from "@/service/api.project";
import { setProjectName, setTree } from "@/store/Reducers/fsSlice";
import { useAppDispatch } from "@/hooks/redux";
import { initialFSWebContainer } from "@/service/webContainer";

function MainWindow({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const getProjectFs = async () => {
    const response1 = await projectFileSystem(projectId);
    const response2 = await getProjectDetails(projectId);
    dispatch(setTree(response1))
    if (response2) dispatch(setProjectName(response2?.name))
    // push to webContainer
    await initialFSWebContainer(response1);
  }

  React.useEffect(() => {
    getProjectFs()
  },[])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border md:min-w-[450px] max-h-[95%]"
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
              <AppEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={35} maxSize={45}>
              <TerminalPanel />
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
