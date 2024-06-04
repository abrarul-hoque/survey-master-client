import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { Helmet } from "react-helmet";
import OurTeam from './OurTeam';

const AboutUs = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | About Us</title>
            </Helmet>
            <SectionTitle subHeading={"About Us"} heading={"Empowering Informed Decisions Through Powerful Surveys"}></SectionTitle>
            <div className='text-base space-y-3 mb-8'>
                <p>Welcome to <strong>Survey Master</strong>, your trusted partner in collecting and analyzing valuable feedback. Our mission is to empower businesses, organizations, and individuals to make data-driven decisions through comprehensive and user-friendly survey solutions.</p>
                <p>
                    In today's fast-paced and ever-evolving world, staying connected to the opinions and experiences of your audience is more critical than ever. Whether you're a small business owner aiming to improve customer satisfaction, a large corporation seeking to enhance employee engagement, or a nonprofit organization looking to gather community feedback, Survey Master provides the tools you need to achieve your goals.

                    Our platform is designed with simplicity and efficiency in mind, making it accessible to users of all skill levels. We offer a wide range of customizable templates and question types, allowing you to create surveys that are tailored to your specific needs. With just a few clicks, you can design and distribute surveys that capture the insights you need to drive growth and improvement.
                </p>
                <p>
                    But we don't stop at survey creation. At Survey Master, we believe that the true value of feedback lies in its analysis. Our real-time analytics dashboard provides you with instant access to your survey results, enabling you to track responses, identify trends, and generate detailed reports. This powerful feature ensures that you can make timely and informed decisions based on the most up-to-date data available.
                </p>
                <p>
                    We are committed to the security and reliability of our platform. Your data is protected by robust security measures, ensuring that your information remains safe and confidential. Our dedicated support team is always available to assist you, whether you need technical help or advice on survey design. We pride ourselves on delivering exceptional customer service and support to ensure your experience with Survey Master is seamless and successful.
                </p>
                <p>
                    Survey Master was founded on the belief that every opinion matters. We are driven by a passion for innovation and a commitment to excellence. Our vision is to become the leading provider of survey solutions worldwide, continually enhancing our platform to meet the evolving needs of our users.

                    Join the thousands of satisfied users who trust Survey Master for their survey needs. Discover the difference that comprehensive, user-friendly survey solutions can make in helping you gather the insights you need to make informed decisions. Thank you for choosing Survey Master. We look forward to partnering with you on your journey to success.


                </p>
                <h1 className='text-2xl font-bold mt-6 mb-4'>What We Offer</h1>

                <ul className='space-y-2'>
                    <li><strong>Easy Survey Creation:</strong> Our intuitive tools allow you to create surveys quickly and easily, with customizable templates and a variety of question types.</li>
                    <li><strong>Real-time Analytics:</strong> Get instant insights into your data with our real-time analytics dashboard. Track responses, view results, and generate reports with ease.</li>
                    <li><strong>Secure and Reliable:</strong> We prioritize your data security. Our platform is built with robust security measures to ensure your data is protected.</li>
                    <li><strong>Support and Guidance:</strong> Our dedicated support team is here to help you every step of the way. Whether you need technical assistance or survey design advice, we’ve got you covered.</li>
                </ul>
            </div>
            <OurTeam></OurTeam>
        </div>
    );
};

export default AboutUs;