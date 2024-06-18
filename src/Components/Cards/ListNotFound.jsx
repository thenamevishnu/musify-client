import React from 'react'

const ListNotFound = ({ children, className="" }) => {
    return (
        <div className={`w-full bg-hover ${className}`}>
            { children }
        </div>
    )
}

export default ListNotFound
