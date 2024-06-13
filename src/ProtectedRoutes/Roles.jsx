import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const OnlyForSingers = ({ children, role }) => {

    const { account_type } = useSelector(state => state.users)
    
    if (account_type == "singer") {
        return children
    } else {
        return <Navigate to={"/"} />
    }
}