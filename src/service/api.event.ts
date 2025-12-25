import { ApiResponse, PaginatedApiResponse } from "@/types/Api";
import { BType, IComment } from "@/types/comment";
import { IEvent } from "@/types/event";
import { API_BRICKS_ADD_COMMENT, API_BRICKS_EVENTS, API_BRICKS_GET_COMMENTS, API_BRICKS_LIKE_EVENT, API_BRICKS_UNLIKE_EVENT } from "@/utils/api/APIConstant";
import { getApi, postApi } from "@/utils/api/common";
import { QUERY_KEYS } from "@/utils/api/query-keys";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const setEventLike = async (eventId: string): Promise<IEvent | null> => {
    try {
        const response = await postApi<ApiResponse<IEvent>>({
            url: API_BRICKS_LIKE_EVENT + `/${eventId}`
        })
        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error While add Like to event:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

export const removeEventLike = async (eventId: string): Promise<IEvent | null> => {
    try {
        const response = await postApi<ApiResponse<IEvent>>({
            url: API_BRICKS_UNLIKE_EVENT + `/${eventId}`
        })
        if (response?.data) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error While Remove Like to event:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}


export const useLikeEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ eventId, isLiked }: { eventId: string, isLiked: boolean }) => {
            if (isLiked) {
                return await removeEventLike(eventId);
            } else {
                return await setEventLike(eventId);
            }
        },
        onMutate: async ({ eventId, isLiked }: { eventId: string, isLiked: boolean }) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EVENTS });

            const previouseEvents = queryClient.getQueryData(QUERY_KEYS.EVENTS);

            queryClient.setQueryData(QUERY_KEYS.EVENTS, (oldData: any) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        data: page.data.map((event: IEvent) => 
                            event._id === eventId
                            ? { ...event, like: (event.liked || 0) + 1, isLiked: true }
                            : event
                    )
                    }))
                }
            })
        },
        
        onError: (error, eventId, context: any) => {
            if (context?.previouseEvents) {
                queryClient.setQueryData(QUERY_KEYS.EVENTS, context.previouseEvents);
            }
        },

        //? Always refetch after error or success to ensure data is fresh
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS })
        }
    })
}

export const getComments = async (lastCreatedAt: string | null, sort: 'asc' | 'des', type: BType, typeId: string): Promise<PaginatedApiResponse<IComment[]> | null> => {
    try {
        const query: Record<string,any> = {type: type, typeId: typeId};
        if (lastCreatedAt) query.lastCreatedAt = lastCreatedAt;
        if (sort) query.sort = sort;

        const param = new URLSearchParams(query).toString();
        const response = await getApi<PaginatedApiResponse<IComment[]>>({
            url: API_BRICKS_GET_COMMENTS + `?${param}`
        })

        if (response?.success) {
            return response;
        }
        return null;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}

export function useComment(sort: 'asc' | 'des' = 'asc', typeId: string, type: BType) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.EVENTCOMMENTS, typeId, type],
        queryFn: ({ pageParam }: { pageParam: string | null }) => getComments(pageParam, sort, type, typeId),
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

export const addComment = async (
    content: string, 
    type: BType, 
    typeId: string, 
    parentId?: string
): Promise<IComment | null> => {
    try {
        const response = await postApi<ApiResponse<IComment>>({
            url: API_BRICKS_ADD_COMMENT,
            values: { content, parentId, type, typeId }
        });

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error Adding comment:", error);
        return null;
    }
}

export const useAddComment = (type: BType, typeId: string) => {
    const queryClient = useQueryClient();
    
    const queryKey = [QUERY_KEYS.EVENTCOMMENTS, typeId, type]; 

    return useMutation({
        mutationFn: async ({ content, parentId }: { content: string, parentId?: string }) => {
            return await addComment(content, type, typeId, parentId);
        },

        onMutate: async (newCommentVars) => {
            await queryClient.cancelQueries({ queryKey });
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EVENTS });

            const previousComments = queryClient.getQueryData(queryKey);
            const previousEvents = queryClient.getQueryData(QUERY_KEYS.EVENTS);

            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;

                const optimisticComment: Partial<IComment> = {
                    _id: Math.random().toString(), 
                    content: newCommentVars.content,
                    type: type,
                    typeId: typeId,
                    parentId: newCommentVars.parentId,
                    createdAt: new Date().toISOString(),
                    replies: 0,
                };

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) => {
                        if (index === 0) {
                            return {
                                ...page,
                                data: [optimisticComment, ...page.data]
                            };
                        }
                        return page;
                    })
                };
            });

            if (type === BType.EVENT) {
                queryClient.setQueryData(QUERY_KEYS.EVENTS, (oldData: any) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any) => ({
                            ...page,
                            data: page.data.map((event: IEvent) => 
                                event._id === typeId
                                ? { ...event, comments: (event.comments || 0) + 1 } 
                                : event
                            )
                        }))
                    };
                });
            }

            return { previousComments, previousEvents };
        },

        onError: (error, variables, context: any) => {
            if (context?.previousComments) {
                queryClient.setQueryData(queryKey, context.previousComments);
            }
            if (context?.previousEvents) {
                queryClient.setQueryData(QUERY_KEYS.EVENTS, context.previousEvents);
            }
            console.error("Failed to add comment:", error);
            toast.error("Failed to post comment");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS });
        }
    });
}