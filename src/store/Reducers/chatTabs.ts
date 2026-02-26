// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BricksChat } from "../../../types/chatMessage";

const initialState: BricksChat[] = [];

export const chatTabsSlice = createSlice({
    name: 'chatTabs',
    initialState: initialState,
    reducers: {
        setTabs: (_state, action: PayloadAction<BricksChat[]>) => {
            _state = action.payload;
            return _state;
        },
        addTabs: (state, action: PayloadAction<BricksChat>) => {
            const exists = state.some(tab => tab._id === action.payload._id);
            if (!exists) state.unshift(action.payload);
        },
        appendTabs: (state, action: PayloadAction<BricksChat[]>) => {
            const existingIds = new Set(state.map(tab => tab._id));
            const uniqueNewTabs = action.payload.filter(tab => !existingIds.has(tab._id));
            state.push(...uniqueNewTabs);
        },
    }
});

export const { setTabs, addTabs, appendTabs } = chatTabsSlice.actions;
export default chatTabsSlice.reducer;