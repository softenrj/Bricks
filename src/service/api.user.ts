import { ApiResponse } from "@/types/Api";
import { IUser } from "@/types/user";
import { API_BRICKS_GET_USRER } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/api/common";
import toast from "react-hot-toast";

export const getUser = async () => {
    try {
        const response = await getApi<ApiResponse<IUser>>({
            url: API_BRICKS_GET_USRER
        })

        if (response?.success) {
            return response.data;
        }
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        toast.error(error?.message ?? "Something went wrong");
        return null;
    }
}