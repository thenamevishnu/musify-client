import React, { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../Services/user'
import { setToken } from '../Utils/localdb'
import { getUserFromJwt } from '../Utils/jwt'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Redux/userSlice'
import { regex } from '../constants/regex'
import { emailError, isEmpty, nameError, passwordError, passwordMismatchError, usernameError } from '../Utils/validation'

const Signup = () => {

    const [formData, setFormData] = useState({ name: "", username: "", email: "", account_type: "", password: "", confirm_password: ""})
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
        const res = isEmpty(formData)
        if (res != "OK") {
            setClicked(false)
            return setErrorMessage(res)
        }
        if (!regex.name.test(formData.name)) {
            setClicked(false)
            return setErrorMessage(nameError)
        }
        if (!regex.username.test(formData.username)) {
            setClicked(false)
            return setErrorMessage(usernameError)
        }
        if (!regex.email.test(formData.email)) {
            setClicked(false)
            return setErrorMessage(emailError)
        }
        if (!regex.password.test(formData.password)) {
            setClicked(false)
            return setErrorMessage(passwordError)
        }
        if (formData.password != formData.confirm_password) {
            setClicked(false)
            return setErrorMessage(passwordMismatchError)
        }
        resetError()
        const {confirm_password, ...userData} = formData
        const response = await userSignup(userData)
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

    const handleFormChange = (event) => {
        if (event.target.name == "name") {
            event.target.value = event.target.value.toUpperCase();
        }
        if (event.target.name == "username") {
            event.target.value = event.target.value.toLowerCase();
        }
        resetError();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    
    return (
        <div className='flex justify-center mt-28 px-2 md:px-10'>
            <form className='text-center w-full md:w-[500px] text-white' onSubmit={handleForm} onChange={ handleFormChange }>
                <h1 className='text-3xl mb-5'>SIGN UP</h1>
                <div className='flex items-center bg-hover rounded-xl px-3'>
                    <i className='fa fa-user'/><input type="text" autoComplete='off' defaultValue={formData.name} name='name' placeholder='Enter Your Name' className='border-0 bg-hover  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-hover rounded-xl px-3 mt-4'>
                    <i className='fa fa-at'/><input type="text" autoComplete='off' defaultValue={formData.username} name='username' placeholder='Enter Username' className='border-0 bg-hover  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-hover rounded-xl px-3 mt-4'>
                    <i className='fa fa-envelope'/><input type="text" autoComplete='off' defaultValue={formData.email} name='email' placeholder='Enter Email' className='border-0 bg-hover  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-5 w-full'>
                    <div className='flex cursor-pointer relative items-center bg-hover rounded-xl px-3 mt-4 w-full' onClick={() => setFormData({...formData, account_type: "listener"})}>
                        <i className='fa fa-headset'/><div className='border-0 bg-hover  outline-none p-3 px-4 w-full'>As a listener</div>
                        { formData.account_type == "listener" && <i className='fa fa-circle-check'/>}
                    </div>
                    <div className='flex cursor-pointer items-center bg-hover relative rounded-xl px-3 mt-4 w-full' onClick={() => setFormData({...formData, account_type: "singer"})}>
                        <i className='fa fa-microphone'/><div className='border-0 bg-hover  outline-none p-3 px-4 w-full'>As a singer</div>
                        { formData.account_type == "singer" && <i className='fa fa-circle-check'/>}
                    </div>
                </div>
                <div className='flex items-center bg-hover rounded-xl px-3 mt-4'>
                    <i className='fa fa-key'/><input type="password" autoComplete='off' defaultValue={formData.password} name='password' placeholder='Enter Password' className='border-0 bg-hover  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-center bg-hover rounded-xl px-3 mt-4'>
                    <i className='fa fa-lock'/><input type="password" autoComplete='off' defaultValue={formData.confirm_password} name='confirm_password' placeholder='Confirm Password' className='border-0 bg-hover  outline-none p-3 px-4 w-full'/>
                </div>
                {errorMessage && <div className='italic mt-4 text-sm text-red-500 text-center'>{errorMessage}</div>}
                <input type="submit" className='border-0 outline-none p-2 bg-secondary text-lg px-4 rounded-full mt-4 w-full cursor-pointer' value={`${clicked ? `Please Wait...` : `Sign Up`}`} />
                <p className='mt-2'>Forgot Password?</p>
                <p>Already have an account? <span className='text-secondary cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
            </form>
        </div>
    )
}

export default memo(Signup)
