import React from 'react';
import Banner from './Banner';
import FeaturedSurvey from './FeaturedSurvey';
import HowItWorks from './HowItWorks';
import { Link } from 'react-router-dom';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Banner></Banner>
            {/* 6 most voted surveys from DB */}

            {/* 6 mons recently created surveys from the DB */}
            <FeaturedSurvey></FeaturedSurvey>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
            <div className='p-6 lg:p-10 text-center bg-base-300 rounded-xl my-6'>
                <h1 className='text-4xl font-bold mb-4'>Join Thousands of Satisfied Users</h1>
                <h2 className='text-2xl'>Ready to get started? <Link to="/register" className='font-bold underline'>Register now</Link></h2>
            </div>
        </div>
    );
};

export default Home;