import React from 'react'

const NowPlaying = ({ isMusicUp, track }) => {

    return (
        <div className={`bg-[#222] fixed top-0 px-2 md:px-10 text-center w-screen h-screen flex overflow-y-scroll items-center transition-all duration-200 ease-linear flex-col ${isMusicUp ?  "opacity-95 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className={`w-full sm:w-[500px] absolute transition-all duration-200 ease-linear ${isMusicUp ? `bottom-16` :  `bottom-0`}`}>
                <div className='mt-6 flex justify-center'>
                    <img src={track.thumb || "./no-thumb.jpeg"} alt={track.title} className='w-[250px] rounded-2xl h-[250px]'/>
                </div> 
                <div className='text-white mt-5'>
                    <p>{track.title}</p>
                </div>
                <div className='w-full md:px-10 px-3 mt-5'>
                    
                </div>
            </div>
        </div>
    )
}

export default NowPlaying
