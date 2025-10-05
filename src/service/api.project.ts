import { ApiResponse, ProjectsApiResponse } from "@/types/Api";
import { Project, TechLanguage, WebTech } from "@/types/project";
import { API_BRICKS_DELETE_PROJECT_ARCHIEVE, API_BRICKS_DELETE_UNMARK_STAR, API_BRICKS_EXPORT_ALL_PROJECTS, API_BRICKS_EXPORT_ARCH_PROJECTS, API_BRICKS_GET_PROJECT, API_BRICKS_GET_PROJECT_FS, API_BRICKS_GET_PROJECTS, API_BRICKS_GET_RECENT_PROJECT, API_BRICKS_NEW_PROJECT, API_BRICKS_POST_MARK_STAR, API_BRICKS_POST_PROJECT_ARCHIEVE, API_BRICKS_REMOVE_PROJECT } from "@/utils/api/APIConstant";
import { deleteApi, getApi, postApi } from "@/utils/api/common";
import toast from "react-hot-toast";

export interface Filter {
    sort: "asc" | "dsc",
    q: string,
    att: boolean,
    ach: boolean
}


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

export const getProjectDetails = async (projectId): Promise<Project | null> => {
    try {
        const response = await getApi<ApiResponse<Project>>({
            url: API_BRICKS_GET_PROJECT + `/${projectId }`
        })

        if (response?.success) {
            return response.data
        }
        return null;
    } catch (error: any) {
        console.error("Error Getting details of project:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}