import {CoordinateItem} from "@/types/coordinate";

export interface GroupItem {
    id: number;
    name: string;
    chatId: string;
}

export interface GroupSummaryItem {
    id: number;
    chatId: string;
    name: string;
    totalCoordinates: number;
    totalIsNotAccepted: number;
}

export interface GroupChatsItem {
    id: string;
    sessionId: string;
    name: string;
    isGroup: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GroupCoordinateItem {
    id: number;
    name: string;
    chatId: string;
    show: boolean;
    coordinates: CoordinateItem[]
}
