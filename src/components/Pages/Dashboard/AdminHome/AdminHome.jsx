import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import useAdmin from '../../../../hooks/useAdmin';

const AdminHome = () => {
    const { user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | Admin Home</title>
            </Helmet>
            <h2 className='text-3xl text-center my-6'>
                Hi! Welcome {user.displayName ? user.displayName : "Back"}
            </h2>

            <div className='flex flex-col lg:flex-row items-center gap-8 my-4 shadow-md p-10'>
                <div className='flex-1'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-4 border-warning' src={user.photoURL} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-3'>
                    <h1 className='text-xl lg:text-2xl'>Name: {user.displayName}</h1>
                    <h1 className='text-xl lg:text-2xl'>Email: {user.email}</h1>
                    <h1 className='text-xl lg:text-2xl'>User Role: {isAdmin && "Admin"}</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;