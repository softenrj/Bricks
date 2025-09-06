import { Lightbulb, Code } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

function NewProjectCard({ onClose }: { onClose: () => void }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("js");

  const handleCreate = () => {
    console.log({ projectName, description, language });
  };

  const handleCancel = () => {
    setProjectName("");
    setDescription("");
    setLanguage("js");
    onClose();
  };

  const fireToast = (e: string) => {
    setLanguage(e)
    toast.success(`you clicked this ${language} don't you`)
  }

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
        <Select value={language} onValueChange={fireToast}>
          <SelectTrigger className="w-full border border-gray-700/40 bg-gray-800/40 rounded-lg text-white placeholder:text-gray-400 hover:bg-gray-800/50 hover:border-gray-600/50 focus:ring-2 focus:ring-pink-400 transition-all duration-300">
            {language === "js" ? "JavaScript" : language === "ts" ? "TypeScript" : "System"}
          </SelectTrigger>
          <SelectContent className="bg-gray-800/40 border border-gray-700/40 rounded-lg text-white">
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="ts">TypeScript</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onClick={handleCancel}
          className="px-5 py-2 border border-gray-700/40 text-white rounded-lg hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          className="px-5 py-2 bg-gradient-to-r from-[#FD2787]/90 to-pink-500/80 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default NewProjectCard;
