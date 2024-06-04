import React, { Fragment } from 'react'

const SongList = () => {

    const songs = new Array(5).fill(10).map((_) => {
        return {image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Nav_-_Bad_Habits.png", title: "Nav_-_Bad_Habits", duration: "05:05"}
    })

    return (
        <Fragment>
            <h2 className='text-white my-4 text-2xl'>RECENTLY PLAYED</h2>
            {
                songs.map((item, index) => {
                    return (
                        <div className='bg-primary p-1 rounded-lg my-4 flex items-center gap-3 relative' key={index}>
                            <div>
                                <img src={item.image} alt="bad" className='w-14 rounded-full'/>
                            </div>
                            <div className='text-white'>
                                <div>{item.title}</div>
                                <div>{item.duration} min</div>
                            </div>
                            <div className='text-white absolute right-2 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer bg-secondary'>
                               <i className='fa fa-play'/>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default SongList
