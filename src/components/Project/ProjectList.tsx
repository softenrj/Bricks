"use client";
import React, { useEffect, useState, Suspense } from "react";
import ProjectCard from "./ProjectCard";
import FilterOptions from "./Project.recent.filter";
import { Project } from "@/types/project";
import { Filter } from "@/service/api.project";

interface Probe {
  listName?: string;
  limit?: number;
  extraOptions?: boolean;
  fetchFun: (limit: number, cursor: Date | null, filter: Partial<Filter>) => Promise<{
    nextCursor: Date | null;
    data: Project[];
  }>;
  filterMode: 'arch' | 'none'
}

function ProjectList({
  listName = "All Projects",
  limit = 12,
  extraOptions = false,
  fetchFun,
  filterMode = 'none'
}: Probe) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [nextCursor, setNextCursor] = useState<Date | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Partial<Filter>>({})

  // Load first batch
  React.useEffect(() => {
    if (filterMode === 'arch') {
      setFilter({ ach: true })
    } else {
      fetchProjects(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [])


  const fetchProjects = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const cursor = reset ? null : nextCursor;
      const effectiveFilter = filterMode === 'arch'
        ? { ...filter, ach: true }
        : filter;

      const result = await fetchFun(limit, cursor, effectiveFilter);

      if (reset) {
        setProjects(result.data);
      } else {
        setProjects(prev => [...prev, ...result.data]);
      }

      setNextCursor(result.nextCursor);
      setHasMore(!!result.nextCursor);
    } catch (err) {
      console.error("Error loading projects:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectUpdate = (id: string, changes: Project) => {
    setProjects(prev => prev.filter(proj => proj._id !== id));
  };

  const handleProjectDelete = (id: string) => {
    setProjects(prev => prev.filter(proj => proj._id !== id));
  };


  const onFallBack = (type: string) => {
    if (type === "LOADMORE" && hasMore) fetchProjects()
  }

  React.useEffect(() => {
    if (filterMode === 'arch' && filter.ach) {
      fetchProjects(true)
    }
  }, [filter, filterMode])


  React.useEffect(() => {
    fetchProjects(true)
  }, [filter])

  return (
    <div className="text-gray-100 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
          {listName}
        </p>
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterOptions extraOptions={extraOptions} fallback={onFallBack} filter={filter} setFilter={setFilter} />
        </Suspense>
      </div>

      {/* Grid */}
      <div className="max-w-8xl mx-auto self-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project}
              projectUpdate={handleProjectUpdate}
              projectDelete={handleProjectDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
