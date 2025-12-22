// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import { EffectEnum } from "@/types/event"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface EventEffectState {
  effect: EffectEnum | null
}

const STORAGE_KEY = "Bricks:event-effects"

const defaultState: EventEffectState = {
  effect: null,
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode errors
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

    clearEffect(state) {
      state.effect = null
      saveToLocalStorage(state)
    },
  },
})

export const { setEffect, clearEffect } = eventEffectSlice.actions
export default eventEffectSlice.reducer