import React, { useState } from 'react'
import { uploadToCloud } from '../../Utils/cloudinary'
import { useSelector } from "react-redux"
import { uploadTrack } from '../../Services/Track'

const AddSong = ({ isModalOpen, setModalOpen }) => {

    const [formData, setFormData] = useState({ title: "", description: "", song: "" })
    const {id: user_id} = useSelector(state => state.users)
    const [errorMessage, setErrorMessage] = useState("")

    const resetError = () => {
        setErrorMessage("")
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            return setErrorMessage("Song is required")
        }
        const type = file.type.split("/")
        const isAudio = type[0]
        if(isAudio != "audio") return setErrorMessage("Selected file is not a audio")
        resetError()
        return setFormData({ ...formData, [e.target.name]: file })
    }

    const handleSongUpload = async (event) => {
        event.preventDefault()
        for (let key in formData) {
            if(!formData[key]) return setErrorMessage(`${key.replace(key[0], key[0].toUpperCase())} is required`)
        }
        const response = await uploadToCloud(formData.song)
        if (response.err) {
            return setErrorMessage(response.err)
        }
        formData.track = response.url
        formData.added = user_id
        const res = await uploadTrack(formData)
        if (!res.track) return setErrorMessage(res)
        return resetError()
    }

    return (
        <div className={`w-screen h-screen z-50 flex justify-center pt-6 bg-black bg-opacity-65 text-white ${isModalOpen ? `opacity-100 pointer-events-auto` : `opacity-0 pointer-events-none`} transition-all duration-300 ease-linear h-screen fixed top-0 left-0`}>   
            <form className='text-center w-full md:w-[500px] text-white' onSubmit={handleSongUpload} onChange={resetError}>
                <h1 className='text-3xl mb-5'>UPLOAD NEW SONG</h1>
                <div className='flex items-center bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-keyboard'/><input type="text" autoComplete='off' value={formData.title} onChange={e=>setFormData({...formData, [e.target.name]: e.target.value})} name='title' placeholder='Enter Title' className='border-0 bg-primary  outline-none p-3 px-4 w-full'/>
                </div>
                <div className='flex items-baseline bg-primary rounded-xl px-3 mt-4'>
                    <i className='fa fa-list'/><textarea type="text"  autoComplete='off' value={formData.description} onChange={e=>setFormData({...formData, [e.target.name]: e.target.value})} name='description' placeholder='Description about which film, singer, writter, etc.' className='border-0 bg-primary resize-none h-48  outline-none p-3 px-4 w-full'/>
                </div>
                 <label htmlFor='file' className='flex items-center gap-3 text-gray-400 cursor-pointer bg-primary rounded-xl px-3 mt-4 p-3'>
                    <i className='fa fa-upload'/><input id='file' type="file" accept='audio/mp3' name='song' onChange={handleFileChange} className='border-0 hidden bg-primary  outline-none p-3 px-4 w-full'/>
                    <div className='overflow-x-hidden whitespace-nowrap'>{ formData.song ? formData.song.name : `Select a song to upload`}</div>
                </label>
                {errorMessage && <div className='mt-4'>{ errorMessage }</div>}
                <input type="submit"  className='border-0 outline-none cursor-pointer p-2 bg-secondary text-lg px-4 rounded-full mt-4 w-full' value="Upload"/>
            </form>
            <div className='absolute top-2 right-2'>
                <i className='fa fa-close text-xl' onClick={() => setModalOpen(false)}/>
            </div>
        </div>
    )
}

export default AddSong
