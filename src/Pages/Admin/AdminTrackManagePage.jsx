import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar';
import AdminTrackManage from '../../Components/Admins/AdminTrackManage';

const AdminTrackManagePage = () => {
    return (
        <Fragment>
            <NavBar admin />
            <AdminTrackManage />
        </Fragment>
    );
}

export default AdminTrackManagePage;
