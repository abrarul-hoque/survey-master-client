import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import mainLogo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAdmin from '../hooks/useAdmin';
import loader from '../assets/loader.svg';

const DashboardRoot = () => {
    const { user, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    // console.log("DashboardRoot: user", user);
    // console.log("DashboardRoot: isAdmin", isAdmin);
    // console.log("DashboardRoot: isAdminLoading", isAdminLoading);


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

    if (isAdminLoading) {
        <div className="flex justify-center"><img src={loader} alt="" /></div>
    }


    return (
        <div className='flex gap-4'>
            <div className='w-44 lg:w-60 h-screen bg-warning'>
                <img src={mainLogo} className='px-6 my-2' alt="" />
                <ul className='menu p-4 space-y-2'>
                    {
                        isAdmin ? <>
                            {console.log("Showing admin menus")}
                            <div className='flex justify-center mb-4'>
                                <img className='rounded-full h-20 w-20 border-4 border-warning' src={user.photoURL} alt="" />
                            </div>
                            <li><NavLink to="/dashboard/adminHome">Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/users">Users</NavLink></li>
                        </>
                            : <>
                                {/* {normal User Menus} */}
                                {console.log("Showing USER menus")}

                                <li><NavLink to="/dashboard/userHome">User Home</NavLink></li>
                                <li><NavLink to="/dashboard/participatedSurveys">Participated Surveys</NavLink></li>
                                <li><NavLink to="/dashboard/reports">Reports</NavLink></li>
                            </>
                    }


                    {/* Admin Menus */}
                    {/* <li><NavLink to="userHome">User Home</NavLink></li>
                    <li><NavLink to="userHome"></NavLink></li> */}

                    <div className='divider'></div>
                    <li><NavLink to="/">Home</NavLink></li>
                    <button onClick={handleSignOut} className='btn'>Logout</button>
                </ul>
            </div>
            <div className='flex-1 p-4'>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default DashboardRoot;