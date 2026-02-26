// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdeFeatures {
  jobId?: string;
  codeCompletion: boolean;
  devServerRefresh?: boolean;
  autoSave: boolean;
  realTimePanel: boolean;
  ArchForgePanel: boolean;
  ArchFloatPanel: boolean;
  snap?: { snapv1Id: string, snapv2Id: string } | null;
  ArchVoice?: boolean;
}
const defaultState = { codeCompletion: false, autoSave: false, realTimePanel: true, ArchForgePanel: false, ArchFloatPanel: false, ArchPanel: true }
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
    },
    toggleDevServerRefresh: (state, action: PayloadAction<void>) => {
      state.devServerRefresh = !state.devServerRefresh;
    },
    toggleArch: (state, action: PayloadAction<boolean>) => {
      state.ArchForgePanel = action.payload;
      if (action.payload) {
        state.ArchFloatPanel = false;
      }
    },
    setArchJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    setSnapIds: (state, action: PayloadAction<{ snapv1Id: string, snapv2Id: string } | null>) => {
      state.snap = action.payload;
    },
    setArchVoiePanel: (state, action: PayloadAction<boolean>) => {
      state.ArchVoice = action.payload;
    },
    setArchFloatPanel: (state, action: PayloadAction<boolean>) => {
      state.ArchFloatPanel = action.payload;
    },
  },
});

export default IdeFeaturesSlice.reducer;
export const { toggleCodeCompletion,toggleDevServerRefresh, toggleAutoSave, togglePanel, toggleArch, setArchJobId, setSnapIds, setArchVoiePanel, setArchFloatPanel } = IdeFeaturesSlice.actions;
