import React, { Fragment } from 'react'

const Suggestions = () => {

    const songs = new Array(10).fill(10).map((_) => {
        return { image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Nav_-_Bad_Habits.png", title: "Nav_-_Bad_Habits", duration: "04:53" }
    })

    return (
        <Fragment>
            {
                songs.map((item, index) => {
                    return (
                        <div className={`mx-3 ${index == 0 && "ms-0"} ${index == songs.length - 1 && "me-0"} text-white cursor-pointer overflow-hidden w-44  rounded-2xl inline-block mx-3`} key={index}>
                            <div className='overflow-hidden rounded-2xl'>
                                <img src={item.image} alt="similer" className='rounded-2xl hover:scale-125 transition-all duration-150 ease-linear' />
                            </div>
                            <p>Trending #{index+1}</p>
                            <div>{item.title}</div>
                            <div>{ item.duration }</div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Suggestions
