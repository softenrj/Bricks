"use client"
import { Plus, Search, MessageSquare, SquarePen } from "lucide-react"
import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Tooltip } from "../common/Tooltip"
import { postApi } from "@/utils/api/common"
import { ApiResponse, PaginatedApiResponse } from "@/types/Api"
import { API_BRICKS_GET_TABS } from "@/utils/api/APIConstant"

interface Tabs {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

function ChatOpContent({ projectId }: { projectId: string }) {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [chats, setChats] = useState<Tabs[]>([])
  const [nextCursor, setNextCursor] = useState<Date | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const limit = 20 // number of items per fetch

  const fetchTabs = async (cursor?: Date) => {
    try {
      const query = cursor ? `?limit=${limit}&cursor=${cursor.toISOString()}` : `?limit=${limit}`
      const response = await postApi<PaginatedApiResponse<Tabs[]>>({
        url: API_BRICKS_GET_TABS + `/${projectId}${query}`
      })

      if (response?.success && response.data) {
        setChats((prev) => [...prev, ...response.data])
        setNextCursor(response.nextCursor || null)
        setHasMore(Boolean(response.nextCursor))
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
      setHasMore(false)
    }
  }

  useEffect(() => {
    fetchTabs() 
  }, [projectId])

  return (
    <div className="w-full h-[75%] px-4 my-6 text-gray-200 font-inter overflow-auto">
      <Tooltip content="New Chat">
        <button
          onClick={() => console.log("🆕 New chat")}
          className="flex my-4 gap-1.5 text-sm items-center"
        >
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

      <InfiniteScroll
        dataLength={chats.length}
        next={() => fetchTabs(nextCursor!)}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-400 text-sm my-2">Loading...</p>}
        height={500} // or the height of your scrollable container
        scrollableTarget="scrollableDiv"
      >
        <div className="flex flex-col gap-1">
          {chats.map((chat) => (
            <button
              key={chat._id}
              onClick={() => setActiveChat(chat._id)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                activeChat === chat._id
                  ? "bg-[#1f1f1f] text-gray-300 border border-transparent"
                  : "hover:bg-[#1f1f1f91] text-gray-300 border border-transparent"
              }`}
            >
              <MessageSquare className="w-4 h-4 opacity-70" />
              <span className="truncate text-sm font-medium">{chat.name}</span>
            </button>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ChatOpContent
