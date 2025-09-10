import { ApiResponse, ProjectsApiResponse } from "@/types/Api";
import { Project, TechLanguage, WebTech } from "@/types/project";
import { API_BRICKS_GET_PROJECTS, API_BRICKS_NEW_PROJECT } from "@/utils/api/APIConstant";
import { getApi, postApi } from "@/utils/api/common";
import toast from "react-hot-toast";

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

export const getProjects = async (
    limit: number,
    nextCursor: Date | null,
    filter?: any
): Promise<{ nextCursor: Date | null; data: Project[] }> => {
    try {
        const query = new URLSearchParams({
            limit: String(limit),
            ...(nextCursor ? { lastCreatedAt: nextCursor.toISOString() } : {}),
            ...(filter ? { filter: String(filter) } : {}),
        }).toString();

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
