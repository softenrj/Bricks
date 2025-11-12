// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { ProjectContextNode } from "@/store/Reducers/fileContext";
import { ApiResponse } from "@/types/Api";
import { Project, ProjectContext, ProjectFile } from "@/types/project";
import { API_BRICKS_PROJECT_CHILD, API_BRICKS_PROJECT_CONTEXT } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/api/common";
import toast from "react-hot-toast";

export const getProjectContext = async (projectId: string): Promise<ProjectContext | null> => {
    try {
        const response = await getApi<ApiResponse<ProjectContext>>({
            url: API_BRICKS_PROJECT_CONTEXT + `/${projectId}`
        })

        if (response) {
            return response.data
        }
        return null;
    } catch (error: any) {
        console.error("Error Removing projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

export const getContextChild = async (projectId: string, fileId: string): Promise<ProjectFile[] | null> => {
    try {
        const response = await getApi<ApiResponse<ProjectFile[]>>({
            url: API_BRICKS_PROJECT_CHILD + `/${projectId}?projectFileId=${fileId}`
        })

        if (response) {
            return response.data
        }
        return null;
    } catch (error: any) {
        console.error("Error Removing projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}