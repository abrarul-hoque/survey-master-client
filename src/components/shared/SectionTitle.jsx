import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className='text-center my-8'>
            <p className="text-warning text-base mb-4">{subHeading}</p>
            <h1 className='text-4xl font-extrabold mb-4'>{heading}</h1>
        </div>
    );
};

export default SectionTitle;