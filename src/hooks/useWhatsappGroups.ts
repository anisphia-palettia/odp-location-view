import useSWR from "swr";
import {DefaultResponse, GroupResponse} from "@/types/response";
import {WhatsappGroupCoordinateService, WhatsappGroupService} from "@/services/whatsapp.service";

const whatsappGroupService = WhatsappGroupService();
const whatsappGroupCoordinateService = WhatsappGroupCoordinateService();

export function useWhatsappGroups() {
    const fetcher = () => whatsappGroupService.getAll();
    const {data, error, isLoading} = useSWR<DefaultResponse<GroupResponse[]>>("whatsapp-groups", fetcher);

    return {
        data: data?.data ?? [],
        isLoading,
        error,
    };
}

export function useWhatsappGroupCoordinate(chatId: string) {
    const shouldFetch = Boolean(chatId);

    const fetcher = () => whatsappGroupCoordinateService.byChatId(chatId);

    const {data, error, isLoading} = useSWR<DefaultResponse<GroupResponse>>(
        shouldFetch ? `whatsapp-coordinate-group` : null,
        fetcher
    );

    return {
        data: data?.data ?? null,
        error,
        isLoading,
    };
}
