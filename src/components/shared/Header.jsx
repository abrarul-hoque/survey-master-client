import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import mainLogo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut } = useAuth();
    const navLinks = <>
        <li className='ml-6'><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/surveys">Surveys</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
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
                    <Link to="/"><a className=""><img src={mainLogo} alt="" /></a></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/checkOut"><a className="btn btn-warning mr-2">Upgrade</a></Link>
                    {
                        user ?
                            <div>
                                <a id="clickable">
                                    <div className='w-10 h-10'>
                                        <img className='rounded-full w-16 h-10 mr-2 bg-white p-1 border border-red-400' src={user.photoURL || "https://i.ibb.co/XX4DwkF/default-user.webps"} alt="" />
                                    </div>
                                </a>
                                <Tooltip className='z-9999' anchorSelect="#clickable" clickable>
                                    <div className='flex flex-col'>
                                        <p className='mb-3  text-[#ff9123] font-bold p-3 rounded-xl'>{user.displayName}</p>
                                        {/* <Link to="/myAccount"><button className='mb-3 bg-[#AFC4DD] text-[#000] p-3 rounded-xl'>My Account</button></Link> */}
                                        <NavLink to="/userProfile" className='mb-3 bg-[#AFC4DD] text-[#000] p-3 rounded-xl'>User Profile</NavLink>

                                        <button onClick={handleSignOut} className='mb-3 btn btn-success text-[#000] p-3 rounded-xl'>Logout</button>

                                    </div>
                                </Tooltip>
                            </div>
                            :
                            <Link to="/login"><a className="btn btn-primary ml-2">Login</a></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;