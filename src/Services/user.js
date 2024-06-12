import { api } from "../axios"

export const userSignup = async (formData) => {
    try {
        const {status, data}= await api.post("/users/signup", formData)
        if (status == 201) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const userLogin = async (formData) => {
    try {
        const { data, status } = await api.get("/users/login", {
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

export const getSingers = async () => {
    try {
        const {status, data}= await api.get("/users/singers")
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const updateProfile = async (obj, user) => {
    try {
        const {status, data}= await api.patch(`/users/update/${user}`, obj)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}

export const updatePassword = async (obj, user) => {
    try {
        const {status, data}= await api.patch(`/users/password/update/${user}`, obj)
        if (status == 200) {
            return data
        }
        throw new Error(data.message)
    } catch (err) {
        return err.response?.data?.message || err.message
    }
}