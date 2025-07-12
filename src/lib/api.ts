import axios from 'axios';
import {appConfig} from "@/config/app.config";

const api = axios.create({
    baseURL: appConfig.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
