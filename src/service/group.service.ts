import axiosInstance from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { groupApiUrl } from "@/constant";
import { GroupChatsInfo, GroupItem, GroupSummaryItem } from "@/types/group";

export const GroupService = {
  async getAll() {
    const { url, method } = groupApiUrl.getAll;
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
    const { url, method } = groupApiUrl.summary;
    try {
      const response = await axiosInstance.request<
        ApiResponse<GroupSummaryItem[]>
      >({ method, url });
      return response.data.data ?? [];
    } catch (error) {
      throw error;
    }
  },
  async whatsappGroupChats() {
    const { method, url } = groupApiUrl.whatsappGroupChats;
    try {
      const response = await axiosInstance.request<
        ApiResponse<GroupChatsInfo[]>
      >({
        method,
        url,
      });
      return response.data.data ?? [];
    } catch (error) {
      throw error;
    }
  },
  async create()

  async delete(id: number) {
    const { method, url } = groupApiUrl.delete(id);
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
  async update(id: number) {
    const { method, url } = groupApiUrl.update(id);
    try {
      const response = await axiosInstance.request<ApiResponse>({
        method,
        url,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
