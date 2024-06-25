import React, { memo, useEffect, useState } from 'react'
import { secToTimer } from '../../Utils/helper';
import { useSelector } from 'react-redux';

const NowPlaying = ({ isMusicUp, audioRef }) => {

    const [timer, setTimer] = useState(0)
    const [duration, setDuration] = useState(0)
    const { track } = useSelector(state => state.tracks)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setDuration(audioRef.current?.audio?.current.duration)
    }, [audioRef.current?.audio?.current.duration])
    
    useEffect(() => {
        const updateTime = setInterval(() => {
            setTimer(audioRef.current?.audio?.current?.currentTime)
            setProgress(Math.floor((audioRef.current?.audio?.current?.currentTime / audioRef.current?.audio?.current.duration) * 100))
        }, 1000);
        return () => clearInterval(updateTime)
    }, [])

    const handleRe = (time) => {
        audioRef.current.audio.current.currentTime += time
        setTimer(audioRef.current?.audio?.current?.currentTime)
    }

    return (
        <div className={`bg-[#222] fixed top-0 px-2 md:px-10 text-center w-screen h-screen flex overflow-y-scroll items-center transition-all duration-200 ease-linear flex-col ${isMusicUp ?  "bg-opacity-95 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className={`w-full sm:w-[500px] absolute transition-all duration-300 ease-linear ${isMusicUp ? `top-10` :  `top-[-2rem]`}`}>
                <div className='mt-6 flex justify-center'>
                    <img src={track.thumb || "./no-thumb.jpeg"} alt={track.title} className='w-[250px] rounded-2xl h-[250px] object-cover aspect-square'/>
                </div> 
                <div className='text-white mt-5 mb-5'>
                    <p>{track.title}</p>
                    <p>{secToTimer(timer)} / {secToTimer(duration)}</p>
                    <div className='flex gap-5 justify-center mt-5'>
                        <i className='fa fa-backward cursor-pointer' onClick={() => handleRe(-10)}/>
                        <i className='fa fa-forward cursor-pointer' onClick={() => handleRe(10)}/>
                    </div>
                    <div className='mt-3 flex justify-center'>
                        <div className='h-2 bg-white relative w-[250px] rounded-full overflow-x-hidden'>
                            <div className={`absolute bg-secondary h-2 top-0 w-[250px]`} style={{ marginLeft: `-${100 - progress}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(NowPlaying)
