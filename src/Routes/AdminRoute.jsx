import React from 'react';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import loader from '../assets/loader.svg';
import useAuth from '../hooks/useAuth';


const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // console.log("AdminRoute: user ", user);
    // console.log("AdminRoute: isAdmin ", isAdmin);
    // console.log("AdminRoute: authLoading ", authLoading);
    // console.log("AdminRoute: isAdminLoading ", isAdminLoading);



    if (authLoading || isAdminLoading) {
        return <div className="flex justify-center"><img src={loader} alt="loading...." /></div>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;