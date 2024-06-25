import React, { Fragment, memo, useEffect, useRef } from 'react'
import NowPlaying from './NowPlaying'
import AudioPlayer from 'react-h5-audio-player';
import { usePlay } from '../../context';
import toast from 'react-hot-toast';
import { addList } from '../../Redux/recentSlice';
import { playingUpdate } from '../../Redux/playingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTime } from '../../Utils/helper';

const PlayMusic = () => {

    const audioRef = useRef(null)
    const { isPlaying, setPlaying, isMusicUp, setMusicUp } = usePlay()
    const { track } = useSelector(state => state.tracks)
    const { trackId } = useSelector(state => state.playing)

    const dispatch = useDispatch()

    const handlePlays = (bool) => {
        setMusicUp(bool)
        setPlaying(bool)
    }

    const handleNextPrev = (items) => {
        let item = items || track
        if (item._id == track._id) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, thumb: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags  }))
    }

    useEffect(() => {
        const ref = audioRef.current
        if (ref) {
            ref.audio.current.addEventListener("play", () => handlePlays(true))
            ref.audio.current.addEventListener("pause", () => handlePlays(false))
            ref.audio.current.addEventListener("ended", () => handleNextPrev(track.nextTrack))
        }
        return () => {
            if (ref) {
                ref.audio?.current?.removeEventListener("play", () => handlePlays(true))
                ref.audio?.current?.removeEventListener("pause", () => handlePlays(false))
                ref.audio?.current?.removeEventListener("ended", () => handleNextPrev(track.nextTrack))
            }
        }
    }, [trackId])
    
    useEffect(() => {
        if (audioRef.current) {
            setPlaying(false)
            audioRef.current.audio.current.pause()
        } 
        return () => {
            if (audioRef.current) {
                audioRef.current.audio.current.pause()
            }
        }
    }, [audioRef.current])

    const handlePlay = () => {
        if (audioRef.current?.audio?.current?.paused) {
            setPlaying(true)
            return audioRef.current.audio.current.play()
        }
        setPlaying(false)
        audioRef.current.audio.current.pause()
    }

    return (
        <div className='w-screen fixed px-4 md:px-10 bottom-3 flex justify-center flex-col items-center z-[2]'>
            {
                trackId && <Fragment>
                    <NowPlaying isMusicUp={isMusicUp} track={track} audioRef={audioRef} />
                    <AudioPlayer ref={audioRef} autoPlay src={track.track} className='bg-[#222] hidden' />
                </Fragment>
            }
            <div className=' bg-primary shadow shadow-black rounded-xl relative px-5 h-14'>
                <div className='flex gap-2 justify-center items-center h-14'>
                    <div onClick={() => setMusicUp(v => !v)} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className={`fa fa-chevron-${isMusicUp ? `down` : `up`} text-xl`} />
                    </div>
                    <div onClick={() => handleNextPrev(track.previousTrack)} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-angles-left text-xl'/>
                    </div>
                    <div onClick={() => trackId && handlePlay()} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className={`fa fa-${isPlaying ? `circle-pause`:`circle-play`} text-xl`} />
                    </div>
                    <div onClick={() => handleNextPrev(track.nextTrack)} className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='fa fa-angles-right text-xl'/>
                    </div>
                    <div className='bg-secondary cursor-pointer text-white w-10 h-10 flex justify-center items-center rounded-full'>
                        <i className='far fa-thumbs-up text-xl'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PlayMusic)
