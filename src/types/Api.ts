import { Project } from "./project";

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export interface ProjectsApiResponse extends ApiResponse<Project[]> {
  nextCursor: string | null; 
}
