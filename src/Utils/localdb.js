export const getToken = () => {
    return localStorage.getItem("__musify_token__") || null
}

export const setToken = (token) => {
    return localStorage.setItem("__musify_token__", token)
}

export const removeToken = () => {
    return localStorage.removeItem("__musify_token__")
}