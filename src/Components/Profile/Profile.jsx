import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updatePassword, updateProfile } from '../../Services/user'
import { uploadToCloud } from '../../Utils/cloudinary'
import toast from "react-hot-toast"
import { reduxInitialStateUser, updateUser } from '../../Redux/userSlice'
import { removeToken } from '../../Utils/localdb'
import { useNavigate } from 'react-router-dom'
import { regex } from '../../constants/regex'
import { emailError, isEmpty, nameError, passwordError, passwordMismatchError, usernameError } from '../../Utils/validation'

const Profile = () => {

    const profile = useSelector(state => state.users)
    const [imageFile, setImageFile] = useState(null)
    const [formData, setFormData] = useState({name: profile.name, username: profile.username, email: profile.email})
    const [passwordFormData, setPasswordFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const [editable, setEditable] = useState(false)
    const [errorMessage, setErrorMessage] = useState({profile: "", password: ""})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUserInfoForm = (key, value) => {
        setFormData({ ...formData, [key]: value })
        setErrorMessage({...errorMessage, profile: ""})
    }

    const handlePasswordForm = (key, value) => {
        setPasswordFormData({ ...passwordFormData, [key]: value })
        setErrorMessage("")
        setErrorMessage({...errorMessage, password: ""})
    }

    const handleProfileUpdate = async (event) => {
        event.preventDefault()
        const res = isEmpty(formData)
        if (res != "OK") {
            return setErrorMessage({...errorMessage, profile: res})
        }
        const obj = {}
        if (imageFile) {
            obj.picture = (await uploadToCloud(imageFile)).url
        }
        if (formData.name) {
            if (!regex.name.test(formData.name)) {
                return setErrorMessage({...errorMessage, profile: nameError})
            } else {
                obj.name = formData.name
            }
        }
        if (formData.username) {
            if (!regex.username.test(formData.username)) {
                return setErrorMessage({...errorMessage, profile: usernameError})
            } else {
                obj.username = formData.username
            }
        }
        if (formData.email) {
            if (!regex.email.test(formData.email)) {
                return setErrorMessage({...errorMessage, profile: emailError})
            } else {
                obj.email = formData.email
            }
        }
        const keys = ["name", "username", "email"]
        const currentProfile = [profile.name, profile.username, profile.email, profile.picture]
        const newProfile = [obj.name, obj.username, obj.email, obj.picture]
        let count = 0
        for (let i = 0; i < currentProfile.length; i++){
            if (currentProfile[i] == newProfile[i]) {
                count++
            } else {
                if (keys[i]) {
                    obj[keys[i]] = formData[keys[i]]
                }
            }
        }
        if (count == 4) {
            setEditable(false)
            return toast.error("No updates")
        }
        const response = await updateProfile(obj, profile.id)
        if (response.message) {
            dispatch(updateUser({ ...profile, ...obj }))
            setEditable(false)
            return toast.success("profile updated")
        }
        return setErrorMessage({...errorMessage, profile: response})
    }

    const handlePasswordChange = async (event) => {
        event.preventDefault()
        const { confirmPassword, ...password } = passwordFormData
        const res = isEmpty(passwordFormData) 
        if (res != "OK") return setErrorMessage({...errorMessage, password: res})
        if (password.currentPassword == password.newPassword) {
            return setErrorMessage({...errorMessage, password: "New password same as current password" })
        }
        if (!regex.password.test(password.newPassword)) {
            return setErrorMessage({...errorMessage, password: passwordError})
        }
        if (password.newPassword != confirmPassword) {
            return setErrorMessage({...errorMessage, password: passwordMismatchError})
        }
        const response = await updatePassword(password, profile.id)
        if (response.message) {
            removeToken()
            dispatch(updateUser(reduxInitialStateUser))
            return navigate("/login")
        }
        return setErrorMessage({...errorMessage, password: response})
    }
    
    return (
        <div className='mt-20 text-white flex px-2 md:px-10 justify-center'>
            <div className='w-full md:w-[600px] p-3'>
                <label htmlFor='picture' className='flex overflow-hidden cursor-pointer items-center gap-3 justify-center rounded-xl'>
                    <div className='w-36 relative group'>
                        <img alt='user avatar' src={(imageFile && URL.createObjectURL(imageFile)) || profile.picture || `./user-avatar.jpg`} className='w-36 rounded-full object-fill aspect-square' />   
                        <div className='absolute group-hover:bottom-0 bg-primary bg-opacity-60 transition-all duration-300 ease-linear bottom-[-10rem] flex justify-center w-full h-1/3'>
                            <i className='fa fa-camera text-2xl mt-2'/>
                        </div>
                    </div>
                    {editable && <input id='picture' type="file" className='hidden' onChange={(e) => setImageFile(e.target.files[0])} />}
                </label>
                <p className='text-center text-xl'>{profile.name}</p>
                <p className='text-center italic'>@{ profile.username }</p>
                <h2 className='text-center text-xl text-white mb-3 mt-10'>Profile Informations</h2>
                <form className='w-full' onSubmit={handleProfileUpdate} onChange={e => handleUserInfoForm(e.target.name, e.target.value)}>
                    <div className='bg-hover flex items-center gap-3 rounded-xl'>
                        <i className='fa fa-user ps-4'/>
                        <input defaultValue={profile.name} type={editable ? `text` : `button`} className='w-full bg-hover text-start cursor-pointer ps-0 p-3 outline-none rounded-r-xl' name='name' placeholder='Name'/>
                    </div>
                    <div className='bg-hover flex items-center gap-3 rounded-xl mt-3'>
                        <i className='fa fa-at ps-4'/>
                        <input defaultValue={profile.username} type={editable ? `text` : `button`} className='w-full bg-hover text-start ps-0 p-3 cursor-pointer outline-none rounded-r-xl' name="username" placeholder='Username'/>
                    </div>
                    <div className='bg-hover flex items-center gap-3 rounded-xl mt-3'>
                        <i className='fa fa-envelope ps-4'/>
                        <input defaultValue={profile.email} type={editable ? `text` : `button`} className='w-full bg-hover text-start ps-0 p-3 outline-none cursor-pointer rounded-r-xl' name="email" placeholder='Email'/>
                    </div>
                    <div>
                        {errorMessage.profile && <div className='mt-2 text-red-500 text-center'>{errorMessage.profile}</div>}
                        {
                            editable &&
                                <button type='submit' className='w-full flex p-2 bg-secondary text-white justify-center rounded-lg items-center gap-2 mt-5'><i className='fa fa-save'/>Save Changes</button>
                        }
                    </div>
                </form>
                {
                    !editable &&
                        <button type='button' className='w-full flex p-2 bg-secondary text-white justify-center rounded-lg items-center gap-2 mt-5' onClick={() => setEditable(true)}><i className='fa fa-pen'/> Edit Profile</button>
                }
                <h2 className='text-center text-xl text-white mb-3 mt-10'>Change Password</h2>
                <form className='w-full' onSubmit={handlePasswordChange} onChange={e => handlePasswordForm(e.target.name, e.target.value)}>
                    <div className='bg-hover flex items-center gap-3 rounded-xl'>
                        <i className='fa fa-key ps-4'/>
                        <input type="text" className='w-full bg-hover ps-0 p-3 outline-none rounded-r-xl' name='currentPassword' placeholder='Current Password'/>
                    </div>
                    <div className='bg-hover flex items-center gap-3 rounded-xl mt-3'>
                        <i className='fa fa-lock ps-4'/>
                        <input type="text" className='w-full bg-hover ps-0 p-3 outline-none rounded-r-xl' name="newPassword" placeholder='New Password'/>
                    </div>
                    <div className='bg-hover flex items-center gap-3 rounded-xl mt-3'>
                        <i className='fa fa-lock ps-4'/>
                        <input type="text" className='w-full bg-hover ps-0 p-3 outline-none rounded-r-xl' name="confirmPassword" placeholder='Confirm Password'/>
                    </div>
                    {errorMessage.password && <div className='mt-2 text-red-500 text-center'>{errorMessage.password}</div>}
                    <div>
                        <button type='submit' className='w-full flex p-2 bg-secondary text-white justify-center rounded-lg items-center gap-2 mt-5'><i className='fa fa-pen'/>Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
