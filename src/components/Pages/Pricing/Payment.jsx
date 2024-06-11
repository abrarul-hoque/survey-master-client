import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CheckOut';
import { Helmet } from 'react-helmet';


//stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Payment</title>
            </Helmet>
            <SectionTitle heading={"Proceed with Payment"} subHeading={"One Step Away from Enjoying Our Services for Pro-User"}></SectionTitle>
            <div className='flex justify-center'>
                <div className='w-full lg:w-2/4 shadow-xl my-16 p-8 rounded-xl'>
                    <Elements stripe={stripePromise}>
                        <CheckOut></CheckOut>
                    </Elements>
                </div>
            </div>


        </div>
    );
};

export default Payment;