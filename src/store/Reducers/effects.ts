// Copyright (c) 2025 Raj 
// See LICENSE for details.

import { EffectEnum } from "@/types/event"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface EventEffectState {
  effect: EffectEnum | null,
  lyrics: { time: number, text: string }[],
  lyricsIdx: number
}

const STORAGE_KEY = "Bricks:event-effects"

const defaultState: EventEffectState = {
  effect: null,
  lyrics: [],
  lyricsIdx: -1
}

const loadFromLocalStorage = (): EventEffectState => {
  if (typeof window === "undefined") return defaultState

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultState
  } catch {
    return defaultState
  }
}

const saveToLocalStorage = (state: EventEffectState) => {
  try {
    const { lyricsIdx, ...persistentState } = state; 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState))
  } catch {
    // ignore
  }
}

const initialState: EventEffectState = loadFromLocalStorage()

const eventEffectSlice = createSlice({
  name: "event-effects",
  initialState,
  reducers: {
    setEffect(state, action: PayloadAction<EffectEnum | null>) {
      state.effect = action.payload
      saveToLocalStorage(state)
    },

    setLyrics(state, action: PayloadAction<{ time: number, text: string }[]>) {
      state.lyrics = action.payload
      saveToLocalStorage(state)
    },

    setLyricsIdx(state, action: PayloadAction<number>) {
      state.lyricsIdx = action.payload
    },

    clearEffect(state) {
      console.log("first")
      state.effect = null
      saveToLocalStorage(state)
    },
  },
})

export const { setEffect, clearEffect, setLyrics, setLyricsIdx } = eventEffectSlice.actions
export default eventEffectSlice.reducer