import React, { memo, useCallback, useEffect, useState } from 'react'
import { getStat } from '../../Services/admin'
import toast from 'react-hot-toast'
import HomeCard from './HomeCard'
import Loading from '../Loading'

const AdminHome = () => {

    const [stat, setStat] = useState([])
    const [isLoading, setLoading] = useState(true)

    const getStats = useCallback(async () => {
        const res = await getStat()
        if (!stat.message == "success") return toast.error(res)
        setStat(res)
        setLoading(false)
    }, [])

    useEffect(() => {
        getStats()
    }, [])

    return (
        <div className='mt-20'>
            {
                isLoading && <div className=' flex-wrap flex justify-center'>
                    <Loading className='w-[250px] px-10 h-20 my-3'/>
                </div>
            }
            {
                !isLoading && stat.user_info && stat.track_info && <div className='flex w-full px-2 md:px-10 justify-center flex-wrap gap-5 text-white'> 
                    <HomeCard title={"Total Users"} desc={stat.user_info[0]?.users || 0}/>
                    <HomeCard title={"Total Singers"} desc={stat.user_info[0]?.singers || 0}/>
                    <HomeCard title={"Total Listeners"} desc={stat.user_info[0]?.listeners || 0}/>
                    <HomeCard title={"Total Tracks"} desc={stat.track_info[0]?.tracks || 0} />
                    <HomeCard title={"Pending Tracks"} desc={stat.track_info[0]?.pending || 0}/>
                    <HomeCard title={"Approved Tracks"} desc={stat.track_info[0]?.approved || 0}/>
                </div>
            }
            <div className='mt-10'>
                
            </div>
        </div>
    )
}

export default memo(AdminHome)
