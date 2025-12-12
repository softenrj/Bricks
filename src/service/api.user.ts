// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ApiResponse } from "@/types/Api";
import { IUser } from "@/types/user";
import { IUserStats } from "@/types/userStats";
import {
    API_BRICKS_DAILY_LOGIN,
    API_BRICKS_GET_USRER,
    API_BRICKS_USER_PROFILE_PATCH,
    API_BRICKS_USER_STATS,
} from "@/utils/api/APIConstant";
import { getApi, patchApi, postApi } from "@/utils/api/common";
import { QUERY_KEYS } from "@/utils/api/query-keys";


export const getUser = async () => {
    try {
        const response = await getApi<ApiResponse<IUser>>({
            url: API_BRICKS_GET_USRER,
        });

        if (response?.success) return response.data;
        return null;
    } catch (error: any) {
        console.error("Error fetching user:", error);
        throw new Error(error?.message ?? "Failed to fetch user");
    }
};

export const getUserStats = async (): Promise<IUserStats | null> => {
    try {
        const response = await getApi<ApiResponse<IUserStats>>({
            url: API_BRICKS_USER_STATS,
        });

        if (response?.success) return response.data;
        return null;
    } catch (error: any) {
        console.error("Error fetching stats:", error);
        throw new Error(error?.message ?? "Failed to fetch stats");
    }
};


export function useUser() {
    return useQuery({
        queryKey: QUERY_KEYS.USER,
        queryFn: getUser,
        meta: {
            onError: (error: any) => {
                toast.error(error?.message);
            },
        },
        staleTime: 1000 * 60 * 5, // 5 min
    });
}

export function useUserStats() {
    return useQuery({
        queryKey: QUERY_KEYS.USER_STATS,
        queryFn: getUserStats,
        meta: {
            onError: (error: any) => {
                toast.error(error?.message);
            },
        },
        staleTime: 1000 * 60 * 5, // 5 min
    });
}


export const setUser = async (formdata: FormData): Promise<IUser | null> => {
    try {
        const response = await patchApi<ApiResponse<IUser>>({
            url: API_BRICKS_USER_PROFILE_PATCH,
            values: formdata
        })
        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching stats:", error);
        throw new Error(error?.message ?? "Failed to set user profile");
        return null;
    }
}

export const dailyLogIn = async (): Promise<void> => {
    try {
        await postApi<ApiResponse<void>>({
            url: API_BRICKS_DAILY_LOGIN
        })
        return ;
    } catch (error: any) {
        console.error("Error fetching stats:", error);
        throw new Error(error?.message ?? "Failed to set user profile");
        return;
    }
}