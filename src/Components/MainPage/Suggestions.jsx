import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getRecommendations } from '../../Services/Track'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'
import TrackCard from '../Cards/TrackCard'

const Suggestions = () => {

    const [recommend, setRecommend] = useState([])
    const { tags, trackId } = useSelector(state => state.playing)
    const { setPlaying } = usePlay()

    const dispatch = useDispatch()

    const getRecommend = useCallback(async () => {
        const res = await getRecommendations(tags)
        if (!res.recommended) return toast.error(res)
        setRecommend(res.recommended)
    }, [trackId])

    useEffect(() => {
        getRecommend()
    }, [trackId])

    const addToRecentPlayed = (item) => {
        if (trackId == item._id) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, thumb: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags }))
    }

    return (
        <Fragment>
            {
                recommend.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <TrackCard addToRecentPlayed={addToRecentPlayed} trending={0} item={item} />
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Suggestions)
