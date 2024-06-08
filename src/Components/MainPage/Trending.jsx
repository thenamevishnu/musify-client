import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getTrendings } from '../../Services/Track'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'
import { millify } from "millify"

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
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, image: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags  }))
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
                        <div className={`group hover:bg-hover bg-bg p-3 shadow shadow-black text-white cursor-pointer overflow-hidden w-52  rounded-2xl inline-block mx-1 transition-all duration-150 ease-linear`} key={index}>
                            <div className='overflow-hidden rounded-2xl' onClick={() => addToRecentPlayed(item)}>
                                <img src={item.thumb || "./no-thumb.jpeg"} alt={ item.title } className='rounded-2xl group-hover:scale-110 transition-all duration-150 ease-linear object-cover aspect-square' />
                            </div>
                            <p>Trending #{index+1}</p>
                            <div>{item.title}</div>
                            <div>Plays: { millify(item.plays?.length || 0) }</div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Trending)
