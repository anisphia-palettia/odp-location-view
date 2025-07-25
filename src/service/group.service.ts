import axiosInstance from "@/lib/axios-instance";
import {ApiResponse} from "@/types/api";
import {groupApiUrl} from "@/constant";
import {GroupChatsItem, GroupCoordinateItem, GroupItem, GroupSummaryItem} from "@/types/group";

export const GroupService = {
    async getAll() {
        const {url, method} = groupApiUrl.getAll;
        try {
            const response = await axiosInstance.request<ApiResponse<GroupItem[]>>({
                method,
                url,
            });
            return response.data.data ?? [];
        } catch (error) {
            throw error;
        }
    },
    async getSummary() {
        const {url, method} = groupApiUrl.summary;
        try {
            const response = await axiosInstance.request<
                ApiResponse<GroupSummaryItem[]>
            >({method, url});
            return response.data.data ?? [];
        } catch (error) {
            throw error;
        }
    },
    async getGroupCoordinates(id: number) {
        const {url, method} = groupApiUrl.getGroupCoordinatesAccepted(id);
        try {
            const response = await axiosInstance.request<
                ApiResponse<GroupCoordinateItem>
            >({method, url, params: {"accepted": true}});
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
    async whatsappGroupChats() {
        const {method, url} = groupApiUrl.whatsappGroupChats;
        try {
            const response = await axiosInstance.request<
                ApiResponse<GroupChatsItem[]>
            >({
                method,
                url,
            });
            return response.data.data ?? [];
        } catch (error) {
            throw error;
        }
    },
    async create(chatId: string) {
        const {method, url} = groupApiUrl.create
        try {
            const response = await axiosInstance.request<ApiResponse>({
                method,
                url,
                data: {
                    chatId,
                },
            });
            return response
        } catch (error) {
            throw error;
        }
    },

    async delete(id: number) {
        const {method, url} = groupApiUrl.delete(id);
        try {
            const response = await axiosInstance.request<ApiResponse>({
                method,
                url,
                data: {
                    show: false,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async update(id: number, data: { show: boolean }) {
        const {method, url} = groupApiUrl.update(id);
        try {
            const response = await axiosInstance.request<ApiResponse>({
                method,
                url,
                data
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
