export interface IBricksHistry {
    _id: string;
    userId: string;
    projectId?: string;
    type: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}