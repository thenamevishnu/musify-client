import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar';
import AdminUserManage from '../../Components/Admins/AdminUserManage';

const AdminUserManagePage = () => {
    return (
        <Fragment>
            <NavBar admin />
            <AdminUserManage />
        </Fragment>
    );
}

export default AdminUserManagePage;
