import axios from "axios"
import { getAdminToken, getToken } from "./Utils/localdb"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const adminApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(config => {
    const token = getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

adminApi.interceptors.request.use(config => {
    const token = getAdminToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(res => {
    if (res.status == 401) {
        location.href = "/login"
    }
    return res
})