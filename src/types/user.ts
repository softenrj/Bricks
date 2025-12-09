export interface IUser {
    _id: string;
    uid: string;
    profile: string;
    bio: string;
    penname: string;
    firebaseId: string;
    username: string;
    email: string;
    token: string;
    authType: string;
    createAt: Date;
    updatedAt: Date;
}