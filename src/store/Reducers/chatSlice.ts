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
    setChat: (state, action: PayloadAction<{ chatId: string; messages: Message[] }>) => {
      state.chatId = action.payload.chatId;
      state.messages = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string | null; message: Message }>) => {
      if (state.chatId === action.payload.chatId) {
        state.messages.push(action.payload.message);
      }
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

export const { setChat, addMessage, clearChat, setAiFetching } = chatSlice.actions;
export default chatSlice.reducer;
