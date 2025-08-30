"use client";
import React, { useEffect, useRef, useState } from "react";
import { Terminal, Play, RotateCcw, X, Settings, ChevronDown } from "lucide-react";

type Log = { 
  text: string; 
  type: "stdout" | "info" | "error" | "success" | "command";
  timestamp?: Date;
};

type FSData = {
  [key: string]: string | FSData;
};

interface TerminalPanelProps {
  setStaterFile: (fs: FSData) => void;
}

function TerminalPanel({ setStaterFile }: TerminalPanelProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef<WritableStreamDefaultWriter<any> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    terminalInputRef.current?.focus();
  };

  // Add log with timestamp
  const addLog = (text: string, type: Log["type"]) => {
    setLogs((prev) => [...prev, { text, type, timestamp: new Date() }]);
  };

  // Recursive FS builder for state
  async function buildFSState(path: string, wc: any): Promise<FSData> {
    const entries = await wc.fs.readdir(path, { withFileTypes: true });
    const result: FSData = {};

    for (const entry of entries) {
      const fullPath = `${path}/${entry.name}`;
      if (entry.isDirectory()) {
        result[entry.name] = await buildFSState(fullPath, wc);
      } else {
        try {
          const content = await wc.fs.readFile(fullPath, "utf-8");
          result[entry.name] = btoa(content);
        } catch (err) {
          result[entry.name] = "";
        }
      }
    }
    return result;
  }

  useEffect(() => {
    async function init() {
      addLog("🔹 Step 1: Booting WebContainer...", "info");
      const { WebContainer } = await import("@webcontainer/api");
      const wc = await WebContainer.boot();
      addLog("✅ WebContainer booted", "success");

      addLog("🔹 Step 2: Running npm create vite@latest...", "info");
      const proc = await wc.spawn("npm", [
        "create",
        "vite@latest",
        ".",
        "--",
        "--template",
        "react-ts",
      ]);

      inputRef.current = proc.input.getWriter();

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(data, "stdout");
          },
        })
      );

      addLog("🔹 Step 3: Waiting for process to finish...", "info");
      const exitCode = await proc.exit;
      addLog(`✅ Step 4: Process finished with code: ${exitCode}`, "success");

      addLog("🔹 Step 5: Building FS state...", "info");
      const fsState = await buildFSState(".", wc);
      setStaterFile(fsState);
      addLog("✅ FS state ready", "success");
    }

    init();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const value = currentCommand.trim();

      if (value.length > 0) {
        addLog(`$ ${value}`, "command");
        inputRef.current.write(value + "\n");
        setCurrentCommand("");
      }
    }
  };

  const clearTerminal = () => {
    setLogs([]);
  };

  const restartProcess = async () => {
    setLogs([]);
    setIsRunning(true);
    
    try {
      addLog("🔄 Restarting WebContainer...", "info");
      const { WebContainer } = await import("@webcontainer/api");
      const wc = await WebContainer.boot();
      addLog("✅ WebContainer restarted", "success");

      const proc = await wc.spawn("npm", [
        "create",
        "vite@latest",
        ".",
        "--",
        "--template",
        "react-ts",
      ]);

      inputRef.current = proc.input.getWriter();

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(data, "stdout");
          },
        })
      );

      const exitCode = await proc.exit;
      addLog(`✅ Process completed with code: ${exitCode}`, "success");

      const fsState = await buildFSState(".", wc);
      setStaterFile(fsState);
      addLog("✅ File system updated", "success");
    } catch (error) {
      addLog(`❌ Error: ${error}`, "error");
    } finally {
      setIsRunning(false);
    }
  };

  const getLogColor = (type: Log["type"]) => {
    switch (type) {
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      case "info": return "text-blue-400";
      case "command": return "text-yellow-400";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header Navigation */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-200">Terminal</span>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-2">
            {isRunning ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Running</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Ready</span>
              </div>
            )}
          </div>

          {/* Lines count */}
          <div className="text-xs text-gray-500">
            {logs.length} lines
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Action Buttons */}
          <button
            onClick={restartProcess}
            disabled={isRunning}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
            title="Restart Process"
          >
            <Play className="w-3 h-3" />
            <span>Restart</span>
          </button>

          <button
            onClick={clearTerminal}
            className="flex items-center px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
            title="Clear Terminal"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
              title="Settings"
            >
              <Settings className="w-3 h-3" />
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            
            {showSettings && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      clearTerminal();
                      setShowSettings(false);
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Clear All Output
                  </button>
                  <button
                    onClick={() => {
                      terminalInputRef.current?.focus();
                      setShowSettings(false);
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Focus Input
                  </button>
                  <button
                    onClick={() => {
                      if (scrollRef.current) {
                        scrollRef.current.scrollTop = 0;
                      }
                      setShowSettings(false);
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Scroll to Top
                  </button>
                  <button
                    onClick={() => {
                      if (scrollRef.current) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                      }
                      setShowSettings(false);
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Scroll to Bottom
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Output Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 bg-black cursor-text font-mono text-xs"
        onClick={focusInput}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500">
            <p>Terminal ready. Type commands below or click Restart to begin.</p>
          </div>
        ) : (
          <div>
            {logs.map((log, i) => (
              <div key={i} className={`${getLogColor(log.type)}`}>
                {log.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-2 bg-black border-t border-gray-800">
        <span className="text-green-400 mr-2 font-mono">$</span>
        <input
          ref={terminalInputRef}
          className="flex-1 bg-black text-green-400 font-mono text-xs outline-none"
          placeholder="Type command..."
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isRunning}
        />
        {currentCommand && (
          <button
            onClick={() => setCurrentCommand("")}
            className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
            title="Clear input"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TerminalPanel;