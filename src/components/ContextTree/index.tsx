// Copyright (c) 2025 Raj 
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
