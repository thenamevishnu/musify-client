import React, { Fragment } from 'react'
import NavBar from '../../Components/NavBar'
import AdminHome from '../../Components/Admins/AdminHome'

const AdminHomePage = () => {
    return (
        <Fragment>
            <NavBar admin/>
            <AdminHome />
        </Fragment>
    )
}

export default AdminHomePage
