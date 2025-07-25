import {HttpEndpoint, HttpMethod} from "./types/api";

const endpoint = (method: HttpMethod, url: string): HttpEndpoint => ({
    method,
    url,
});

export const groupApiUrl = {
    getAll: endpoint("GET", "/group"),
    summary: endpoint("GET", "/group/summary"),
    whatsappGroupChats: endpoint("GET", "/group/whatsapp-group-chats"),
    create: endpoint("POST", "/group"),
    getGroupCoordinatesAccepted: (id: number) => endpoint("GET", `/group/${id}/coordinates`),
    delete: (id: number) => endpoint("DELETE", `/group/${id}`),
    update: (id: number) => endpoint("PUT", `/group/${id}`),
};

export const sidebarMenu = [
    {label: "Dashboard", path: "/"},
    {label: "Teknisi", path: "/teknisi"},
    {label: "Verifikasi ODP", path: "/verifikasi-odp"},
    {label: "ODP Tertolak", path: "/odp-tertolak"},
    {label: "Managemen WA Group", path: "/whatsapp-group-management"},
];
