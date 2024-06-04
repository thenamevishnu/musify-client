import React from 'react'

const NowPlaying = ({ isMusicUp }) => {
    return (
        <div className={`bg-primary w-full md:w-[450px] rounded-2xl fixed bottom-20 flex items-center transition-all duration-200 ease-linear flex-col ${isMusicUp ?  "h-96" : "h-0 opacity-0"}`}>
            <div className='mt-6'>
                <img src="https://upload.wikimedia.org/wikipedia/en/f/fd/Nav_-_Bad_Habits.png" alt="bad" className='w-[250px] rounded-xl h-[250px]'/>
            </div> 
            <div className='text-white mt-5'>
                <p>Nav_-_Bad_Habits</p>
            </div>
            <div className='w-full md:px-10 px-3 mt-5'>
                <input type='range' className='w-full'/>
            </div>
            <div className='flex justify-between w-full px-3 md:px-10 mt-[-5px]'>
                <div>10:03</div>
                <div>05:56</div>
            </div>
        </div>
    )
}

export default NowPlaying
