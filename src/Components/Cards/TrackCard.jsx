import millify from 'millify'
import React, { Fragment, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import TrackDeleteAlert from '../Modals/TrackDeleteAlert'

const TrackCard = ({ item, addToRecentPlayed, trending, isMyList }) => {

    const { trackId } = useSelector(state => state.playing)
    const [openedModal, setOpenedModal] = useState(false)
    
    const handleDeleteTrack = () => {
        setOpenedModal(item)
    }

    return (
        <Fragment>
            <TrackDeleteAlert setOpenedModal={setOpenedModal} openedModal={ openedModal } />
            <div className={`group text-center hover:bg-hover p-2 text-white cursor-pointer overflow-hidden w-52 rounded-2xl inline-block mx-1 transition-all duration-150 ease-linear`}>
                <div className='overflow-hidden rounded-2xl relative' onClick={() => addToRecentPlayed(item)}>
                    <div className='absolute flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none opacity-0 group-hover:opacity-100 z-[1]  transition-all ease-linear duration-150 text-5xl flex justify-center items-center rounded-full text-white'>
                        <i className={`far fa-circle-${[item.trackId, item._id].includes(trackId) ? "pause" : "play"}`} />
                    </div>
                    <img src={item.thumb || "./no-thumb.jpeg"} alt={item.title} className='rounded-2xl group-hover:scale-110 transition-all duration-150 ease-linear object-cover aspect-square' />
                </div>
                <div className='overflow-x-clip mt-2 relative'>
                    {trending > 0 && <p>Trending #{trending}</p>}
                    <div>{item.title}</div>
                    { isMyList && <button className='p-1 px-2 bg-red-500 rounded-lg text-white mt-2 w-full' onClick={handleDeleteTrack}>Delete Track</button> }
                </div>
            </div>
        </Fragment>
    )
}

export default memo(TrackCard)
