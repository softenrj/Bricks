// Copyright (c) 2025 Raj 
// See LICENSE for details.

import React, { useMemo } from 'react';
import { CodeLense } from '../../../types/project.doc';
import { useCodeLense } from '@/service/api.project.doc';
import Dependency from './Dependency';


const _COLORS: Record<string, string> = {
  typescript: '#3178c6',
  javascript: '#f1e05a',
  css: '#563d7c',
  html: '#e34c26',
  python: '#3572A5',
  java: '#b07219',
  go: '#00ADD8',
  rust: '#dea584',
  shell: '#89e051',
  vue: '#41b883',
  react: '#61dafb',
  json: '#292929',
  markdown: '#083fa1',
  xml: '#0060ac',
};

const getLangColor = (lang: string) =>
  _COLORS[lang.toLowerCase()] || '#d9d9d9';

const formatLang = (lang: string) =>
  lang.charAt(0).toUpperCase() + lang.slice(1);

function DepPanel({ projectId }: { projectId: string }) {
  const { data, isLoading } = useCodeLense(projectId);

  const languages = useMemo<CodeLense[] | null>(() => {
    if (!data?.length) return null;
    return [...data].sort((a, b) => b.per - a.per);
  }, [data]);

  if (isLoading || !languages) return null;

  return (
    <div className="w-full max-w-2xl rounded-lg border border-gray-200/12 bg-[#0d1117] p-4">
      <h3 className="mb-3 text-white text-sm font-semibold">
        Languages
      </h3>

      {/* Progress Bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
        {languages.map((item) => (
          <div
            key={item.lan}
            style={{
              width: `${item.per}%`,
              backgroundColor: getLangColor(item.lan),
            }}
            className="h-full transition-all duration-700 ease-out hover:opacity-90 first:rounded-l-full last:rounded-r-full"
            title={`${formatLang(item.lan)}: ${item.per}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4">
        {languages.map((item) => (
          <div key={item.lan} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: getLangColor(item.lan) }}
            />
            <span className="text-xs font-semibold text-gray-100">
              {formatLang(item.lan)}
            </span>
            <span className="text-xs text-gray-300">
              {item.per}%
            </span>
          </div>
        ))}
      </div>
      <Dependency projectId={projectId} />
    </div>
  );
}

export default DepPanel;
