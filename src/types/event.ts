export interface IEvent {
    _id: string;
    name: string;
    description: string;
    lyrics?: { time: number, text: string }[]
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
    REPUBLIC_DAY = "republic_day",
    DIWALI = "diwali",
    Mahashivratri = "mahashivratri",
    NONE = "none"
}