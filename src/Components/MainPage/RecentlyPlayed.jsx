import React, { Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'
import toast from 'react-hot-toast'
import TrackCard from '../Cards/TrackCard'
import ListNotFound from '../Cards/ListNotFound'

const RecentlyPlayed = () => {

    const { list } = useSelector(state => state.recent)
    const { trackId } = useSelector(state => state.playing)
    const { setPlaying } = usePlay()

    const dispatch = useDispatch()

    const addToRecentPlayed = (item) => {
        if (trackId == item.trackId) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item.trackId, tags: item.tags, thumb: item.thumb, title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item.trackId, tags: item.tags }))
    }
    
    return (
        <Fragment>
            {
                list.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <TrackCard addToRecentPlayed={addToRecentPlayed} item={item} trending={0} />
                        </Fragment>
                    )
                })
            }
            {
                list.length == 0 && <ListNotFound className='h-52 rounded-2xl'>
                    <div className='flex justify-center items-center h-full text-2xl text-white'>
                        There are no recent plays
                    </div>
                </ListNotFound>
            }
        </Fragment>
    )
}

export default memo(RecentlyPlayed)
