import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import Singers from './Singers'
import Suggestions from './Suggestions'
import PlayMusic from './PlayMusic'
import Treanding from './Trending'
import { useDispatch, useSelector } from 'react-redux'
import { getTrack } from '../../Services/Track'
import toast from 'react-hot-toast'
import RecentlyPlayed from './RecentlyPlayed'
import { trackUpdate } from '../../Redux/trackSlice'

const Main = () => {

    const { trackId } = useSelector(state => state.playing)
    const { id: user_id } = useSelector(state => state.users)
    const { track } = useSelector(state => state.tracks)

    const dispatch = useDispatch()
    
    const fetchTrack = useCallback(async () => {
        const res = await getTrack(trackId, user_id)
        if (!res.track) return toast.error(res)
        dispatch(trackUpdate({track: res.track}))
    }, [trackId])

    useEffect(() => {
        fetchTrack()
    }, [trackId])

    return (
        <Fragment>
            <div className='mt-20 px-2 md:px-10 pb-20'>
                <div className='flex flex-col'>
                    <div>
                        <h2 className='text-white text-2xl mb-4'>TRENDING</h2>
                    </div>
                    <div className='overflow-x-scroll whitespace-nowrap'>
                        <Treanding />
                   </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <div>
                        <h2 className='text-white text-2xl mb-4'>RECENT PLAYS</h2>
                    </div>
                    <div className='overflow-x-scroll whitespace-nowrap'>
                        <RecentlyPlayed />
                   </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <div>
                        <h2 className='text-white text-2xl mb-4'>SINGERS</h2>
                    </div>
                    <div className='overflow-x-scroll whitespace-nowrap'>
                        <Singers />
                   </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <div>
                        <h2 className='text-white text-2xl mb-4'>RECOMMENDATIONS</h2>
                    </div>
                    <div className='overflow-x-scroll whitespace-nowrap'>
                        <Suggestions />
                   </div>
                </div>
            </div>
            <PlayMusic track={track}/>
        </Fragment>
    )
}

export default memo(Main)
