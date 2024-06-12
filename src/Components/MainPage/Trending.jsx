import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getTrendings } from '../../Services/Track'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'
import TrackCard from '../Cards/TrackCard'

const Trending = () => {

    const [trendings, setTrendings] = useState([])
    const { setPlaying } = usePlay()
    const { id: user_id } = useSelector(state => state.users)
    const { trackId } = useSelector(state => state.playing)

    const dispatch = useDispatch()

    const getTrending = useCallback(async () => {
        const res = await getTrendings()
        if (!res.trendings) return toast.error(res)
        setTrendings(res.trendings)
    }, [])

    useEffect(() => {
        getTrending()
    }, [])

    const addToRecentPlayed = (item) => {
        if (trackId == item._id) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, thumb: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags }))
        if (!item.plays?.includes(user_id)) {
            setTrendings((prev) => (prev.map(i => {
                if (i._id == item._id) {
                    if (!Array.isArray(item.plays)) item.plays = []
                    item.plays.push(user_id)
                    return item
                }
                return i
            })))
        }
    }

    return (
        <Fragment>
            {
                trendings.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <TrackCard item={item} addToRecentPlayed={addToRecentPlayed} trending={index + 1} />
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Trending)
