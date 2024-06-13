import React, { memo } from 'react'

const TrackDeleteAlert = ({ setOpenedModal, openedModal }) => {
    return (
        <div className={`${openedModal ? `pointer-events-auto bg-opacity-40 opacity-100` : `pointer-events-none opacity-0`} w-screen flex overflow-hidden justify-center pt-10 h-screen transition-all duration-300 ease-linear bg-black fixed top-0 z-[2]`}>
            <div className={`fixed ${openedModal ? `bottom-3` : `bottom-[-7rem]`} transition-all duration-200 ease-linear`}>
                <div className='text-white bg-primary p-3 w-[500px] rounded-xl'>
                    <h2>Are you sure to delete this audio?</h2>
                    <p>Title: {openedModal.title}</p>
                    <div className='mt-10 flex gap-4 justify-end'>
                        <button className='p-1 px-2 bg-red-500 rounded-md' onClick={() => setOpenedModal(false)}>Close</button>
                        <button className='p-1 px-2 bg-secondary rounded-md'>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(TrackDeleteAlert)
