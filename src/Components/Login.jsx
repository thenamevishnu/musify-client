import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { userLogin } from '../Services/user'
import { getUserFromJwt } from '../Utils/jwt'
import { updateUser } from '../Redux/userSlice'
import { setToken } from '../Utils/localdb'

const Login = () => {

    const [formData, setFormData] = useState({ username: "", password: "" })
    const [errorMessage, setErrorMessage] = useState("")
    const [clicked, setClicked] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const resetError = () => {
        setErrorMessage("")
    }

    const handleForm = async (event) => {
        event.preventDefault()
        if (clicked) return;
        setClicked(true)
        for (let key in formData) {
            if (!formData[key]) {
                setClicked(false)
                return setErrorMessage(`${key.replace(key[0], key[0].toUpperCase())} is required`)
            }
        }
        resetError()
        const response = await userLogin(formData)
        if (response.token) {
            setToken(response.token)
            const {_id, name, username, email, picture, account_type} = getUserFromJwt(response.token)
            dispatch(updateUser({
                id: _id,
                name: name,
                username: username,
                email: email,
                picture: picture ? picture : `./user-avatar.jpg`,
                account_type: account_type
            }))
            setClicked(false)
            return navigate("/")
        }
        setClicked(false)
        return setErrorMessage(response)
    }

    return (
        <div className='flex justify-center mt-28 px-2 md:px-10'>
            <form className='text-center w-full md:w-[500px] text-white' onSubmit={handleForm} onChange={event => {
                resetError();
                setFormData({ ...formData, [event.target.name]: event.target.value });
            }}>
                <h1 className='text-3xl mb-5'>SIGN IN</h1>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-at'/><input type="text" autoComplete='off' name='username' defaultValue={formData.username} placeholder='Enter Username' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-key'/><input type="password" autoComplete='off' name='password' defaultValue={formData.password} placeholder='Enter Password' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                {errorMessage && <div className='italic mt-4 text-sm text-red-500 text-center'>{errorMessage}</div>}
                <input type="submit"  className='border-0 outline-none cursor-pointer p-2 bg-secondary text-lg px-4 rounded-full mt-4 w-full' value="Sign In"/>
                <p className='mt-2'>Forgot Password?</p>
                <p>Don't have an account? <span className='text-secondary cursor-pointer' onClick={()=>navigate("/signup")}>Create</span></p>
            </form>
        </div>
    )
}

export default Login
