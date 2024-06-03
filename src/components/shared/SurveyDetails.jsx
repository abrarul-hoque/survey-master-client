import React from 'react';

const SurveyDetails = () => {


    const submitVote = (e) => {
        e.preventDefault();
        const form = e.target;
        const surveyAns = form.surveyOption;
        console.log(surveyAns)
    }
    return (
        <div className='border p-6 my-2 rounded-xl'>
            <h1 className='text-xl font-bold mb-3'>{title}:</h1>
            <h2 className='text-base mb-3'>{description}</h2>
            <div >
                <form onSubmit={submitVote}>
                    {
                        options.map((option, idx) => <label key={idx} className="cursor-pointer flex">
                            <input type="radio" name="surveyOption" className="checked:bg-blue-500" />
                            <span className="label-text ml-2"> {option}</span>
                        </label>)
                    }
                    <input className='btn btn-primary my-4' type="submit" value="Submit" />
                </form>
            </div>

        </div>
    );
};

export default SurveyDetails;