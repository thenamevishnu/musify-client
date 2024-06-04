import React from 'react'

const Login = () => {
    return (
        <div className='flex justify-center mt-28 px-2 md:px-10'>
            <form className='text-center w-full md:w-[500px] text-white'>
                <h1 className='text-3xl mb-5'>SIGN IN</h1>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-at'/><input type="text" placeholder='Enter Username' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-key'/><input type="password" placeholder='Enter Password' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <input type="submit"  className='border-0 outline-none p-2 bg-violet-900 text-lg px-4 rounded-full mt-4 w-full' value="Sign In"/>
            </form>
        </div>
    )
}

export default Login
