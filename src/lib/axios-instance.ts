import axios from "axios";
import {EnvConfig} from "@/config/EnvConfig";

const axiosInstance = axios.create({
    baseURL: EnvConfig.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000
})

export default axiosInstance