
const Loading = (isLoading) => {
    return (
        <div className={`${isLoading} transition-all ease-linear duration-200`}>
            <div className="w-20 h-20 border-t-0 border-b-0 border-l-4 border-r-4 border-l-secondary border-r-secondary border-t-white border-b-transparent bg-transparent rounded-full animate-spin">

            </div>
        </div>
    )
}

export default Loading
