import React, { memo } from 'react'

const HomeCard = ({ title, desc}) => {
    return (
        <div className='flex flex-col items-center w-[250px] bg-hover p-3 shadow shadow-black font-semibold text-xl rounded-xl px-10'>
            <p>{title}</p>
            <p>{desc}</p>
        </div>
    )
}

export default memo(HomeCard)
