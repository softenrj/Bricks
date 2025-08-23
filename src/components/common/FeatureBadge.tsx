import React from "react"
import { Badge } from "../ui/badge"
import {
  Timer,
  Mic,
  Zap,
  GitBranch,
  Sparkles,
  Users,
  Globe,
  Terminal,
} from "lucide-react"

function FeatureBadge() {
  return (
    <div className="flex justify-center mt-6 w-full flex-wrap gap-2 max-w-2xl">
      <Badge>
        <Timer className="w-4 h-4 mr-1" /> RealTime
      </Badge>
      <Badge variant="secondary">
        <Mic className="w-4 h-4 mr-1" /> Voice Response
      </Badge>
      <Badge variant="destructive">
        <Zap className="w-4 h-4 mr-1" /> Lightning Fast
      </Badge>
      <Badge>
        <GitBranch className="w-4 h-4 mr-1" /> Context Tree
      </Badge>
      <Badge variant="secondary">
        <Sparkles className="w-4 h-4 mr-1" /> AI Suggestions
      </Badge>
      <Badge variant="default">
        <Users className="w-4 h-4 mr-1" /> Team Collaboration
      </Badge>
      <Badge variant="secondary">
        <Globe className="w-4 h-4 mr-1" /> Browser Based
      </Badge>
      <Badge variant="destructive">
        <Terminal className="w-4 h-4 mr-1" /> Code Execution
      </Badge>
    </div>
  )
}

export default FeatureBadge
