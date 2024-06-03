import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import mainLogo from '../../assets/logo.png';

const Header = () => {
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/surveys">Surveys</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
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
                    <Link to="/checkOut"><a className="btn btn-warning">Upgrade</a></Link>
                    <Link to="/login"><a className="btn btn-primary ml-2">Login</a></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;