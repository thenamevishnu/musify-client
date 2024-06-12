import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getSingers } from '../../Services/user'
import toast from 'react-hot-toast'
import SingerCard from '../Cards/SingerCard'
import { useSelector } from 'react-redux'

const Singers = () => {

    const [singers, setSingers] = useState([])

    const profile = useSelector(state => state.users)

    const getSinger = useCallback(async () => {
        const res = await getSingers()
        if(!res.singers) return toast.error(res)
        setSingers(res.singers)
    }, [profile])

    useEffect(() => {
       getSinger()
   }, [profile])

    return (
        <Fragment>
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
