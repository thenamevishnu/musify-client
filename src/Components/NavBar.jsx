import React from 'react'

const NavBar = () => {
    return (
        <div className='w-screen fixed top-3 text-white px-2 md:px-10'>
            <div className='bg-primary h-14 flex justify-between items-center px-5 rounded-full'>
                <div className='text-2xl'>MUSIFY</div>
                <div><i className='fa fa-circle-user text-3xl'/></div>
            </div>
        </div>
    )
}

export default NavBar
