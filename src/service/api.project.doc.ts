// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import { ApiResponse } from "@/types/Api";
import { API_BRICKS_CODE_LENSE, API_BRICKS_PROJECT_DEPENDENCY_LIST, API_BRICKS_PROJECT_DOC } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/api/common";
import { QUERY_KEYS } from "@/utils/api/query-keys";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CodeLense, DependencyInfo, ProjectDocMetadata } from "../../types/project.doc";

/**
 * 
 * @param projectId 
 * @returns 
 */
export const getProjectCodeLense = async (projectId: string): Promise<CodeLense[] | null>  => {
    try {
        const response = await getApi<ApiResponse<CodeLense[]>>({
            url: API_BRICKS_CODE_LENSE + `/${projectId}`
        })
        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching UserHistory:", error);
        return null;
    }
}

export function useCodeLense(projectId: string) {
    return useQuery({
        queryKey: QUERY_KEYS.CODE_LENSE,
        queryFn: () => getProjectCodeLense(projectId),
        meta: {
            onError: (error: any) => {
                toast.error(error?.message ?? "Something went wrong");
            },
        },
        staleTime: 1000 * 60 * 5,
    })
}


/**
 * 
 * @param projectId 
 * @returns 
 */
export const getprojectDependencyList = async (projectId: string): Promise<DependencyInfo[] | null> => {
    try {
        const response = await getApi<ApiResponse<DependencyInfo[]>>({
            url: API_BRICKS_PROJECT_DEPENDENCY_LIST + `/${projectId}`
        })

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching UserHistory:", error);
        return null;
    }
}

export function useProjectDependencies(projectId: string) {
    return useQuery({
        queryKey: QUERY_KEYS.PROJECT_DEP,
        queryFn: () => getprojectDependencyList(projectId),
        meta: {
            onError: (error: any) => {
                toast.error(error?.message ?? "Something went wrong");
            },
        },
        staleTime: 1000 * 60 * 5,
    })
}


/**
 * 
 * @param projectId 
 * @returns 
 */
export const getprojectDoc = async (projectId: string): Promise<ProjectDocMetadata | null> => {
    try {
        const response = await getApi<ApiResponse<ProjectDocMetadata>>({
            url: API_BRICKS_PROJECT_DOC + `/${projectId}`
        })

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching UserHistory:", error);
        return null;
    }
}

export function useProjectDoc(projectId: string) {
    return useQuery({
        queryKey: QUERY_KEYS.PROJECT_DOC,
        queryFn: () => getprojectDoc(projectId),
        meta: {
            onError: (error: any) => {
                toast.error(error?.message ?? "Something went wrong");
            },
        },
        staleTime: 1000 * 60 * 5,
    })
}
