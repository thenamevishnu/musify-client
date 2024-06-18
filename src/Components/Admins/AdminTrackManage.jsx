import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { tracksList, updateBlock } from '../../Services/admin';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import TrackDeleteAlert from '../Modals/TrackDeleteAlert';

const AdminTrackManage = () => {

    const [tracks, setTracks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [userId, setUserId] = useState("")
    const [openedModal, setOpenedModal] = useState(false)

    const getTracks = useCallback(async () => {
        const response = await tracksList()
        if (!response.tracks) return toast.error(response)
        setTracks(response.tracks)
        setLoading(false)
    }, [])

    useEffect(() => {
        getTracks()
    }, [])

    const handleDelete = (item) => {
        setUserId(item.singer?.[0]?._id)
        setOpenedModal(item)
    }

    return (
        <Fragment>
            <TrackDeleteAlert admin user_id={userId} setTracks={setTracks} setOpenedModal={setOpenedModal} openedModal={ openedModal } />
            {
                isLoading && <div className='flex mt-20 justify-center gap-3 flex-wrap'>
                    <Loading className='w-52 h-52'/>
                </div>
            }
            {
                !isLoading && <div className='mt-20 px-2 md:px-10'>
                    <div className='flex justify-center gap-3 flex-wrap'>
                        {
                            tracks.map(item => {
                                return (
                                    <div key={item._id} className='flex bg-hover p-3 rounded-xl overflow-x-hidden w-[300px] flex-col items-center'>
                                        <div>
                                            <img src={item.thumb || "../../no-thumb.jpeg"} alt={ item.username } className='w-16 rounded-lg aspect-square'/>
                                        </div>
                                        <h1 className='mt-3'>{ item.title }</h1>
                                        <p>Singer: { item.singer?.[0]?.name }</p>
                                        <button onClick={() => handleDelete(item)} className={`bg-red-500 p-1 mt-3 text-white px-2 w-full rounded-md`}>Remove</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default memo(AdminTrackManage);
