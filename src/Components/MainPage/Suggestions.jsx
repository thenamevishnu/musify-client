import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getRecommendations } from '../../Services/Track'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'

const Suggestions = () => {

    const [recommend, setRecommend] = useState([])
    const { tags } = useSelector(state => state.playing)
    const { setPlaying } = usePlay()

    const dispatch = useDispatch()
    
    const getRecommend = useCallback(async () => {
        const res = await getRecommendations(tags)
        if(!res.recommended) return toast.error(res)
        setRecommend(res.recommended)
    }, [tags])

    useEffect(() => {
        getRecommend()
    }, [tags])

    const addToRecentPlayed = (item) => {
        setPlaying(true)
        dispatch(addList({ list: { trackId: item._id, image: item.thumb || "./no-thumb.jpeg", title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item._id }))
    }

    return (
        <Fragment>
            {
                recommend.map((item, index) => {
                    return (
                        <div onClick={() => addToRecentPlayed(item)} className={`${index == 0 && "ms-0"} ${index == recommend.length - 1 && "me-0"} text-white cursor-pointer overflow-hidden w-44  rounded-t-2xl inline-block mx-3`} key={index}>
                            <div className='overflow-hidden rounded-2xl'>
                                <img src={item.thumb || "./no-thumb.jpeg"} alt="similer" className='rounded-2xl hover:scale-125 transition-all duration-150 ease-linear' />
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

export default Suggestions
