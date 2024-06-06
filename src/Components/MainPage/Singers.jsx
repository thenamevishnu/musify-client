import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { getSingers } from '../../Services/user'
import toast from 'react-hot-toast'

const Singers = () => {

    const [singers, setSingers] = useState([])

    const getSinger = useCallback(async () => {
        const res = await getSingers()
        if(!res.singers) return toast.error(res)
        setSingers(res.singers)
    }, [])

    useEffect(() => {
       getSinger()
   }, [])

    return (
        <Fragment>
            {
                singers.map((item,index) => {
                    return (
                        <div className={`mx-3 ${index == 0 && "ms-0"} ${item == singers.length - 1 && "me-0"} relative bg-primary w-24 h-24 rounded-full overflow-hidden inline-block cursor-pointer `} key={index}>
                            <img src={item.picture || "./user-avatar.jpg"} alt="singer" className='rounded-full aspect-square object-cover shadow hover:scale-125 transition-all duration-150 ease-linear'/>
                            <p className='absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] pointer-events-none'>{ item.name }</p>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default memo(Singers)
