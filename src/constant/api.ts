// lib/api-routes.ts
import {appConfig} from "@/config/app.config";

const base = appConfig.apiBaseUrl;

export const API = {
    groups: {
        list: `${base}/groups`,
        detail: (chatId: string | number) => `${base}/groups/${chatId}`,
    },
    coordinate: {
        getAll: `${base}/coordinate`,
        edit: (id: number) => `${base}/coordinate/${id}`,
    }
};
