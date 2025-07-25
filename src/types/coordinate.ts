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
}

export type CoordinateUpdateItem = {
    show: boolean,
    photoTakenAt: string
    tiangId: number
}
