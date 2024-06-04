import React, { useState } from 'react'

const NavBar = () => {

    const [isMenu, setMenu] = useState(false)

    return (
        <div className='w-screen fixed z-[1] top-3 text-white px-2 md:px-10'>
            <div className='bg-primary h-14 flex justify-between items-center px-5 rounded-full'>
                <div className='text-2xl'>MUSIFY</div>
                <div className=''>
                    <i className={`transition-all duration-500 ease-linear fa fa-${isMenu ? `close opacity-80` : `bars opacity-100`} text-3xl cursor-pointer`} onClick={() => setMenu(p => !p)}/>
                    <section className={`absolute mt-2 rounded-2xl transition-all duration-[0.2s] ease-linear ${isMenu ? `top-12 md:right-10 right-2 pointer-events-auto opacity-100` : `opacity-0 right-10 top-0 pointer-events-none`}`}>
                        <ul className='p-3'>
                            <li className='flex items-center gap-2'><i className='fa fa-sign-out cursor-pointer'/> LogOut</li>
                        </ul>
                    </section>
                    <section className={`absolute top-1 rounded-2xl transition-all duration-[0.35s] ease-linear ${isMenu ? `right-28 pointer-events-auto opacity-100` : `opacity-0 right-10 pointer-events-none`}`}>
                        <ul className='p-3'>
                            <li className='flex items-center gap-2'><i className='fa fa-user cursor-pointer'/> Profile</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default NavBar
