// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { ApiResponse, ProjectsApiResponse } from "@/types/Api";
import { Project, TechLanguage, WebTech } from "@/types/project";
import { API_BRICKS_CODE_COMPLETION, API_BRICKS_CODE_SUGGESION, API_BRICKS_DELETE_PROJECT_ARCHIEVE, API_BRICKS_DELETE_UNMARK_STAR, API_BRICKS_EXPORT_ALL_PROJECTS, API_BRICKS_EXPORT_ARCH_PROJECTS, API_BRICKS_GET_BRICKS_CHATS, API_BRICKS_GET_CHAT_HISTORY, API_BRICKS_GET_PROJECT, API_BRICKS_GET_PROJECT_FS, API_BRICKS_GET_PROJECTS, API_BRICKS_GET_RECENT_PROJECT, API_BRICKS_NEW_PROJECT, API_BRICKS_POST_MARK_STAR, API_BRICKS_POST_PROJECT_ARCHIEVE, API_BRICKS_PROMPT_RESPONSE, API_BRICKS_REMOVE_PROJECT } from "@/utils/api/APIConstant";
import { deleteApi, getApi, postApi } from "@/utils/api/common";
import toast from "react-hot-toast";
import { BricksChat, Message } from "../../types/chatMessage";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/api/query-keys";

export interface Filter {
    sort: "asc" | "dsc",
    q: string,
    att: boolean,
    ach: boolean
}

/**
 * 
 * @param project_name 
 * @param project_description 
 * @param web_tech 
 * @param tech_lan 
 * @returns 
 */
