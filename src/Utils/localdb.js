export const getToken = () => {
    return localStorage.getItem("__musify_token__") || null
}

export const setToken = (token) => {
    return localStorage.setItem("__musify_token__", token)
}

export const removeToken = () => {
    return localStorage.removeItem("__musify_token__")
}

export const getAdminToken = () => {
    return localStorage.getItem("__musify_admin_token__") || null
}

export const setAdminToken = (token) => {
    localStorage.setItem("__musify_admin_token__", token)
}

export const removeAdminToken = () => {
    localStorage.removeItem("__musify_admin_token__")
}