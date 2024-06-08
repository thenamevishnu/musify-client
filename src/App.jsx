import { Fragment } from "react"
import Router from "./Routes/Routes"
import { Toaster } from "react-hot-toast"

const App = () => {
    return (
        <Fragment>
            <Router />
            <Toaster position="bottom-right"/>
        </Fragment>
    )
}

export default App