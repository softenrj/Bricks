import { SOCKET_FILE_RENAME, SOCKET_FILE_UPDATE, SOCKET_NEW_FILE, SOCKET_NEW_FOLDER, SOCKET_REMOVE_FILE } from "@/utils/api/socket.events";
import { getSocket } from "./socket";

const socket = getSocket();

/**
 * 
 * @param name 
 * @param src 
 * @param fsc 
 * @returns 
 */
export const fileUpdate = (name: string,src: string, fsc: string, projectId: string) => {
    if (!socket) return ;
    const encodedContent = Buffer.from(fsc, "utf-8").toString("base64");
    // Emit the socket event
    socket.emit(SOCKET_FILE_UPDATE, {
        path: src,
        fsContent: encodedContent,
        name: name,
        projectId: projectId
    });
}

/**
 * 
 * @param src 
 * @param oldName 
 * @param name 
 * @returns 
 */
export const fileRename = (src: string,oldName: string, name: string,projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_FILE_RENAME, {
        path: src,
        oldName,
        name,
        projectId: projectId
    })
}

/**
 * 
 * @param src 
 * @param name 
 * @param projectId 
 * @returns 
 */
export const newFileSocket = (src: string, name: string, projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_NEW_FILE, {
        path: src,
        name,
        projectId
    })
}

/**
 * 
 * @param src 
 * @param name 
 * @param projectId 
 * @returns 
 */
export const newFolderSocket = (src: string, name: string, projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_NEW_FOLDER, {
        path: src,
        name,
        projectId
    })
}

/**
 * 
 * @param src 
 * @param name 
 * @returns 
 */
export const removeFile = (src: string, name: string, projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_REMOVE_FILE , {
        path: src,
        name,
        projectId: projectId
    })
}