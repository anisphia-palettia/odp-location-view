import {CoordinateUpdateItem} from "@/types/coordinate";
import {coordinateApiUrl} from "@/constant";
import {ApiResponse} from "@/types/api";
import axiosInstance from "@/lib/axios-instance";

export const CoordinateService = {
    async update(id: number, data: CoordinateUpdateItem) {
        const {method, url} = coordinateApiUrl.update(id)
        try {
            const response = await axiosInstance.request<ApiResponse>({method, url, data})
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}