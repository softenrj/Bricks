export interface ISnapshotFile {
    _id: string;
    userId: string;
    projectId: string;
    snapshotId: string;
    path: string;
    content: string;
    action: FileAction;
    createAt: Date;
    updatedAt: Date;
}

export type FileAction = "create" | "modify" | "retain";