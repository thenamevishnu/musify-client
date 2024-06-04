import React, { useState } from 'react'
import NowPlaying from './NowPlaying'

const PlayMusic = () => {

    const [isMusicUp, setMusicUp] = useState(false)

    return (
        <div className='w-screen fixed px-4 md:px-10 bottom-3 flex justify-center'>
            <NowPlaying isMusicUp={isMusicUp} />
            <div className=' bg-primary shadow w-full md:w-[450px]  shadow-black rounded-xl relative px-5 h-14'>
                <div className='flex gap-10 justify-center items-center h-14'>
                    <div onClick={() => setMusicUp(v => !v)} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className={`fa fa-chevron-${isMusicUp ? `down` : `up`}`} />
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-backward'/>
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-play'/>
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-forward'/>
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='far fa-heart'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayMusic
