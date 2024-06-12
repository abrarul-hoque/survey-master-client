import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import mainLogo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useSurveyor from '../../hooks/useSurveyor';
import useProUser from '../../hooks/useProUser';
import Tilt from 'react-parallax-tilt';

const Header = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const [isProUser] = useProUser();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // console.log(isSurveyor)
    const navLinks = <>
        <li className='ml-6'><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/surveys">Surveys</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/aboutUs">About Us</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>


    </>
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


    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);


    const handleTheemToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }


    return (
        <div className='max-w-6xl mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Tilt>
                        <Link to="/"><a className=""><img src={mainLogo} alt="" /></a></Link>
                    </Tilt>


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* theme toggler */}
                    <label className="cursor-pointer grid place-items-center mr-3">
                        <input type="checkbox" value="synthwave" onChange={handleTheemToggle} checked={theme === 'dark'} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                    {!isAdmin && !isSurveyor && !isProUser && <Link to="/payment"><a className="btn btn-warning mr-2 p-2">Upgrade</a></Link>}

                    {
                        user ?
                            <div>
                                <a id="clickable">
                                    <div className='w-10 h-10'>
                                        <img className='rounded-full w-16 h-10 mr-2 bg-white p-1 border border-red-400' src={user.photoURL || "https://i.ibb.co/XX4DwkF/default-user.webps"} alt="" />
                                    </div>
                                </a>
                                <Tooltip className='z-9999 rounded-xl' anchorSelect="#clickable" clickable>
                                    <div className='flex flex-col text-center'>
                                        <p className=' text-[#ff9123] font-bold text-base p-3 rounded-xl'>{user.displayName}</p>
                                        <p className='text-warning my-4 font-semibold text-base'>Logged in as: {isAdmin ? "Admin" : isSurveyor ? "Surveyor" : isProUser ? "Pro-User" : "User"} </p>
                                        {isAdmin ? <button className='btn btn-primary mb-2'><NavLink to="/dashboard/adminHome">Dashboard</NavLink></button> : isSurveyor ? <button className='btn btn-primary mb-2'><NavLink to="/dashboard/surveyor/surveyorHome">Dashboard</NavLink></button> : user ? <button className='btn btn-primary mb-2'><NavLink to="/dashboard/userHome">Dashboard</NavLink></button> : ""}
                                        <button onClick={handleSignOut} className='mb-3 btn btn-success text-[#000] p-3 rounded-xl'>Logout</button>

                                    </div>
                                </Tooltip>
                            </div>
                            :
                            <Link to="/login"><a className="btn btn-primary ml-2 p-2">Login</a></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;