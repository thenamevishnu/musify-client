import React, { Fragment } from 'react'
import NavBar from '../Components/NavBar'
import MyTracks from '../Components/Songs/MyTracks'

const MyTracksPage = () => {
    return (
        <Fragment>
            <NavBar />
            <MyTracks />
        </Fragment>
    )
}

export default MyTracksPage