export const createNewProject = async (
    project_name: string,
    project_description: string,
    web_tech: WebTech,
    tech_lan: TechLanguage
): Promise<Project | null> => {
    try {
        const response = await postApi<ApiResponse<Project>>({
            url: API_BRICKS_NEW_PROJECT,
            values: {
                project_name,
                project_description,
                web_tech,
                tech_lan,
            },
        });

        if (response?.success) {
            toast.success(response.message ?? "Project created successfully");
            return response.data;
        } else {
            toast.error(response?.message ?? "Failed to create project");
            return null;
        }
    } catch (error: any) {
        console.error("Error creating project:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
};

/**
 * 
 * @param limit 
 * @param nextCursor 
 * @param filter 
 * @returns 
 */
// sort, q, att, created_after, created_before, ach
export const getProjects = async (
    limit: number,
    nextCursor: Date | null,
    filter: Partial<Filter>
): Promise<{ nextCursor: Date | null; data: Project[] }> => {
    try {
        const params: Record<string, string> = { limit: String(limit) };

        if (filter.sort) params.sort = filter.sort;
        if (filter.q) params.q = filter.q;
        if (filter.att) params.att = String(filter.att);
        if (filter.ach) params.ach = String(filter.ach);
        if (nextCursor) params.lastCreatedAt = nextCursor.toISOString();

        const query = new URLSearchParams(params).toString();

        const response = await getApi<ProjectsApiResponse>({
            url: `${API_BRICKS_GET_PROJECTS}?${query}`,
        });

        if (response?.success) {
            return {
                nextCursor: response.nextCursor ? new Date(response.nextCursor) : null,
                data: response.data,
            };
        }

        return { nextCursor, data: [] }; // fallback if not success
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return { nextCursor, data: [] };
    }
};

/**
 * 
 * @returns 
 */
export const getRecentProjects = async (): Promise<Project[] | null> => {
    try {

        const response = await getApi<ApiResponse<Project[]>>({
            url: API_BRICKS_GET_RECENT_PROJECT,
        });

        if (response?.success) {
            return response.data;
        }

        return null; // fallback if not success
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
};

/**
 * 
 * @param action {0 mark starred, 1 mark unStarred}
 * @param projectId
 * @returns 
 */
export const markStarred = async (action: boolean, projectId: string): Promise<boolean> => {
    try {
        let response: ApiResponse<Project> | undefined;
        if (action) {
            response = await deleteApi<ApiResponse<Project>>({
                url: API_BRICKS_DELETE_UNMARK_STAR + `/${projectId}`
            })
        } else {
            response = await postApi<ApiResponse<Project>>({
                url: API_BRICKS_POST_MARK_STAR + `/${projectId}`
            })
        }

        if (response?.success) {
            return true;
        }
        return false;
    } catch (error: any) {
        console.error("Error Starred projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return false;
    }
}


/**
 * 
 * @param action {0 mark Archieve, 1 mark unArchieve}
 * @param projectId
 * @returns 
 */
export const markArchieve = async (action: boolean, projectId: string): Promise<Project | null> => {
    try {
        let response: ApiResponse<Project> | undefined;
        if (action) {
            response = await deleteApi<ApiResponse<Project>>({
                url: API_BRICKS_DELETE_PROJECT_ARCHIEVE + `/${projectId}`
            })
        } else {
            response = await postApi<ApiResponse<Project>>({
                url: API_BRICKS_POST_PROJECT_ARCHIEVE + `/${projectId}`
            })
        }

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error Archieve projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

/**
 * 
 * @param mode 
 * @returns 
 */
export const exportProjects = async (mode: 'arch' | 'all' = 'all'): Promise<Project[] | null> => {
    try {
        let response: ApiResponse<Project[]> | undefined;

        if (mode === 'all') {
            response = await getApi<ApiResponse<Project[]>>({
                url: API_BRICKS_EXPORT_ALL_PROJECTS
            })
        } else {
            response = await getApi<ApiResponse<Project[]>>({
                url: API_BRICKS_EXPORT_ARCH_PROJECTS
            })
        }

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error Archieve projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

/**
 * 
 * @param projectId 
 * @returns 
 */
export const removeProject = async (projectId: string): Promise<boolean> => {
    try {
        const response = await deleteApi<ApiResponse<void>>({
            url: API_BRICKS_REMOVE_PROJECT + `/${projectId}`
        })

        if (response?.success) {
            return response.success;
        }
        return false;
    } catch (error: any) {
        console.error("Error Removing projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return false;
    }
}

/**
 * 
 * @param projectId 
 * @returns 
 */
export const projectFileSystem = async (projectId: string): Promise<any> => {
    try {
        const response = await getApi<ApiResponse<any>>({
            url: API_BRICKS_GET_PROJECT_FS + `/${projectId}`
        })

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting FS of project:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

export const useProjectFile = (prjectId: string) => (
    useQuery({
        queryKey: [QUERY_KEYS.PROJECT_FILE, prjectId],
        queryFn: () => projectFileSystem(prjectId),
        meta: {
            onError: (error: any) => {
                toast.error(error?.message ?? "Something went wrong");
            },
        },
        staleTime: 1000 * 60 * 5,
    })
)

/**
 * 
 * @param projectId 
 * @returns 
 */
export const getProjectDetails = async (projectId: string): Promise<Project | null> => {
    try {
        const response = await getApi<ApiResponse<Project>>({
            url: API_BRICKS_GET_PROJECT + `/${projectId}`
        })

        if (response?.success) {
            return response.data
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting details of project:", error);
        return null;
    }
}

export const useProject = (projectId: string) => (
    useQuery({
        queryKey: [QUERY_KEYS.PROJECT_INFO, projectId],
        queryFn: () => getProjectDetails(projectId),
        meta: {
            onError: (error: any) => {
                toast.error(error?.message ?? "Something went wrong");
            },
        },
        staleTime: 1000 * 60 * 5,
    })
)

let suggestionTimeout: NodeJS.Timeout | null = null;
let lastPromise: Promise<string | null> | null = null;

export const __getSuggestion = async (content: string): Promise<string | null> => {
    if (suggestionTimeout) clearTimeout(suggestionTimeout);

    lastPromise = new Promise((resolve) => {
        suggestionTimeout = setTimeout(async () => {
            try {
                const response = await postApi<ApiResponse<string>>({
                    url: API_BRICKS_CODE_SUGGESION,
                    values: { context: content },
                });

                if (response?.success) {
                    resolve(response.data);
                } else {
                    resolve(null);
                }
            } catch (error: any) {
                console.error("Error getting code suggestion:", error);
                toast.error(error?.message ?? "Something went wrong");
                resolve(null);
            }
        }, 600);
    });
    return lastPromise;
};

export const __getCodeCompletion = async (content: string, fileName: string, fileLanguage: string, projectId: string): Promise<string | null> => {
    try {
        const response = await postApi<ApiResponse<string>>({
            url: API_BRICKS_CODE_COMPLETION,
            values: {
                context: content,
                fileName: fileName,
                fileLanguage: fileLanguage,
                projectId: projectId
            }
        })
        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting Ai Response:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

export const getAiResponse = async (projectId: string, chatId: string | null, prompt: string): Promise<{ message: Message, chat: BricksChat } | null> => {
    try {
        const response = await postApi<ApiResponse<{ message: Message, chat: BricksChat }>> ({
            url: API_BRICKS_PROMPT_RESPONSE + `/${projectId}`,
            values: {
                chatId: chatId as any,
                prompt: prompt
            }
        })
        if (response?.success) {
            return { message: response.data.message, chat: response.data.chat};
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting Ai Response:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}

export const getChatHistory = async (chatId: string): Promise<Message[] | null> => {
    try {
        const response = await getApi<ApiResponse<Message[]>>({
            url: API_BRICKS_GET_CHAT_HISTORY + `/${chatId}`
        })

        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting Chat histroy:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}