import axios from "axios"
import { getToken } from "./Utils/localdb"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(config => {
    const token = getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(res => {
    if (res.status == 401) {
        return location.href = "/login"
    }
    return res
})