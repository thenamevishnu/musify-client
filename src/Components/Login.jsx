import React from 'react'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate() 

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
                <input type="submit"  className='border-0 outline-none p-2 bg-secondary text-lg px-4 rounded-full mt-4 w-full' value="Sign In"/>
                <div className='border-t-2 my-4 border-white'></div>
                <div>
                    <button type='button' className='p-2 text-black bg-white w-full rounded-full flex items-center gap-2 justify-center'><i className='fab fa-google text-xl'/>Login With Google</button>
                </div>
                <p className='mt-2'>Forgot Password?</p>
                <p>Don't have an account? <span className='text-secondary cursor-pointer' onClick={()=>navigate("/signup")}>Create</span></p>
            </form>
        </div>
    )
}

export default Login
