import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<IUser> = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserdata: (_state, action: PayloadAction<IUser>) => {
        _state = action.payload as any
        return _state
    },
    clearUser: () => {},
  },
});

export const { setUserdata, clearUser } = userSlice.actions;
export default userSlice.reducer;
