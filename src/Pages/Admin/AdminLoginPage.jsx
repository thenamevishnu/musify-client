import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar';
import AdminLogin from '../../Components/Admins/AdminLogin';

const AdminLoginPage = () => {
    return (
        <Fragment>
            <NavBar admin/>
            <AdminLogin />
        </Fragment>
    );
}

export default AdminLoginPage;
