// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"
import { Plus, Search, MessageSquare, SquarePen } from "lucide-react"
import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Tooltip } from "../common/Tooltip"
import { postApi } from "@/utils/api/common"
import { PaginatedApiResponse } from "@/types/Api"
import { API_BRICKS_GET_TABS } from "@/utils/api/APIConstant"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { appendTabs, setTabs } from "@/store/Reducers/chatTabs"
import { setChat } from "@/store/Reducers/chatSlice"
import { getChatHistory } from "@/service/api.project"
import { BricksChat } from "../../../types/chatMessage"
import { useDebounce } from "@/hooks/debounce"

function ChatOpContent({ projectId }: { projectId: string }) {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const chats = useAppSelector(state => state.chatTabs)
  const currentChatId = useAppSelector(state => state.bricksChat).chatId
  const nextCursor = React.useRef<string | null>(null);
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useAppDispatch()
  const limit = 10
  const handleNewChat = () => dispatch(setChat({ chatId: null, messages: [] }));
  const [search, setSearch] = React.useState<string>('');
  const searchDebounce = useDebounce(search, 300);
  const handleSearch = (s: string) => setSearch(s);

  const fetchTabs = async () => {
    if (!hasMore) return;

    try {
      const query = nextCursor.current
        ? `?limit=${limit}&cursor=${encodeURIComponent(nextCursor.current)}&q=${search}`
        : `?limit=${limit}&q=${search}`;


      const response = await postApi<PaginatedApiResponse<BricksChat[]>>({
        url: `${API_BRICKS_GET_TABS}/${projectId}${query}`,
      });

      if (response?.success && response.data) {
        dispatch(appendTabs(response.data));
        nextCursor.current = response.nextCursor ?? null;
        setHasMore(!!response.nextCursor);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setHasMore(false);
    }
  };


  const handleChangeChat = async (chatId: string) => {
    if (chatId == currentChatId) return;
    setActiveChat(chatId);
    const result = await getChatHistory(chatId);
    if (result) {
      dispatch(setChat({ chatId: chatId, messages: result }))
    }
  }

  useEffect(() => {
    fetchTabs()
  }, [projectId])

  useEffect(() => {
    setHasMore(true);
    dispatch(setTabs([]));
    nextCursor.current = null;
    fetchTabs();
  }, [searchDebounce])

  return (
    <div className="w-full h-[90%] px-4 my-6 text-gray-200 font-inter overflow-auto">
      <Tooltip content="New Chat">
        <button
          onClick={handleNewChat}
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
          value={search}
          onChange={(e: any) => handleSearch(e.target.value)}
          placeholder="Search chats..."
          className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full text-sm"
        />
        <Search className="text-gray-400 hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
      </div>

      <InfiniteScroll
        dataLength={chats.length}
        next={fetchTabs}
        hasMore={hasMore}
        height={380}
        loader={null}
      >
        <div className="flex flex-col gap-1">
          {chats.map((chat,idx) => (
            <button
              key={chat._id + idx}
              onClick={() => handleChangeChat(chat._id)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 text-left ${((currentChatId === chat._id) || (currentChatId === chat._id))
                ? "bg-[#1f1f1f] text-gray-300 border border-transparent"
                : "hover:bg-[#1f1f1f91] text-gray-300 border border-transparent"
                }`}
            >
              <span className="truncate text-sm font-medium">{chat.name.replace(/\*/g, '')}</span>
            </button>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ChatOpContent
