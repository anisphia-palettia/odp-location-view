import api from "@/lib/api";
import {logger} from "@/lib/logger";
import {DefaultResponse, GroupResponse} from "@/types/response";
import {UpdateCoordinatePayload} from "@/types/request";

export function WhatsappGroupService() {
    return {
        async getAll(): Promise<DefaultResponse<GroupResponse[]>> {
            try {
                const response = await api.get<DefaultResponse<GroupResponse[]>>("/groups");
                return response.data;
            } catch (error) {
                logger.error("Failed to fetch WhatsApp groups with coordinate:", error);
                throw error;
            }
        },
    };
}

export function WhatsappCoordinateService() {
    return {
        async update(id: number, req: UpdateCoordinatePayload): Promise<DefaultResponse> {
            try {
                const response = await api.put<DefaultResponse>(`/coordinate/${id}`, req)
                logger.info("Updated WhatsApp coordinate:", response.data);
                return response.data
            } catch (error) {
                logger.error("Failed to update WhatsApp coordinate:", error);
                throw error;
            }
        }
    }
}

export function WhatsappGroupCoordinateService() {
    return {
        async byChatId(chatId: string): Promise<DefaultResponse<GroupResponse>> {
            try {
                const response = await api.get<DefaultResponse<GroupResponse>>(`/group-coordinate/${chatId}`)
                return response.data
            } catch (error) {
                logger.error("Failed to fetch WhatsApp groups with coordinate by chat id:", error);
                throw error;
            }
        }
    }
}
