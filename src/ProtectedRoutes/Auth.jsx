import { getToken } from "../Utils/localdb"
import { Navigate } from "react-router-dom"

export const Auth = ({ route, children }) => {
    
    const token = getToken()

    if (token) {
        if (route == "login" || route == "signup") {
            return <Navigate to={"/"} />
        }
        return children
    } else {
        if (route == "login" || route == "signup") {
            return children
        }
        return <Navigate to={"/login"} />
    }
}