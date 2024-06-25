import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar';
import AdminReport from '../../Components/Admins/AdminReport';

const AdminReportsPage = () => {
    return (
        <Fragment>
            <NavBar admin />
            <AdminReport />
        </Fragment>
    );
}

export default AdminReportsPage;
