// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { SOCKET_FILE_CREATE_UPDATE, SOCKET_FILE_RENAME, SOCKET_FILE_UPDATE, SOCKET_NEW_FILE, SOCKET_NEW_FOLDER, SOCKET_REMOVE_FILE, SOCKET_REMOVE_FOLDER } from "@/utils/api/socket.events";
import { getSocket } from "./socket";
import { Socket } from "socket.io-client";
import { FSTYPE } from "@/types/project";

let socket: Socket | null;

export const fileUpdate = (name: string,src: string, fsc: string, projectId: string) => {
    if (!socket) socket = getSocket();
    // Emit the socket event
    socket?.emit(SOCKET_FILE_UPDATE, {
        path: src,
        fsContent: fsc,
        name: name,
        projectId: projectId
    });
}

export const folderRemove = (src: string, projectId: string) => {
    if (!socket) socket = getSocket();
    // Emit the socket event
    socket?.emit(SOCKET_REMOVE_FOLDER, {
        path: src,
        projectId: projectId
    });
}

export const fileRename = (src: string,oldName: string, name: string,projectId: string) => {
    if (!socket) socket = getSocket();

    socket?.emit(SOCKET_FILE_RENAME, {
        path: src,
        oldName,
        name,
        projectId: projectId
    })
}

export const newFileSocket = (src: string, name: string, projectId: string, content?: string) => {
    if (!socket) socket = getSocket();

    socket?.emit(SOCKET_NEW_FILE, {
        path: src,
        name,
        projectId,
        content
    })
}


export const newFolderSocket = (src: string, name: string, projectId: string) => {
    if (!socket) socket = getSocket();

    socket?.emit(SOCKET_NEW_FOLDER, {
        path: src,
        name,
        projectId
    })
}

export const removeFile = (src: string, name: string, projectId: string) => {
    if (!socket) socket = getSocket();

    socket?.emit(SOCKET_REMOVE_FILE , {
        path: src,
        name,
        projectId: projectId
    })
}

export const fileUpdateCreate = (src: string, name: string, projectId: string, content: string, type: string) => {
    if (!socket) socket = getSocket();

    socket?.emit(SOCKET_FILE_CREATE_UPDATE , {
        path: src,
        name: name,
        projectId: projectId,
        content: content,
        type: type
    })
}
