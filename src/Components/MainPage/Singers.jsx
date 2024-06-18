import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getSingers } from '../../Services/user'
import toast from 'react-hot-toast'
import SingerCard from '../Cards/SingerCard'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import ListNotFound from '../Cards/ListNotFound'

const Singers = () => {

    const [singers, setSingers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const profile = useSelector(state => state.users)

    const getSinger = useCallback(async () => {
        const res = await getSingers()
        if(!res.singers) return toast.error(res)
        setSingers(res.singers)
        setIsLoading(false)
    }, [profile])

    useEffect(() => {
       getSinger()
   }, [profile])

    return (
        <Fragment>
            {
                isLoading && <div className='inline-block'>
                    <Loading className='w-28 h-32'/>
                </div>
            }
            {
                (!isLoading && singers.length == 0) && <ListNotFound className='h-28 rounded-2xl'>
                    <div className='flex justify-center items-center h-full text-2xl text-white'>
                        There are no singers found
                    </div>
                </ListNotFound>
            }
            {
                singers.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <SingerCard item={item}/>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Singers)
