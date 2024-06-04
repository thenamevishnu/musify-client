import React from 'react'

const Signup = () => {
    return (
        <div className='flex justify-center mt-28 px-2 md:px-10'>
            <form className='text-center w-full md:w-[500px] text-white'>
                <h1 className='text-3xl mb-5'>SIGN UP</h1>
                <div className='flex items-center bg-primary rounded-xl px-3'>
                    <i className='fa fa-user'/><input type="text" placeholder='Enter Your Name' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-at'/><input type="text" placeholder='Enter Username' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-envelope'/><input type="text" placeholder='Enter Email' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-key'/><input type="text" placeholder='Enter Email' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-lock'/><input type="text" placeholder='Enter Email' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
            </form>
        </div>
    )
}

export default Signup
