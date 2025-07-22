export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS";

export interface HttpEndpoint {
  method: HttpMethod;
  url: string;
}
