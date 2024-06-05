import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardRoot = () => {

    return (
        <div className='flex'>
            <div className='w-60 bg-primary'>
                <ul className='menu p-4'>
                    {/* {normal User Menus} */}
                    <li><NavLink to="userHome">User Home</NavLink></li>
                    <li><NavLink to="userHome"></NavLink></li>

                    {/* Admin Menus */}
                    <li><NavLink to="userHome">User Home</NavLink></li>
                    <li><NavLink to="userHome"></NavLink></li>

                    <div className='divider'></div>
                    <li><NavLink to="/home">Home</NavLink></li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardRoot;