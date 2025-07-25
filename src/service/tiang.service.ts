import {tiangApiUrl} from "@/constant";
import axiosInstance from "@/lib/axios-instance";
import {ApiResponse} from "@/types/api";
import {TiangBody} from "@/types/tiang";

export const TiangService = {
    async getAll() {
        const {method, url} = tiangApiUrl.getAll
        try {
            const response = await axiosInstance.request<ApiResponse<TiangBody[]>>({method, url})
            return response.data.data ?? []
        } catch (e) {
            throw e
        }
    },
    async getById(id: number) {
        const {method, url} = tiangApiUrl.getById(id)
        try {
            const response = await axiosInstance.request<ApiResponse<TiangBody>>({method, url})
            return response.data.data
        } catch (e) {
            throw e
        }
    }
}