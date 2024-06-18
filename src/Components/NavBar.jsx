import React, { Fragment, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAdminToken, removeToken } from '../Utils/localdb'
import { reduxInitialStateUser, updateUser } from '../Redux/userSlice'
import { useNavigate } from 'react-router-dom'
import AddSong from './Songs/AddSong'
import { reduxInitialStateAdmin, updateAdmin } from '../Redux/adminSlice'

const NavBar = ({admin=""}) => {

    const [isMenu, setMenu] = useState(false)
    const { picture, name, username, account_type } = useSelector(state => admin ? state.admin : state.users)
    const [copied, setCopied] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        if (admin) {
            removeAdminToken()
            dispatch(updateAdmin(reduxInitialStateAdmin))
            navigate("/admin/login")
        } else {
            removeToken()
            dispatch(updateUser(reduxInitialStateUser))
            navigate("/login")
        }
    }

    const copyUsername = async () => {
        await navigator.clipboard.writeText(username)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1500);
    }
    
    return (
        <Fragment>
            <AddSong isModalOpen={isModalOpen} setModalOpen={ setModalOpen } />
            <div className='w-screen fixed z-[2] top-0 text-white bg-primary h-16 shadow shadow-black flex justify-between items-center px-2 md:px-10'>
                <div onClick={() => navigate("/")} className='text-2xl cursor-pointer flex gap-3 items-center'><img src="../../logo.jpeg" className='w-10 rounded-full' alt="logo"/>MUSIFY</div>
                <div className='relative'>
                    {
                        username && <Fragment>
                            <i className={`fa fa-${isMenu ? `close` : `bars`} text-2xl cursor-pointer`} onClick={() => setMenu(m => !m)} />
                            <section className={`fixed overflow-y-scroll pb-4 top-0 h-[100vh] bg-primary bg-opacity-100 w-full sm:w-96 text-black transition-all duration-150 ease-linear ${isMenu ? `left-0` : `left-[-100vw] sm:left-[-24rem]`} px-2`}>
                                <i className='absolute top-4 right-2 fa fa-close text-white text-2xl cursor-pointer' onClick={() => setMenu(false)} />
                                <div className='flex items-center flex-col mt-8 text-white'>
                                    <div>
                                        <img src={picture} alt="profile" className='rounded-full w-24 aspect-square object-fill' />
                                    </div>
                                    <p className='mt-3'>{name}</p>
                                    <p className='flex items-center gap-2 cursor-pointer'>@{username} <i className={`fa fa-${copied ? `circle-check` : `copy`}`} onClick={copyUsername} /></p>
                                    { account_type && <p className='italic'>You are a {account_type}</p>}
                                </div>
                                
                                {
                                    admin ? 
                                        <div className='px-4 mt-10 flex flex-col gap-3'>
                                            <div onClick={() => navigate(`/admin/${import.meta.env.VITE_ADMIN_HOME}`)} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-user mr-3' />Home</div>
                                            <div onClick={() => navigate("/admin/manage/users")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-user mr-3' />Manage Users</div>
                                            <div onClick={() => navigate("/admin/manage/tracks")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-music mr-3' />Manage Tracks</div>
                                            <div onClick={() => navigate("/admin/manage/requests")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-clock mr-3' />Manage Requests</div>
                                            <div onClick={() => navigate("/admin/report")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-list mr-3' />Track Report</div>
                                            {
                                                account_type == "singer" && <div onClick={() => {
                                                navigate("/my-tracks")
                                                }} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-upload mr-3' />My Tracks</div>
                                            }
                                            {
                                                account_type == "singer" && <div onClick={() => {
                                                    setModalOpen(true)
                                                }} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-upload mr-3' />Upload Track</div>
                                            }
                                            <div onClick={logout} className='p-2 mt-10 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-sign-out mr-3' />LogOut</div>
                                        </div>
                                        :
                                        <div className='px-4 mt-10 flex flex-col gap-3'>
                                            <div onClick={() => navigate("/")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-user mr-3' />Home</div>
                                            <div onClick={() => navigate("/profile")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-user mr-3' />Update Profile</div>
                                            <div onClick={() => navigate("/settings")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-gear mr-3' />Settings</div>
                                            <div onClick={() => navigate("/about")} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-circle-info mr-3' />About Us</div>
                                            {
                                                account_type == "singer" && <div onClick={() => {
                                                navigate("/my-tracks")
                                                }} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-upload mr-3' />My Tracks</div>
                                            }
                                            {
                                                account_type == "singer" && <div onClick={() => {
                                                    setModalOpen(true)
                                                }} className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-upload mr-3' />Upload Track</div>
                                            }
                                            <div onClick={logout} className='p-2 mt-10 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-100 ease-linear'><i className='fa fa-sign-out mr-3' />LogOut</div>
                                        </div>
                                }

                                <div className='flex justify-evenly text-white text-2xl mt-10'>
                                    <i className='fab fa-instagram' />
                                    <i className='fab fa-whatsapp' />
                                    <i className='fab fa-telegram' />
                                    <i className='fab fa-linkedin' />
                                    <i className='fab fa-twitter' />
                                </div>
                            </section>
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default memo(NavBar)
