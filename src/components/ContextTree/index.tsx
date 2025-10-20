// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import ProjectContext from "./ProjectContext";
import ContextNeurons from "./ContextNeurons";

function Index({ projectId }: { projectId: string }) {

  return (
    <div className="w-full h-full">
      <ProjectContext projectId={projectId} />
      <ContextNeurons />
    </div>
  );
}

export default Index;
