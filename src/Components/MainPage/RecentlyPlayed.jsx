import React, { Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addList, removeList } from '../../Redux/recentSlice'
import { playingUpdate } from '../../Redux/playingSlice'
import { getTime } from '../../Utils/helper'
import { usePlay } from '../../context'
import toast from 'react-hot-toast'

const RecentlyPlayed = () => {

    const { list } = useSelector(state => state.recent)
    const { trackId } = useSelector(state => state.playing)
    const { setPlaying } = usePlay()

    const dispatch = useDispatch()
    
    const removeRecentPlayed = (trackId) => {
        dispatch(removeList({trackId: trackId}))
    }

    const addToRecentPlayed = (item) => {
        if (trackId == item.trackId) return toast.error("Track is already streaming")
        setPlaying(true)
        dispatch(addList({ list: { trackId: item.trackId,  tags: item.tags, image: item.image, title: item.title, description: item.description, last_played: getTime() } }))
        dispatch(playingUpdate({ trackId: item.trackId, tags: item.tags }))
    }

    return (
        <Fragment>
            {
                list.map((item, index) => {
                    return (
                        <div key={index} className={`inline-block mx-1`}>
                            <div className='bg-bg hover:bg-hover transition-all duration-150 ease-linear shadow shadow-black p-1 group rounded-lg flex items-center gap-3 relative overflow-x-hidden cursor-pointer'>
                                <div className='relative' onClick={() => addToRecentPlayed(item)}>
                                    <div>
                                        <img src={item.image || "./no-thamb.jpeg"} alt="bad" className='min-w-14 h-14 rounded-lg aspect-square' />
                                    </div>
                                    <i className='fa fa-play text-white absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] opacity-0 group-hover:opacity-100 transition-all ease-linear duration-150'/>
                                </div>
                                <div className='text-white'>
                                    <div>{item.title?.slice(0,20)}</div>
                                    <div>Last Played: {item.last_played} <i onClick={() => removeRecentPlayed(item.trackId)} className='fa fa-trash text-sm text-red-400 opacity-60'/></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(RecentlyPlayed)
