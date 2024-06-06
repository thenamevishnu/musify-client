import React, { useRef, useState } from 'react'
import NowPlaying from './NowPlaying'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { usePlay } from '../../context';

const PlayMusic = ({ track }) => {

    const [isMusicUp, setMusicUp] = useState(false)
    const audioRef = useRef(null)
    const { isPlaying, setPlaying } = usePlay()

    const handlePlay = () => {
        if (audioRef.current.audio.current.paused) {
            setPlaying(true)
            return audioRef.current.audio.current.play()
        }
        setPlaying(false)
        audioRef.current.audio.current.pause()
    }

    return (
        <div className='w-screen fixed px-4 md:px-10 bottom-3 flex justify-center flex-col items-center'>
            <NowPlaying isMusicUp={isMusicUp} track={track} />
            <AudioPlayer ref={audioRef} autoPlay src={track.track} className='bg-[#222] hidden' />
            <div className=' bg-primary shadow shadow-black rounded-xl relative px-5 h-14'>
                <div className='flex gap-2 justify-center items-center h-14'>
                    <div onClick={() => setMusicUp(v => !v)} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className={`fa fa-chevron-${isMusicUp ? `down` : `up`}`} />
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-backward'/>
                    </div>
                    <div onClick={handlePlay} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className={`fa fa-${isPlaying ? `pause`:`play`}`} />
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
