// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserLocalStorage, setLocalStorage } from "./utils";

const initialState: Partial<IUser> = getUserLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserdata: (_state, action: PayloadAction<IUser>) => {
        _state = action.payload as any;
        setLocalStorage(action.payload);
        return _state
    },
    clearUser: () => {},
  },
});

export const { setUserdata, clearUser } = userSlice.actions;
export default userSlice.reducer;
