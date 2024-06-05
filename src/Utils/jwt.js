import { jwtDecode } from "jwt-decode"

export const getUserFromJwt = (token) => {
    const response = jwtDecode(token)
    return response.sub
}