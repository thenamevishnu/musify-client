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