import { BrickHistoryTypeEnum } from "@/service/api.history";
import {
  Cpu,
  FolderTree,
  Code2,
  MessageCircle,
  HelpCircle,
  User,
  Puzzle,
  LucideIcon,
} from "lucide-react"

export const historyIcons: Record<BrickHistoryTypeEnum, { Icon: LucideIcon; color: string }> = {
  ArchForge: { Icon: Cpu, color: "text-purple-400 bg-purple-500/10" },
  FileSystem: { Icon: FolderTree, color: "text-yellow-400 bg-yellow-500/10" },
  CodeCompletion: { Icon: Code2, color: "text-blue-400 bg-blue-500/10" },
  BrickChat: { Icon: MessageCircle, color: "text-pink-400 bg-pink-500/10" },
  unknown: { Icon: HelpCircle, color: "text-gray-400 bg-gray-500/10" },
  user: { Icon: User, color: "text-green-400 bg-green-500/10" },
  project: { Icon: Puzzle, color: "text-orange-400 bg-orange-500/10" },
}
