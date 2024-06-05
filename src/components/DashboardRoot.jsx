import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import mainLogo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
const DashboardRoot = () => {
    const { logOut } = useAuth();

    const handleSignOut = () => {
        logOut()
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: "Log Out Successful!",
                    icon: "success",
                    timer: 1500
                });
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='flex'>
            <div className='w-60 bg-warning'>
                <img src={mainLogo} className='px-6' alt="" />
                <ul className='menu p-4 space-y-2'>
                    {/* {normal User Menus} */}
                    <li><NavLink to="userHome">User Home</NavLink></li>
                    <li><NavLink to="participatedSurveys">Participated Surveys</NavLink></li>
                    <li><NavLink to="reports">Reports</NavLink></li>

                    {/* Admin Menus */}
                    {/* <li><NavLink to="userHome">User Home</NavLink></li>
                    <li><NavLink to="userHome"></NavLink></li> */}

                    <div className='divider'></div>
                    <li><NavLink to="/">Home</NavLink></li>
                    <button onClick={handleSignOut} className='btn'>Logout</button>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardRoot;