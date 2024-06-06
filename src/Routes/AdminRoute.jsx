import React from 'react';
import useAdmin from '../hooks/useAdmin';
import { useLocation } from 'react-router-dom';
import loader from '../assets/loader.svg';
import useAuth from '../hooks/useAuth';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();
    if (loading || isAdminLoading) {
        return <div className="flex justify-center"><img src={loader} alt="" /></div>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;