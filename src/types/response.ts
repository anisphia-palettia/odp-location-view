export interface DefaultResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface GroupResponse {
    id: number;
    name: string;
    chatId: string;

    totalCoordinates?: number;
    coordinates?: Coordinate[];
}

export interface Coordinate {
    latitude: string,
    longitude: string,
    image_name: string,
    isAccepted: boolean,
    createdAt: string,

    address?: string,
    urlId?: string,
}
