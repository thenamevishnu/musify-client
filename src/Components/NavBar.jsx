import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken } from '../Utils/localdb'
import { reduxInitialState, updateUser } from '../Redux/userSlice'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const [isMenu, setMenu] = useState(false)
    const { picture, name, username, account_type } = useSelector(state => state.users)
    const [copied, setCopied] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        removeToken()
        dispatch(updateUser(reduxInitialState))
        navigate("/login")
    }

    const copyUsername = async () => {
        await navigator.clipboard.writeText(username)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1500);
    }
    
    return (
        <div className='w-screen fixed z-[1] top-3 text-white px-2 md:px-10'>
            <div className='bg-primary h-14 flex justify-between items-center px-5 rounded-full'>
                <div className='text-2xl'>MUSIFY</div>
                <div className='relative'>
                    <i className={`fa fa-${isMenu?`close`:`bars`} text-2xl cursor-pointer`} onClick={() => setMenu(m => !m)}/>
                    <section className={`fixed top-0 h-[100vh] bg-black bg-opacity-90 w-full sm:w-96 text-black transition-all duration-300 ease-linear ${isMenu ? `left-0` : `left-[-100vw] sm:left-[-24rem]`} px-2`}>
                        <header className='bg-primary rounded-lg p-4 mt-3 flex justify-between text-white text-md'>
                            <div>
                                <p>MUSIFY</p>
                            </div>
                            <div>
                                <i className='fa fa-close cursor-pointer' onClick={()=>setMenu(false)}/>    
                            </div>
                        </header>
                        <div className='flex items-center flex-col mt-5 text-white'>
                            <div>
                                <img src={ picture } alt="profile" className='rounded-full w-24'/>
                            </div>
                            <p className='mt-3'>{name}</p>
                            <p className='flex items-center gap-2 cursor-pointer'>@{username} <i className={`fa fa-${copied ? `circle-check` : `copy`}`} onClick={copyUsername}/></p>
                            <p className='italic'>You are a {account_type}</p>
                        </div>
                        <div className='px-4 mt-10 flex flex-col gap-3'>
                            <div className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 ease-linear'><i className='fa fa-user mr-3'/>Update Profile</div>
                            <div className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 ease-linear'><i className='fa fa-gear mr-3' />Settings</div>
                            <div className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 ease-linear'><i className='fa fa-circle-info mr-3' />About Us</div>
                            <div className='p-2 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 ease-linear'><i className='fa fa-phone mr-3' />Contact Us</div>
                            <div onClick={logout} className='p-2 mt-10 bg-white text-black px-5 rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 ease-linear'><i className='fa fa-sign-out mr-3' />LogOut</div>
                        </div>

                        <div className='flex justify-evenly text-white text-2xl mt-10'>
                            <i className='fab fa-instagram'/>
                            <i className='fab fa-whatsapp'/>
                            <i className='fab fa-telegram'/>
                            <i className='fab fa-linkedin'/>
                            <i className='fab fa-twitter'/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default NavBar
