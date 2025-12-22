import { ApiResponse, PaginatedApiResponse } from "@/types/Api";
import { IEvent } from "@/types/event";
import { API_BRICKS_EVENTS } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/api/common";
import { QUERY_KEYS } from "@/utils/api/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const getEvents = async (lastCreatedAt: string | null, sort: 'asc' | 'des' ): Promise<PaginatedApiResponse<IEvent[]> | null> => {
    try {
        const query: Record<string,any> = {};
        if (lastCreatedAt) query.lastCreatedAt = lastCreatedAt;
        if (sort) query.sort = sort;

        const param = new URLSearchParams(query).toString();
        const response = await getApi<PaginatedApiResponse<IEvent[]>>({
            url: API_BRICKS_EVENTS + `?${param}`
        })

        if (response?.success) {
            return response;
        }
        return null;
    } catch (error) {
        console.error("Error fetching Events:", error);
        return null;
    }
}

export function useEvent(sort: 'asc' | 'des' = 'asc') {
    return useInfiniteQuery({
        queryKey: QUERY_KEYS.EVENTS,
        queryFn: ({ pageParam }: { pageParam: string | null }) => getEvents(pageParam, sort),
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextCursor ?? undefined
        },
        meta: {
            onError: (error: any) => {
                toast.error(error?.message);
            },
        },
        staleTime: 1000 * 60 * 5,
    })
}