// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

"use client";

import React, { useMemo } from "react";
import { DependencyInfo } from "../../../types/project.doc";
import { useProjectDependencies } from "@/service/api.project.doc";

function Dependency({ projectId }: { projectId: string }) {
  const { data, isLoading } = useProjectDependencies(projectId);

  const dependencies = useMemo<DependencyInfo[] | null>(() => {
    if (!data?.length) return null;
    return data;
  }, [data]);

  if (isLoading || !dependencies) return null;

  return (
    <div className="w-full max-w-3xl rounded-lg pt-10 text-gray-200">
      <h3 className="mb-3 text-sm font-semibold text-gray-100">
        Dependencies ({dependencies.length})
      </h3>

      {/* Scroll container */}
      <div className="max-h-80 overflow-y-auto pr-1">
        <ul className="space-y-2">
          {dependencies.map((dep) => (
            <li
              key={dep.name}
              className="rounded-md border border-gray-800 bg-[#161b22] p-3 transition hover:bg-[#1f2937]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <a
                      href={dep.npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-400 hover:underline"
                    >
                      {dep.name}
                    </a>
                    <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                      {dep.version}
                    </span>
                  </div>

                  {dep.description && (
                    <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                      {dep.description}
                    </p>
                  )}
                </div>

                {dep.homepage && (
                  <a
                    href={dep.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-gray-200"
                  >
                    Homepage
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dependency;
