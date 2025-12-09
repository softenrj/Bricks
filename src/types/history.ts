export interface IBricksHistry {
    _id: string;
    userId: string;
    projectId?: string;
    type: string;
    description: string;
    createAt: Date;
    updatedAt: Date;
}