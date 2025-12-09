import { IBricksHistry } from "@/types/history";
import { Filter } from "./api.project";
import { deleteApi, getApi } from "@/utils/api/common";
import { ApiResponse, PaginatedApiResponse } from "@/types/Api";
import { API_BRICKS_CLEAN_USER_HISTORY, API_BRICKS_REMOVE_USER_HISTORY, API_BRICKS_USER_HISTORY } from "@/utils/api/APIConstant";
import toast from "react-hot-toast";

export enum BrickHistoryTypeEnum {
  ArchForge = "ArchForge",
  FileSystem = "FileSystem",
  CodeCompletion = "CodeCompletion",
  BrickChat = "BrickChat",
  unknown = "unknown",
  user = "user",
  project = "project",
}



/**
 * 
 * @param limit 
 * @param nextCursor 
 * @param filter 
 * @returns 
 */
export const getUserHistory = async (
    limit: number,
    nextCursor: Date | null,
    filter: Partial<Filter>
): Promise<{ nextCursor: Date | null; data: IBricksHistry[] }> => {
    try {
        const params: Record<string, string> = { limit: String(limit) };

        if (filter.sort) params.sort = filter.sort;
        if (filter.q) params.q = filter.q;
        if (nextCursor) params.lastCreatedAt = nextCursor.toISOString();

        const query = new URLSearchParams(params).toString();

        const response = await getApi<PaginatedApiResponse<IBricksHistry[]>>({
            url: `${API_BRICKS_USER_HISTORY}?${query}`,
        });

        if (response?.success) {
            return {
                nextCursor: response.nextCursor ? new Date(response.nextCursor) : null,
                data: response.data,
            };
        }

        return { nextCursor, data: [] };
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return { nextCursor, data: [] };
    }
};

/**
 * 
 * @param historyId 
 * @returns 
 */
export const removeUserHistory = async (historyId: string): Promise<boolean> => {
    try {
        const response = await deleteApi<ApiResponse<void>>({
            url: API_BRICKS_REMOVE_USER_HISTORY + `/${historyId}`
        })
        if (response?.success) {
            return true;
        }
        return false;
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return false;
    }
}

/**
 * 
 * @param historyId 
 * @returns 
 */
export const cleanUserHistory = async (): Promise<boolean> => {
    try {
        const response = await deleteApi<ApiResponse<void>>({
            url: API_BRICKS_CLEAN_USER_HISTORY,
        })
        if (response?.success) {
            return true;
        }
        return false;
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return false;
    }
}