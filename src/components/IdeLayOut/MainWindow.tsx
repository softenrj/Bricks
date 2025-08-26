import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import EditorActionBtn from './EditorActionBtn'
import AppEditor from '../CodeEditor/AppEditor'

function MainWindow() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] rounded-lg border md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={20} maxSize={40} minSize={10}>
                fs system/ diff components
            </ResizablePanel>
            <ResizableHandle />

            <ResizablePanel defaultSize={45}>
                
                <div>
                    <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={75}>
                        <AppEditor />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Terminal</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={35}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Real time execure</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default MainWindow


