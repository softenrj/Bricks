"use client";
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ChevronRight, ChevronDown, Sparkles, Calendar, FileCode } from "lucide-react";
import { getFileIcon } from "@/feature/fileIconsMapper";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type NodeDetails = {
  _id: string;
  projectId: string;
  userId: string;
  name: string;
  path: string;
  type: string;
  isDefault: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
};

type NodeData = {
  label: string;
  hasChildren: boolean;
  expanded?: boolean;
  id?: string;
  details?: NodeDetails;
};

type ContextNodeProps = {
  data: NodeData;
  onExpand?: (id: string) => void;
};

export default function ContextNode({ data, onExpand }: ContextNodeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="relative group w-56 rounded-2xl 
        bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95
        backdrop-blur-xl border-2 border-pink-500/40 
        hover:border-pink-400/80 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]
        transition-all duration-300 ease-out
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      key={data.id}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center space-x-3 px-4 py-3">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 blur-md bg-pink-500/30 rounded-lg" />
            {data?.details?.type === 'folder' ? getFileIcon('file') : getFileIcon(data.label)}
        </div>

        {/* Label with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex-1 min-w-0 cursor-pointer group/label">
              <p
                className="font-semibold text-sm text-white truncate
                  drop-shadow-[0_0_12px_rgba(253,39,135,0.5)]
                  group-hover/label:text-pink-200 transition-colors"
                title="Click for details"
              >
                {data.label}
              </p>
              {data.details && (
                <p className="text-[10px] text-gray-400 truncate mt-0.5 flex items-center gap-1">
                  <FileCode className="w-3 h-3" />
                  {data.details.type}
                </p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 
              border-2 border-pink-500/60 rounded-2xl p-0 shadow-2xl 
              shadow-pink-500/20 backdrop-blur-xl w-80 overflow-hidden"
            sideOffset={8}
          >
            {data.details && (
              <>
                {/* Header */}
                <div className="relative bg-gradient-to-r from-pink-600/20 to-purple-600/20 px-5 py-4 border-b border-pink-500/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg backdrop-blur-sm">
                      {data.details.type === 'folder' ? getFileIcon('file') : getFileIcon(data.label)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base truncate">{data.label}</h4>
                      <p className="text-pink-300/80 text-xs mt-0.5">{data.details.type}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Path */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-pink-400/90">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Path</span>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/50">
                      <code className="text-xs text-gray-300 break-all font-mono">
                        {data.details.path}
                      </code>
                    </div>
                  </div>

                  {/* Version Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Version</span>
                    </div>
                      <span className="text-xs font-bold text-white">v{data.details.version}</span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-gray-300">Updated</span>
                    </div>
                    <span className="text-sm text-pink-400 font-medium">
                      {formatDate(data.details.updatedAt)}
                    </span>
                  </div>

                  {/* Default Badge */}
                  {data.details.isDefault && (
                    <div className="flex items-center justify-center gap-2 px-3 py-2 
                      bg-gradient-to-r from-emerald-600/20 to-teal-600/20 
                      rounded-lg border border-emerald-500/40">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-300">Default File</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>

        {data.hasChildren && (
          <button
            onClick={() => onExpand && onExpand(data.id!)}
            className="flex-shrink-0 p-1.5 rounded-lg 
              bg-pink-500/10 hover:bg-pink-500/25 
              border border-pink-500/30 hover:border-pink-400/60
              shadow-lg shadow-pink-500/10"
            title={data.expanded ? "Collapse" : "Expand"}
          >
            {data.expanded ? (
              <ChevronDown className="w-4 h-4 text-pink-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-pink-300" />
            )}
          </button>
        )}
      </div>

      {/* Enhanced Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f43f5e, #ec4899)",
          border: "2px solid rgba(236, 72, 153, 0.3)",
          boxShadow: "0 0 16px rgba(236, 72, 153, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
          border: "2px solid rgba(59, 130, 246, 0.3)",
          boxShadow: "0 0 16px rgba(59, 130, 246, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)",
        }}
      />
    </div>
  );
}