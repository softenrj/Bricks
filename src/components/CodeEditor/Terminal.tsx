"use client";
import React, { useEffect, useRef, useState } from "react";
import { Terminal, RotateCcw, X, Globe } from "lucide-react";
import {
  bootWebContainer,
  installDeps,
  startDevServer,
  addLog,
  clearLogs,
  createViteProject,
  sendToProcess,
} from "@/store/Reducers/webContainer";
import { AppDispatch, RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

function TerminalPanel() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { logs, liveUrl, status } = useAppSelector(
    (state: RootState) => state.webContainer
  );

  const [currentCommand, setCurrentCommand] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  const createProject = async () => {
    await dispatch(bootWebContainer());
    await dispatch(createViteProject());
  };

  useEffect(() => {
    createProject();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const focusInput = () => terminalInputRef.current?.focus();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const command = currentCommand.trim();

      dispatch(
        addLog({
          text: `$ ${command}`,
          type: "command",
          timestamp: new Date().toISOString(),
        })
      );

      await sendToProcess(command);

      setCurrentCommand("");
    }
  };

  const runInstall = () => dispatch(installDeps());
  const runDevServer = () => dispatch(startDevServer());
  const clearTerminal = () => dispatch(clearLogs());

  const getLogColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "info":
        return "text-blue-400";
      case "command":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-200">Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            {status === "running" ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Running</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-xs text-gray-400 capitalize">
                  {status}
                </span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500">{logs.length} lines</div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={runInstall}
            disabled={status !== "ready"}
            className="px-2 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white text-xs rounded"
          >
            npm install
          </button>
          <button
            onClick={runDevServer}
            disabled={status !== "ready"}
            className="px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded"
          >
            npm run dev
          </button>
          <button
            onClick={clearTerminal}
            className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
          >
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
        {logs.length === 0 ? (
          <div className="text-gray-500">Terminal ready.</div>
        ) : (
          <div>
            {logs.map((log, i) => (
              <div key={i} className={getLogColor(log.type)}>
                {log.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center p-2 bg-black border-t border-gray-800">
        <span className="text-green-400 mr-2 font-mono">$</span>
        <input
          ref={terminalInputRef}
          className="flex-1 bg-black text-green-400 font-mono text-xs outline-none"
          placeholder="Type command (demo only)"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {currentCommand && (
          <button
            onClick={() => setCurrentCommand("")}
            className="ml-2 text-gray-500 hover:text-gray-300"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TerminalPanel;
