// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import ProjectCard from "../Project/ProjectCard";
import { FolderPlus, Grid, ArrowUpDown, Star } from "lucide-react";
import { Tooltip } from "../common/Tooltip";
import { Project } from "@/types/project";
import { getRecentProjects } from "@/service/api.project";
import Link from "next/link";

function DashboardRecent() {
  const [recent, setRecent] = React.useState<Project[]>([]);

  const fetchRecent = async () => {
    const response = await getRecentProjects();
    if (response) {
      setRecent(response);
    }
  }
  React.useEffect(() => {
    fetchRecent()
  },[])
  return (
    <div className="text-gray-100 py-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        {/* Title */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
          Recent
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 sm:gap-1.5">
          {/* Create New */}
          <Tooltip content="Start a new project">
            <Link href={"/projects?create_new"} className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-[#FD2787]/90 to-pink-500/80 text-white hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all">
              <FolderPlus size={12} className="group-hover:rotate-6 transition-transform" />
              <span>Create</span>
            </Link>
          </Tooltip>

          {/* View All */}
          <Tooltip content="See all projects">
            <Link href={"/projects"} className="group flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 border border-gray-600/20 hover:from-amber-500/10 hover:to-yellow-500/10 hover:text-amber-300 hover:border-amber-500/20 transition-all">
              <Grid size={12} />
              <span>View</span>
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-8xl mx-auto self-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recent.map(item  => (
            <ProjectCard key={item._id} project={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardRecent;
