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

export enum FSTYPE {
    FOLDER = "folder",
    FILE = "file",
    IMAGE = "image"
}

export interface ProjectFile {
    _id: string;
    projectId: string;
    userId: string;
    name: string;
    path: string;
    type: string;
    content?: string;
    version: number;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectContext {
    project: Project,
    context: ProjectFile[]
}