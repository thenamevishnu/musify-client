import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { approveTrack, trackRequests } from '../../Services/admin';
import toast from 'react-hot-toast';
import Loading from '../Loading';

const AdminTrackRequests = () => {

    const [tracks, setTracks] = useState([])
    const [isLoading, setLoading] = useState(true)
    
    const getTrackRequests = useCallback(async () => {
        const res = await trackRequests()
        if (!res.tracks) return toast.error(res)
        setTracks(res.tracks)
        setLoading(false)
    }, [])

    useEffect(() => {
        getTrackRequests()
    }, [])

    const handleApprove = async (id) => {
        const res = tracks.map(item => {
            if (item._id == id) {
                return {...item, status: item.status == "live" ? "pending" : "live"}
            }
            return item
        })
        setTracks(res)
        await approveTrack(id)
    }

    return (
        <Fragment>
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
                                        <p>Singer: {item.singer?.[0]?.name}</p>
                                        <div className='flex w-5/6 mt-3'>
                                            <audio src={ item.track } controls/>
                                        </div>
                                        <button onClick={() => handleApprove(item._id)} className={`${item.status == "live" ? `bg-red-500` : `bg-green-600`} p-1 mt-3 text-white px-2 w-full rounded-md`}>{item.status == "live" ? "Set To Pending" : "Set To Live"}</button>
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

export default AdminTrackRequests;
