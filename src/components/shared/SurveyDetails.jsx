import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useSurveyor from '../../hooks/useSurveyor';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SurveyDetails = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [hasVoted, setHasVoted] = useState(false);
    const survey = useLoaderData();
    const { _id, title, description, options, totalVotes } = survey;

    useEffect(() => {
        if (user) {
            checkIfVoted();
        }
    }, [user]);

    const checkIfVoted = async () => {
        const res = await axiosSecure.get(`/vote/check/${_id}/${user?.email}`);
        setHasVoted(res.data?.hasVoted);
    }

    const errorToast = (errorMessage) => toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    const submitVote = async (data) => {
        if (!user) {
            errorToast("Please log in to submit your vote!");
            return;
        }
        const voteResponse = {
            surveyId: _id,
            vote: data?.vote,
            userEmail: user?.email,
            userName: user?.displayName,
        }
        try {
            const res = await axiosSecure.post("/vote", voteResponse);
            if (res.data?.insertedId) {
                console.log("Submitted Response", res.data);
                setHasVoted(true);
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {
                errorToast("You have already voted on this survey");
            } else {
                errorToast("An error occured while submitting vote");
            }
            console.error("Error Submitting vote:", error);
        }

    }





    return (
        <div className='max-w-4xl mx-auto my-8'>
            <ToastContainer />

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | {title}</title>
            </Helmet>
            <div className='border p-6 my-2 rounded-xl'>
                <h1 className='text-xl font-bold mb-3'>{title}:</h1>
                <h2 className='text-base mb-3'>{description}</h2>
                <div >
                    <form onSubmit={handleSubmit(submitVote)}>
                        <label className="cursor-pointer flex mb-4">
                            <input
                                type="radio"
                                {...register('vote', { required: "Please select an option" })}
                                className="radio radio-primary"
                                value="Yes"
                                disabled={hasVoted}
                            />
                            <span className="label-text ml-2 text-base">Yes</span>
                        </label>
                        <label className="cursor-pointer flex mb-2">
                            <input
                                type="radio"
                                {...register('vote', { required: "Please select an option" })}
                                value="No"
                                disabled={hasVoted}
                                className="radio radio-primary"
                            />
                            <span className="label-text ml-2 text-base">No</span>
                        </label>
                        {/* {errors.vote && <p className='text-red-400 my-2'>{errors.vote.message}</p>} */}
                        {errors.vote && <p className='text-red-400 my-2'>{errors.vote.message}</p>}

                        <input
                            className='btn btn-primary my-4'
                            type="submit"
                            value="Submit"
                            disabled={isAdmin || isSurveyor || hasVoted}
                        />
                    </form>
                </div>
            </div>


        </div>
    );
};

export default SurveyDetails;