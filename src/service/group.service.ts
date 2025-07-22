import axiosInstance from "@/lib/axios-instance";
import {ApiResponse} from "@/types/response";
import {groupApiUrl} from "@/constant";
import {GroupItem} from "@/types/teknisi";

export const GroupService = {
    async getAll() {
        const {url, method} = groupApiUrl.getAll;
        try {
            const response = await axiosInstance.request<ApiResponse<GroupItem[]>>({method, url});
            return response.data.data ?? [];
        } catch (error) {
            throw error;
        }
    },
    async getSummary() {
        const {url, method} = groupApiUrl.summary;
    }
};