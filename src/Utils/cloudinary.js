import axios from "axios"

export const uploadToCloud = async (file) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET)
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME)
        
        const { data } = await axios.post(import.meta.env.VITE_CLOUD_API, formData)
        return {url: data.secure_url}
    } catch (err) {
        return {err: err.response?.data?.message || err.message}
    }
}