// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdeFeatures {
  codeCompletion: boolean;
  autoSave: boolean;
  realTimePanel: boolean;
}
const defaultState = { codeCompletion: false, autoSave: false, realTimePanel: true }
const loadFromLocalStorage = (): IdeFeatures => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const saved = localStorage.getItem("Bricks:Ide-features");
    return saved ? JSON.parse(saved) : defaultState;
  } catch {
    return defaultState;
  }
};

const saveToLocalStorage = (state: IdeFeatures) => {
  try {
    localStorage.setItem("Bricks:Ide-features", JSON.stringify(state));
  } catch {
    // ignore storage write errors (e.g., quota exceeded)
  }
};

const initialState: IdeFeatures = loadFromLocalStorage();

const IdeFeaturesSlice = createSlice({
  name: "ide-features",
  initialState,
  reducers: {
    toggleCodeCompletion: (state, action: PayloadAction<boolean>) => {
      state.codeCompletion = action.payload;
      saveToLocalStorage(state);
    },
    toggleAutoSave: (state, action: PayloadAction<boolean>) => {
      state.autoSave = action.payload;
      saveToLocalStorage(state);
    },
    togglePanel: (state, action: PayloadAction<boolean>) => {
      state.realTimePanel = action.payload;
      saveToLocalStorage(state);
    }
  },
});

export default IdeFeaturesSlice.reducer;
export const { toggleCodeCompletion, toggleAutoSave, togglePanel } = IdeFeaturesSlice.actions;
