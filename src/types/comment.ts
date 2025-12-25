export enum BType {
    EVENT = "event",
    PROJECT = "project",
}

export interface IComment {
    _id: string;
    userId: string;
    content: string;
    parentId: string | null;
    userName: string;
    type: BType;
    typeId: string;
    isDeleted: boolean;
    profile: string;
    createdAt: string;
    updatedAt: string;
    replies: number;
}