"use client"
import { Plus, Search, MessageSquare, SquarePen } from "lucide-react"
import React, { useState } from "react"
import { Tooltip } from "../common/Tooltip"

function ChatOpContent() {
    const [activeChat, setActiveChat] = useState<number | null>(null)

    const chats = [
        { id: 1, name: "Bricks AI" },
        { id: 2, name: "Frontend Assistant" },
        { id: 3, name: "Code Review Bot" },
        { id: 41, name: "Team Chat" },
        { id: 42, name: "Team Chat" },
        { id: 44, name: "Team Chat" },
        { id: 0, name: "Team Chat" },
        { id: 8, name: "Team Chat" },
        { id: 6, name: "Team Chat" },
        { id: 5, name: "Team Chat" },
        { id: 89, name: "Team Chat" },
        { id: 40, name: "Team Chat" },
    ]

    return (
        <div className="w-full h-[75%] px-4 my-6 text-gray-200 font-inter overflow-auto">
            <Tooltip content="New Chat">
                <button
                    onClick={() => console.log("🆕 New chat")}
                    className="flex my-4 gap-1.5 text-sm items-center">
                    <SquarePen size={20} />
                    New Chat
                </button>
            </Tooltip>

            {/* Search Bar */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-gray-700 focus-within:border-pink-500 transition-all duration-300 shadow-sm mb-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Search chats..."
                    className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full text-sm"
                />
                <Search className="text-gray-400 hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
            </div>

            <div className="flex flex-col gap-1">
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 text-left ${activeChat === chat.id
                                ? "bg-[#1f1f1f] text-gray-300 border border-transparent"
                                : "hover:bg-[#1f1f1f91] text-gray-300 border border-transparent"
                            }`}
                    >
                        <MessageSquare className="w-4 h-4 opacity-70" />
                        <span className="truncate text-sm font-medium">{chat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ChatOpContent
