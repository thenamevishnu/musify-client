import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTracks } from '../../Services/Track'
import toast from 'react-hot-toast'
import TrackCard from '../Cards/TrackCard'
import { getTime } from '../../Utils/helper'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { usePlay } from '../../context'

const MyTracks = () => {

    const { id } = useSelector(state => state.users)
    const { trackId } = useSelector(state => state.playing)
    const [trackList, setTracks] = useState([])
    const { setPlaying } = usePlay()

    const dispatch = useDispatch()

    const getMyTrackList = useCallback(async () => {
        const res = await getMyTracks(id)
        if (!res.myTracks) return toast.error(res)
        setTracks(res.myTracks)
    }, [])

    useEffect(() => {
        getMyTrackList()
    }, [])

    const addToRecentPlayed = (item) => {
        if (trackId == item._id) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, thumb: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags }))
    }

    return (
        <Fragment>
             <div className='mt-20 px-2 md:px-7'>
                <h1 className='text-white text-2xl mb-4'>My Tracks</h1>
            </div>
            <div className='flex flex-wrap justify-center mt-4'>
                {
                    trackList.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <TrackCard setTracks={setTracks} item={item} addToRecentPlayed={addToRecentPlayed} trending={0} isMyList/>
                            </Fragment>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default memo(MyTracks)
