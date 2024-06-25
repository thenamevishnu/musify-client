import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar';
import AdminTrackRequests from '../../Components/Admins/AdminTrackRequests';

const AdminRequestsPage = () => {
    return (
        <Fragment>
            <NavBar admin />
            <AdminTrackRequests />
        </Fragment>
    );
}

export default AdminRequestsPage;
