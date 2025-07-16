export interface DefaultResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface GroupResponse {
    id: number;
    name: string;
    chatId: string;

    totalCoordinates?: number;
    totalIsNotAccepted?: number;
    coordinates?: Coordinate[];
}

export interface Coordinate {
    id: number,
    latitude: string,
    longitude: string,
    image_name: string,
    isAccepted: boolean,
    isReject: boolean,
    photoTakenAt: Date,

    address?: string,
    urlId?: string,
}
