import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './shared/Header';
import Footer from './shared/Footer';
import 'animate.css';
import '../assets/hover-min.css';
const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;