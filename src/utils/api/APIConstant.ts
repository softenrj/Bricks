// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

// Auth Flow
export const API_BRICKS_SIGN_IN: string = "/user/signIn"

// user
export const API_BRICKS_GET_USRER: string = "/user/bricks-user"
export const API_BRICKS_DAILY_LOGIN: string = "/user/daily-login"
export const API_BRICKS_USER_STATS: string = "/user/bricks-stats"
export const API_BRICKS_USER_PROFILE_PATCH: string = "/user/update"

// project
export const API_BRICKS_NEW_PROJECT: string = "/project/bricks-new-project"
export const API_BRICKS_GET_PROJECTS: string = "/project/projects"
export const API_BRICKS_GET_PROJECT: string = "/project/project"
export const API_BRICKS_GET_RECENT_PROJECT: string = "/project/bricks-recent"
export const API_BRICKS_POST_MARK_STAR: string = "/project/bricks-star"
export const API_BRICKS_DELETE_UNMARK_STAR: string = "/project/bricks-unstar"
export const API_BRICKS_POST_PROJECT_ARCHIEVE: string = "/project/bricks-archieve"
export const API_BRICKS_DELETE_PROJECT_ARCHIEVE: string = "/project/bricks-unarchieve"
export const API_BRICKS_EXPORT_ALL_PROJECTS: string = "/project/bricks-all-projects-list-export"
export const API_BRICKS_EXPORT_ARCH_PROJECTS: string = "/project/bricks-arch-projects-list-export"
export const API_BRICKS_REMOVE_PROJECT: string = "/project/bricks-remove-project"
export const API_BRICKS_GET_PROJECT_FS: string = "/project/bricks-project-files"
export const API_BRICKS_CODE_LENSE: string = "/project/project-code-lense"
export const API_BRICKS_PROJECT_DEPENDENCY_LIST: string = "/project/project-dep"
export const API_BRICKS_PROJECT_DOC: string = "/project/project-doc"

// project Context
export const API_BRICKS_PROJECT_CONTEXT: string = "/context/pxt"
export const API_BRICKS_PROJECT_CHILD: string = "/context/child"

// bricks project chat
export const API_BRICKS_GET_BRICKS_CHATS: string = "/project/bricks-chat-tabs"
export const API_BRICKS_GET_TABS: string = "/chat/tabs"
export const API_BRICKS_PROMPT_RESPONSE: string = "/chat/brick-ai-response"
export const API_BRICKS_GET_CHAT_HISTORY: string = "/chat/bricks-chat-recoll"

// code completion
export const API_BRICKS_CODE_SUGGESION: string = "/project/bricks-code-sugg"
export const API_BRICKS_CODE_COMPLETION: string = "/project/bricks-code-improvement"

// ArchForge
export const API_BRICKS_ARCH_REQUEST: string = "/ai/bricks-arch-forge"
export const API_BRICKS_ARCH_STREAM: string = "/ai/bricks-arch-forge/stream"
export const API_BRICKS_ARCH_SNAP_EXTENED: string = "/ai/bricks-arch/snapshot-extened"
export const API_BRICKS_ARCH_COMMIT: string = "/ai/bricks-arch/snapshot-commit"
export const API_BRICKS_ARCH_ROLLBACK: string = "/ai/bricks-arch/snapshot-rollback"

// History
export const API_BRICKS_USER_HISTORY: string = "/history/user"
export const API_BRICKS_REMOVE_USER_HISTORY: string = "/history/user"
export const API_BRICKS_CLEAN_USER_HISTORY: string = "/history/user"

export const API_BRICKS_PROJECT_HISTORY: string = "/history/project"
export const API_BRICKS_REMOVE_PROJECT_HISTORY: string = "/history/project"
export const API_BRICKS_CLEAN_PROJECT_HISTORY: string = "/history/project-all"

export const API_BRICKS_GET_ALL_USER_HISTORY: string = "/history/user-all"
export const API_BRICKS_GET_ALL_PROJECT_HISTORY: string = "/history/project-all"

// Event
export const API_BRICKS_EVENTS: string = "/event/get"
export const API_BRICKS_LIKE_EVENT: string = "/event/like"
export const API_BRICKS_UNLIKE_EVENT: string = "/event/unlike"

// Comment
export const API_BRICKS_ADD_COMMENT: string = "/comment/new"
export const API_BRICKS_GET_COMMENTS: string = "/comment/comments"
export const API_BRICKS_GET_REPLIES: string = "/comment/replies"
export const API_BRICKS_REMOVE_COMMENT: string = "/comment/remove"