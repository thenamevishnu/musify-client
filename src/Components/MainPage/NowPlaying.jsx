import React, { memo, useEffect, useState } from 'react'
import { secToTimer } from '../../Utils/helper';
import { useSelector } from 'react-redux';

const NowPlaying = ({ isMusicUp, audioRef, forwardTen, backwordTen }) => {

    const [timer, setTimer] = useState(0)
    const [duration, setDuration] = useState(0)
    const { track } = useSelector(state => state.tracks)

    useEffect(() => {
        setDuration(audioRef.current?.audio?.current.duration)
    }, [audioRef.current?.audio?.current.duration])
    
    useEffect(() => {
        const updateTime = setInterval(() => {
            setTimer(audioRef.current?.audio?.current?.currentTime)
        }, 1000);
        return () => clearInterval(updateTime)
    }, [])

    return (
        <div className={`bg-[#222] fixed top-0 px-2 md:px-10 text-center w-screen h-screen flex overflow-y-scroll items-center transition-all duration-200 ease-linear flex-col ${isMusicUp ?  "bg-opacity-95 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className={`w-full sm:w-[500px] absolute transition-all duration-200 ease-linear ${isMusicUp ? `bottom-16` :  `bottom-0`}`}>
                <div className='mt-6 flex justify-center'>
                    <img src={track.thumb || "./no-thumb.jpeg"} alt={track.title} className='w-[250px] rounded-2xl h-[250px] object-cover aspect-square'/>
                </div> 
                <div className='text-white mt-5'>
                    <p>{track.title}</p>
                    <p>{secToTimer(timer)} / {secToTimer(duration)}</p>
                </div>
                <div className='w-full md:px-10 px-3 mt-3 mb-6 flex justify-center gap-6 text-white' onClick={backwordTen}>
                    <div className='flex flex-col items-center justify-center cursor-pointer'>
                        <i className='fa fa-backward-fast' />
                    </div>
                    <div className='flex flex-col items-center justify-center cursor-pointer' onClick={forwardTen}>
                        <i className='fa fa-forward-fast' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(NowPlaying)
