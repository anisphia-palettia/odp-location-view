import {TiangBody} from "@/types/tiang";

export interface CoordinateItem {
    id: number
    imageName: string
    long: string
    lat: string
    groupId: number
    address: string
    urlId: string
    tiangId: number
    isAccepted: boolean
    isReject: boolean
    photoTakenAt: string
    createdAt: string
    updatedAt: string

    tiang: TiangBody
}

    export type CoordinateUpdateItem = {
        photoTakenAt: string
        tiangId: number,
        address: string,
    }
