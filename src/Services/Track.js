import { api } from "../axios"

export const uploadTrack = async (formData) => {
    try {
        const {status, data}= await api.post("/tracks/upload", formData)
        if (status == 201) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const getTrendings = async () => {
    try {
        const {status, data}= await api.get("/tracks/trendings")
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const getRecommendations = async (tags) => {
    try {
        const { status, data } = await api.get("/tracks/recommend", {
            params: {
                tags: tags.join(",")
            }
        })
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const getTrack = async (trackId, user_id) => {
    try {
        const { status, data } = await api.get(`/tracks/track/${trackId}/${user_id}`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const getMyTracks = async (user_id) => {
    try {
        const { status, data } = await api.get(`/tracks/my-tracks/${user_id}`)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}