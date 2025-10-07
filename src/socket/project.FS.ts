import { SOCKET_FILE_RENAME, SOCKET_FILE_UPDATE, SOCKET_NEW_FILE, SOCKET_NEW_FOLDER, SOCKET_REMOVE_FILE } from "@/utils/api/socket.events";
import { getSocket } from "./socket";

const socket = getSocket();

export const fileUpdate = (name: string,src: string, fsc: string) => {
    if (!socket) return ;
    const encodedContent = Buffer.from(fsc, "utf-8").toString("base64");
    console.log(encodedContent,fsc
    )

    // Emit the socket event
    socket.emit(SOCKET_FILE_UPDATE, {
        path: src,
        fsContent: encodedContent,
        name: name
    });
}

export const fileRename = (src: string,oldName: string, name: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_FILE_RENAME, {
        path: src,
        oldName,
        name
    })
}

export const newFileSocket = (src: string, name: string, projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_NEW_FILE, {
        path: src,
        name,
        projectId
    })
}

export const newFolderSocket = (src: string, name: string, projectId: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_NEW_FOLDER, {
        path: src,
        name,
        projectId
    })
}

export const removeFile = (src: string, name: string) => {
    if (!socket) return ;

    socket.emit(SOCKET_REMOVE_FILE , {
        path: src,
        name
    })
}