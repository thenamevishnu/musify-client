import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { updateBlock, usersList } from '../../Services/admin';
import toast from 'react-hot-toast';
import Loading from '../Loading';

const AdminUserManage = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    const getUsers = useCallback(async () => {
        const response = await usersList()
        if (!response.users) return toast.error(response)
        setUsers(response.users)
        setLoading(false)
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    const handleBlock = async (userid) => {
        await updateBlock(userid)
        const res = users.map(item => {
            if (item._id == userid) {
                return { ...item, blocked: !item.blocked} 
            }
            return item
        })
        setUsers(res)
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
                            users.map(item => {
                                return (
                                    <div key={item._id} className='flex bg-hover p-3 rounded-xl w-[250px] flex-col items-center'>
                                        <div>
                                            <img src={item.picture || "../../user-avatar.jpg"} alt={ item.username } className='w-16 rounded-full aspect-square'/>
                                        </div>
                                        <h1 className='mt-3'>{ item.name }</h1>
                                        <h3 className='text-sm italic'>@{item.username}</h3>
                                        <p className='uppercase'>[{item.account_type}]</p>
                                        <button onClick={() => handleBlock(item._id)} className={`${item.blocked ? "bg-green-600" : "bg-red-500"} p-1 mt-3 text-white px-2 w-full rounded-md`}>{ item.blocked ? "Unblock" : "Block" }</button>
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

export default memo(AdminUserManage);
