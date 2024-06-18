import React, { memo, useCallback, useEffect, useState } from 'react'
import { getStat } from '../../Services/admin'
import toast from 'react-hot-toast'
import HomeCard from './HomeCard'

const AdminHome = () => {

    const [stat, setStat] = useState([])

    const getStats = useCallback(async () => {
        const res = await getStat()
        if (!stat.message == "success") return toast.error(res)
        setStat(res)
    }, [])

    useEffect(() => {
        getStats()
    }, [])

    return (
        <div className='mt-20'>
            {
                stat.user_info && stat.track_info && <div className='flex w-full px-2 md:px-10 justify-center flex-wrap gap-5 text-white'> 
                    <HomeCard title={"Total Users"} desc={stat.user_info[0]?.users || 0}/>
                    <HomeCard title={"Total Singers"} desc={stat.user_info[0]?.singers || 0}/>
                    <HomeCard title={"Total Listeners"} desc={stat.user_info[0]?.listeners || 0}/>
                    <HomeCard title={"Total Tracks"} desc={stat.track_info[0]?.tracks || 0}/>
                </div>
            }
            <div className='mt-10'>
                
            </div>
        </div>
    )
}

export default memo(AdminHome)
