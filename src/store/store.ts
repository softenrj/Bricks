import { configureStore } from '@reduxjs/toolkit'
import webContainerSlice from "./Reducers/webContainer"
import fsSlice from "./Reducers/fsSlice"
import userSlice from "./Reducers/user"
import contextSlice from "./Reducers/fileContext"
import chatSlice from "./Reducers/chatSlice"
import chatTabs from "./Reducers/chatTabs"

export const store = configureStore({
  reducer: {
    webContainer: webContainerSlice,
    fs: fsSlice,
    user: userSlice,
    context: contextSlice,
    bricksChat: chatSlice,
    chatTabs: chatTabs
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch