export interface ApiResponse<T = undifined> {
    success: boolean;
    message: string;
    data?: T
}