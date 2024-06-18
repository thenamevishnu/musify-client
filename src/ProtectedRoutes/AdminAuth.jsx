import React from 'react';
import { getAdminToken } from '../Utils/localdb';
import { Navigate } from 'react-router-dom';

const AdminAuth = ({ login, children }) => {
    
    const token = getAdminToken()

    if (token) {
        if (login) {
            return <Navigate to={`/admin/${import.meta.env.VITE_ADMIN_HOME}`} />
        }
        return children
    } else {
        if (login) {
            return children
        }
        return <Navigate to={"/admin/login"} />
    }

}

export default AdminAuth;
