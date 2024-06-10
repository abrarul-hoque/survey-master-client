import React from 'react';
import { Helmet } from 'react-helmet';

const Feedbacks = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | All Feedbacks</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Feedbacks</h1>
        </div>
    );
};

export default Feedbacks;