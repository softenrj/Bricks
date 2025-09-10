"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import FilterOptions from "./Project.recent.filter";
import { Project } from "@/types/project";

interface Probe {
  listName?: string;
  limit?: number;
  extraOptions?: boolean;
  fetchFun: (limit: number, cursor: Date | null) => Promise<{
    nextCursor: Date | null;
    data: Project[];
  }>;
}

function ProjectList({
  listName = "All Projects",
  limit = 12,
  extraOptions = false,
  fetchFun,
}: Probe) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [nextCursor, setNextCursor] = useState<Date | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load first batch
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await fetchFun(limit, nextCursor);
      if (result.data.length === 0) {
        setHasMore(false);
        return;
      }
      setProjects((prev) => [...prev, ...result.data]);
      setNextCursor(result.nextCursor);
      if (!result.nextCursor) setHasMore(false);
    } catch (err) {
      console.error("Error loading projects:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const onFallBack  = (type: string) => {
    if (type === "LOADMORE" && hasMore) loadMore()
  }

  return (
    <div className="text-gray-100 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
          {listName}
        </p>
        <FilterOptions extraOptions={extraOptions} fallback={onFallBack} />
      </div>

      {/* Grid */}
      <div className="max-w-8xl mx-auto self-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
