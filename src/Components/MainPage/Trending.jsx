import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getTrendings } from '../../Services/Track'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'

const Suggestions = () => {

    const [trendings, setTrendings] = useState([])
    const { setPlaying } = usePlay()

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
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, tags: item.tags, image: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id }))
    }
    
    return (
        <Fragment>
            {
                trendings.map((item, index) => {
                    return (
                        <div className={`mx-3 ${index == 0 && "ms-0"} ${index == trendings.length - 1 && "me-0"} text-white cursor-pointer overflow-hidden w-44  rounded-t-2xl inline-block mx-3`} key={index}>
                            <div className='overflow-hidden rounded-2xl' onClick={() => addToRecentPlayed(item)}>
                                <img src={item.image || "./no-thumb.jpeg"} alt="similer" className='rounded-2xl hover:scale-125 transition-all duration-150 ease-linear' />
                            </div>
                            <p>Trending #{index+1}</p>
                            <div>{item.title}</div>
                            <div>{ item.description }</div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Suggestions
