export enum WebTech {
    VITE = "VITE",
    NEXT = "NEXT"
}

export enum TechLanguage {
    JS = "JS",
    TS = "TS"
}

export interface Project {
    _id: string;
    userId: string;
    name: string;
    description: string;
    web_technology: WebTech;
    tech_language: TechLanguage;
    archived: boolean;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
}