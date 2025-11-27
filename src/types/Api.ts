// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { Project } from "./project";

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export interface ProjectsApiResponse extends ApiResponse<Project[]> {
  nextCursor: string | null; 
}

export type PaginatedApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    nextCursor: string | null; 
}