import { Fragment } from "react"

const Loading = ({ className = "" }) => {
    
    const loadings = new Array(10).fill(0).map((_, index) => index)

    return (
        <Fragment>
            {
                loadings.map(item => {
                    return (
                        <div key={item} className={`${className} p-3 bg-hover inline-block mx-3 bg-opacity-60 ease-linear transition-all duration-100 rounded-2xl animate-pulse`}>
                            <div className="bg-primary opacity-90 rounded-2xl w-full h-4/5"></div>
                            <div className="bg-primary opacity-90 rounded-2xl w-full h-5 mt-2"></div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Loading
