import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

const SurveyDetails = () => {
    const survey = useLoaderData();
    const { title, description, options, totalVotes } = survey;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const submitVote = (data) => {
        // e.preventDefault();
        // const form = e.target;
        // const surveyAns = form.surveyOption;
        console.log(data)
    }


    // const onSubmit = (data) => console.log(data)

    const submitComment = (e) => {
        console.log(e)
    }

    return (
        <div className='max-w-4xl mx-auto my-8'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | {title}</title>
            </Helmet>
            <div className='border p-6 my-2 rounded-xl'>
                <h1 className='text-xl font-bold mb-3'>{title}:</h1>
                <h2 className='text-base mb-3'>{description}</h2>
                <div >
                    <form onSubmit={handleSubmit(submitVote)}>
                        {
                            options.map((option, idx) =>
                                <label key={idx} className="cursor-pointer flex">
                                    <input
                                        type="radio"
                                        name="surveyOption"
                                        {...register('surveyOption', { required: true })}
                                        className="checked:bg-blue-500"
                                    />
                                    <span className="label-text ml-2"> {option}</span>
                                </label>
                            )
                        }


                        <input className='btn btn-primary my-4' type="submit" value="Submit" />
                    </form>
                </div>
            </div>


            {/* form to submit comment */}
            <div>
                <form onSubmit={handleSubmit(submitComment)}>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Add comment:</span>
                        </div>
                        <textarea {...register("comment", { required: true })} className="textarea textarea-bordered h-24" placeholder="Add your Comment"></textarea>
                        {/* errors will return when field validation fails  */}
                        {errors.comment && <span className='text-red-400 my-4'>This field is required</span>}
                    </label>
                    <div className='flex justify-end'>
                        <input className='btn btn-warning my-5' type="submit" value="Post comment" />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyDetails;