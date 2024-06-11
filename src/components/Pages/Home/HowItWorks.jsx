import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { PiSignInBold } from "react-icons/pi";
import { IoIosCreate } from "react-icons/io";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { FcProcess } from "react-icons/fc";

const HowItWorks = () => {
    return (
        <div>
            <SectionTitle subHeading={"Working steps"} heading={"How It Works"}></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='border p-4 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white'>
                    <PiSignInBold className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Sign Up</h2>
                    <p>Create your account in seconds and start building your first survey.</p>
                </div>
                <div className='border p-4 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white'>
                    <IoIosCreate className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Create Surveys</h2>
                    <p>Use our easy-to-use editor to create engaging surveys and Customize your surveys to match your brand.</p>
                </div>
                <div className='border p-4 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white'>
                    <HiMiniSquaresPlus className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Collect Responses</h2>
                    <p>Share your surveys via email, social media, or direct links and Gather responses and watch the data come in real-time.</p>
                </div>
                <div className='border p-4 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white'>
                    <FcProcess className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Analyze Data</h2>
                    <p>Share your surveys via email, social media, or direct links and Gather responses and watch the data come in real-time.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;