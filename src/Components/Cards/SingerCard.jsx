import React from 'react'

const SingerCard = ({ item }) => {
    return (
        <div className={`group text-center hover:bg-hover p-2 text-white cursor-pointer overflow-hidden w-24  rounded-2xl inline-block mx-1 transition-all duration-150 ease-linear`}>
            <div className='overflow-hidden rounded-2xl relative'>
                <img src={item.image || item.picture || "./user-avatar.jpg"} alt={item.username} className='rounded-2xl group-hover:scale-110 transition-all duration-150 ease-linear object-cover aspect-square' />
            </div>
            <div className='overflow-x-clip text-sm flex flex-col mt-2'>
                <div>{item.name}</div>
                <div>@{item.username}</div>
            </div>
        </div>
    )
}

export default SingerCard
