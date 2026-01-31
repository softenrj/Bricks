// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ArchProcessState {
  processId: string;
  process: "render" | "complete";
  message: string;
  role: "ai" | "user";
}

const initialState: ArchProcessState[] = [];

const ArchProcessSlice = createSlice({
  name: "arch-process",
  initialState,
  reducers: {
    upsertArchProcess: (
      state,
      action: PayloadAction<ArchProcessState>
    ) => {
      const idx = state.findIndex(
        item => item.processId === action.payload.processId
      );

      if (idx === -1) {
        state.push(action.payload);
      } else {
        state[idx].process = "complete";
      }
    },

    completeArchProcess: (
      state,
      action: PayloadAction<{ processId: string }>
    ) => {
      const item = state.find(
        p => p.processId === action.payload.processId
      );
      if (item) {
        item.process = "complete";
      }
    },
  },
});

export const {
  upsertArchProcess,
  completeArchProcess,
} = ArchProcessSlice.actions;

export default ArchProcessSlice.reducer;
