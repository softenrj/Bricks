// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../../types/chatMessage";

interface ChatState {
  chatId: string  | null;
  fetch: boolean;
  messages: Message[];
}

const initialState: ChatState = {
  chatId: null,
  fetch: false,
  messages: []
}

const chatSlice = createSlice({
  name: "bricks:chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<{ chatId: string | null; messages: Message[] }>) => {
      // null means new Chat
      state.chatId = action.payload.chatId;
      state.messages = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string | null; message: Message }>) => {
      if (state.chatId === action.payload.chatId) {
        state.chatId = action.payload.chatId
      }
      state.messages.push(action.payload.message);
    },
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },

    setAiFetching: (state, action: PayloadAction<boolean>) => {
        state.fetch = action.payload;
        return state;
    },
    clearChat: (state) => {
      state.chatId = '';
      state.messages = [];
    }
  }
});

export const { setChat, addMessage, clearChat, setAiFetching, setChatId } = chatSlice.actions;
export default chatSlice.reducer;
