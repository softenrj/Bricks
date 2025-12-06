export type ProcessSocketType = {
    status: boolean,
    message: string
}

export interface ArchEnginStatusSocket {
    id: string,
    processId: string
    process: "render" | "complete"
    message: string
}

export interface ArchProjectCode {
    fileName: string;
    path: string;
    content: string;
    dependency: string;
    projectId: string;
}