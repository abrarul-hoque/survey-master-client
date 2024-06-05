import React from 'react';
import useAuth from '../../../../hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className='text-3xl text-center my-6'>
                Hi! Welcome {user.displayName ? user.displayName : "Back"}
            </h2>

            <div className='flex flex-col lg:flex-row'>
                <div>
                    <img src={user.displayUrl} alt="" />
                </div>
                <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;