import { Lightbulb, Code } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { createNewProject } from "@/service/api.project";
import { TechLanguage, WebTech } from "@/types/project";
import { useRouter } from "next/navigation";

function NewProjectCard({ onClose }: { onClose: () => void }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState<TechLanguage>(TechLanguage.JS);
    const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter();

  const handleCreate = async () => {
    setLoading(true);
    const res = await createNewProject(projectName, description, WebTech.VITE, language)
    setLoading(false);
    if (res) handleCancel(res._id);
  };

  const handleCancel = (projectId?: string) => {
    setProjectName("");
    setDescription("");
    setLanguage(TechLanguage.JS);
    if (projectId) router.push(`/${projectId}/editor`);
  };


  const fieldClass =
    "w-full px-3 py-2 rounded-lg border border-gray-700/40 bg-gray-800/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300";

  return (
    <div className="flex flex-col gap-5 relative z-10">

      {/* Project Name */}
      <div>
        <label className="text-sm text-pink-400 mb-1 flex items-center gap-2">
          <Lightbulb size={16} className="text-yellow-400 animate-pulse" />
          Project Name
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className={fieldClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-pink-400 mb-1 block font-semibold">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project..."
          rows={3}
        />
      </div>

      {/* Language */}
      <div>
        <label className="text-sm text-pink-400 mb-1 font-semibold flex items-center gap-1">
          <Code size={14} className="text-blue-400" />
          Language
        </label>
        <Select value={language} onValueChange={(val) => setLanguage(val as TechLanguage)}>
          <SelectTrigger className="w-full border border-gray-700/40 bg-gray-800/40 rounded-lg text-white placeholder:text-gray-400 hover:bg-gray-800/50 hover:border-gray-600/50 focus:ring-2 focus:ring-pink-400 transition-all duration-300">
            {language === "JS" ? "JavaScript" : language === "TS" ? "TypeScript" : "System"}
          </SelectTrigger>
          <SelectContent className="bg-gray-800/40 border border-gray-700/40 rounded-lg text-white">
            <SelectItem value={TechLanguage.JS}>JavaScript</SelectItem>
            <SelectItem value={TechLanguage.TS}>TypeScript</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onClick={() => handleCancel()}
          disabled={loading}
          className="px-5 py-2 border border-gray-700/40 text-white rounded-lg hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          className="px-5 py-2 bg-gradient-to-r from-[#FD2787]/90 to-pink-500/80 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
}

export default NewProjectCard;
