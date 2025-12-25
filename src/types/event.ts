export interface IEvent {
    _id: string;
    name: string;
    description: string;
    liveAt: Date;
    expireAt: Date;
    thumbnail: string; 
    liked: number;
    isLiked: boolean;
    comments: number;
    audio?: string;
    effect?: EffectEnum;
    updatedAt: Date;
    createdAt: Date;
}

export enum EffectEnum {
    CHRISTMAS = "christmas",
    NEW_YEAR = "new_year",
    DIWALI = "diwali",
    NONE = "none"
}