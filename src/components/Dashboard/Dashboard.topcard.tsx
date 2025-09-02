"use client";
import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Lightbulb, Code, TrendingUp } from "lucide-react";
import AiTyper from "../common/AiTyper";


function DashboardAICard() {
  const [showProjectIdea, setShowProjectIdea] = useState(false);

  const recommendations = `
    Focus on refactoring your code into smaller, reusable components. 
    Ensure that proper error handling is implemented for all API calls. 
    Consider using TypeScript or a strict linter to catch errors early in development. 
    Optimize performance by reviewing slow components and unnecessary re-renders.
  `;

  const projectIdeas = [
    "Create a real-time AI assistant that suggests code improvements while coding.",
    "Integrate an AI-powered documentation generator for every project.",
    "Implement a dashboard to track AI recommendations and their usage metrics."
  ];

  return (
    <div className="w-full p-6 space-y-6 border border-gray-700/50 rounded-xl shadow-2xl backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 group relative overflow-hidden">

      {/* Video background */}
      <video
        src="/video/ai-card-bg.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover -z-10 rounded-xl opacity-50"
      />

      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 rounded-xl -z-5"></div>

      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-800/30">
        <Sparkles
          size={22}
          className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-wide text-white group-hover:text-blue-100 transition-colors">
            AI Suggestions
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Powered by advanced AI analysis</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-700/50 bg-gray-800/30">
          <TrendingUp size={12} className="text-green-400" />
          <span className="text-xs text-green-400 font-medium">Active</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="pl-6 pr-4 py-4 bg-gray-800/30 rounded-lg border border-gray-800/30 hover:bg-gray-800/30 transition-all duration-300">
        <div className="flex items-start gap-3 mb-3">
          <Code size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <h3 className="text-sm font-semibold text-blue-100">Code Quality Recommendations</h3>
        </div>
        <div className="text-sm text-gray-300 leading-relaxed pl-7">
          <AiTyper
            messages={[recommendations]}
            typingSpeed={20}
            loop={false}
            cursorColor="#3b82f6"
          />
        </div>
      </div>

      {/* Project Ideas */}
      <div className="space-y-3">
        <button
          onClick={() => setShowProjectIdea(!showProjectIdea)}
          className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-700/30 bg-gray-800/10 hover:bg-gray-800/30 hover:border-gray-600/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Lightbulb
              size={18}
              className={`transition-all duration-300 ${showProjectIdea ? 'text-yellow-400 animate-pulse' : 'text-gray-400'}`}
            />
            <span className="text-sm font-semibold text-white">Project Ideas</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {projectIdeas.length}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 ${showProjectIdea ? 'rotate-180' : ''}`}
          />
        </button>

        {showProjectIdea && (
          <div className="space-y-3 pt-2 transition-all duration-500 ease-in-out">
            {projectIdeas.map((idea, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-gray-700/30 bg-gray-800/20">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-300">{idx + 1}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{idea}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}
export default DashboardAICard;
