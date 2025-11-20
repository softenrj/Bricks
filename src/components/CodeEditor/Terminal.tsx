"use client";
import React, { useEffect, useRef, useState } from "react";
import { Terminal, RotateCcw, X } from "lucide-react";
import {
  startShell,
  addLog,
  clearLogs,
  sendToShell,
  installDependencies,
  startDevServer,
} from "@/store/Reducers/webContainer";
import { AppDispatch, RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateFileContent } from "@/store/Reducers/fsSlice";
import { initFsWatcherPipeLine } from "@/service/webContainer";

export default function TerminalPanel({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch<AppDispatch>();
  const { logs, status, liveUrl } = useAppSelector(
    (state: RootState) => state.webContainer
  );

  const [currentCommand, setCurrentCommand] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(startShell());
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const focusInput = () => terminalInputRef.current?.focus();

  const handlePackageUpdater = (content: string) => {
    dispatch(updateFileContent({ path: 'package.json', content, projectId }))
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      setCurrentCommand('');
      const command = currentCommand.trim();
      dispatch(addLog({ text: `$ ${command}`, type: "command", timestamp: new Date().toISOString() }));
      await sendToShell(command,dispatch,projectId,handlePackageUpdater);
      setCurrentCommand("");
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      case "info": return "text-blue-400";
      case "command": return "text-yellow-400";
      default: return "text-gray-300";
    }
  };

  const installDependenciesHandler = async () => {
    await initFsWatcherPipeLine(dispatch,projectId, true)
    dispatch(installDependencies())
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#0D0D0D] border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-gray-200">Terminal</span>
          <div className="text-xs text-gray-500">{logs.length} ln.</div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={installDependenciesHandler} className="py-1 px-1 bg-pink-500 hover:bg-pink-700 text-white text-xs rounded">
            npm install
          </button>
          <button onClick={() => dispatch(startDevServer())} className="py-1 px-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded">
            npm run dev
          </button>
          <button onClick={() => dispatch(clearLogs())} className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded">
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Logs */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 bg-black cursor-text font-mono text-xs"
        onClick={focusInput}
      >
        {status === "booting" ? (
          <pre className="text-green-400 whitespace-pre-wrap">
            {`
  ____  _             _     
 |  _ \\| |_   _  __ _| |__  
 | | | | | | | |/ _\` | '_ \\ 
 | |_| | | |_| | (_| | | | |
 |____/|_|\\__,_|\\__, |_| |_|
                 |___/       
    Booting up...
      `}
          </pre>
        ) : logs.length === 0 ? (
          <div className="text-gray-500">Terminal ready.</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={getLogColor(log.type)}>
              {log.text}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex items-center p-2 bg-black border-t border-gray-800">
        <span className="text-green-400 mr-2 font-mono">$</span>
        <input
          ref={terminalInputRef}
          className="flex-1 bg-black text-green-400 font-mono text-xs outline-none"
          placeholder="Type a command"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {currentCommand && (
          <button onClick={() => setCurrentCommand("")} className="ml-2 text-gray-500 hover:text-gray-300">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
