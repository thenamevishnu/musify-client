import { adminApi } from "../axios"


export const adminLogin = async (formData) => {
    try {
        const { status, data } = await adminApi.get(`/admins/login`, {
            params: formData
        })
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const getStat = async () => {
    try {
        const { status, data } = await adminApi.get(`/admins/stat`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const usersList = async () => {
    try {
        const { status, data } = await adminApi.get(`/admins/users`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const updateBlock = async (userid) => {
    try {
        const { status, data } = await adminApi.patch(`/admins/block-unblock`, {userid})
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const tracksList = async () => {
    try {
        const { status, data } = await adminApi.get(`/admins/tracks`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const AdminDeleteTrack = async (user_id, track_id) => {
    try {
        const { status, data } = await adminApi.delete(`/admins/delete/track/${user_id}/${track_id}`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const trackRequests = async () => {
    try {
        const { status, data } = await adminApi.get(`/admins/tracks/requests`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const approveTrack = async (track_id) => {
    try {
        const { status, data } = await adminApi.patch(`/admins/tracks/approve`, {track_id})
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const adminReports = async () => {
    try {
        const { status, data } = await adminApi.get(`/admins/reports`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}