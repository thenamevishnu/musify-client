import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getRecommendations } from '../../Services/Track'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'

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
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, image: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id, tags: item.tags  }))
    }

    return (
        <Fragment>
            {
                recommend.map((item, index) => {
                    return (
                        <div onClick={() => addToRecentPlayed(item)} className={`text-white cursor-pointer overflow-hidden w-52 group rounded-2xl shadow shadow-black inline-block mx-1 p-3 bg-bg hover:bg-hover`} key={index}>
                            <div className='overflow-hidden rounded-2xl'>
                                <img src={item.thumb || "./no-thumb.jpeg"} alt="similer" className='rounded-2xl hover:scale-110 transition-all duration-150 ease-linear aspect-square object-cover' />
                            </div>
                            <div>{item.title}</div>
                            <div>{ item.duration }</div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Suggestions)
