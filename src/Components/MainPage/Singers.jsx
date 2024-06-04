import React, { Fragment } from 'react'

const Singers = () => {
        
    const songs = new Array(10).fill(10).map((_) => {
        return {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rh03ntag7caE-ND0CmBu5UhQE0JnmZB_eg&s"}
    })

    return (
        <Fragment>
            {
                songs.map((item,index) => {
                    return (
                        <div className={`mx-3 ${index == 0 && "ms-0"} ${item == songs.length - 1 && "me-0"} bg-primary w-24 h-24 mt-10 rounded-full overflow-hidden inline-block cursor-pointer `} key={index}>
                            <img src={item.image} alt="singer" className='rounded-full aspect-square object-cover shadow hover:scale-125 transition-all duration-150 ease-linear'/>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Singers
