import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useSurveyor from '../../hooks/useSurveyor';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useSurveys from '../../hooks/useSurveys';
import { useQueryClient } from '@tanstack/react-query';
import { reload } from 'firebase/auth';
import moment from 'moment';
import PostComment from '../Pages/Surveys/PostComment';
import { MdReportProblem } from "react-icons/md";

const SurveyDetails = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [hasVoted, setHasVoted] = useState(false);
    const survey = useLoaderData();
    const { _id, title, description, category, deadline, createdOn, yesOption, noOption } = survey;
    const queryClient = useQueryClient();

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
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please log in to submit your vote!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const voteResponse = {
            surveyId: _id,
            vote: data?.vote.toLowerCase(),
            userEmail: user?.email,
            userName: user?.displayName,
        }
        try {
            const res = await axiosSecure.post("/vote", voteResponse);
            if (res.data?.voteResult?.insertedId) {
                console.log("Submitted Response", res.data);
                setHasVoted(true);
                Swal.fire({
                    title: "Success",
                    text: "Your vote submitted Successfully",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
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



    const handleReport = (survey) => {
        console.log(survey);
        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please log in to Report on a survey!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        Swal.fire({
            title: 'Warning!',
            text: `Are your sure to report for ${survey.title}?`,
            icon: 'warning',
            input: 'textarea', // Add an input field for the admin message
            inputPlaceholder: 'Enter your text here...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Report it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please write something!'
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reportMessage = result.value; // Get the admin message
                const reportData = {
                    reportMessage: reportMessage,
                    surveyId: survey._id,
                    surveyTitle: survey.title,
                    userEmail: user?.email,
                    reportedOn: new Date().toLocaleString(),
                }
                const res = await axiosSecure.post('/reports', reportData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // perform post a report message on db
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Report submitted for ${survey.title} `,
                                showConfirmButton: true,
                            });
                        }
                    })
                    .catch(error => {
                        console.log("Error Reporting survey :", error);
                    })
            }
        });


    }

    return (
        <div className='max-w-4xl mx-auto my-8'>
            <ToastContainer />

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | {title}</title>
            </Helmet>
            <div className='border p-6 my-2 rounded-xl shadow-md'>
                <h1 className='text-xl font-bold mb-3 text-center'>{title}:</h1>
                <div className="divider"></div>

                <h2 className='text-base mb-6'>{description}</h2>
                <h3 className='text-base my-3'><span className='font-bold'>Survey Category:</span> {category}</h3>
                <div className='flex justify-between'>
                    <h3 className='text-base mb-8'><span className='font-bold'>Created On:</span> {moment(createdOn).format("Do MMM YYYY")}</h3>
                    <h3 className='text-base mb-8'><span className='font-bold'>Deadline:</span> {moment(deadline).format("Do MMM YYYY")}</h3>
                </div>

                <p className='font-bold text-base mb-4'>Choose an option from the list below: </p>

                <div className='ml-10'>
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
                    <div className='flex justify-end'>
                        <button onClick={() => handleReport(survey)} className='text-red-500 font-semibold mb-4 flex items-center'>
                            <MdReportProblem className='mr-1' /> Report Inappropriate Content
                        </button>
                    </div>
                </div>

                {
                    hasVoted && <>
                        <div className='shadow-xl border p-6 rounded-xl w-full lg:w-3/5 flex justify-center mx-auto bg-primary text-center'>
                            <div >
                                <h1 className='text-3xl text-warning font-bold mb-3'>Survey Result:</h1>
                                <div className='text-white'>
                                    <p className='text-base'>Votted for Yes: {yesOption}</p>
                                    <p className='text-base'>Votted for No: {noOption}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className='border p-6 my-2 rounded-xl shadow-md'>
                <PostComment surveyId={_id} surveyName={title} deadline={deadline}></PostComment>
            </div>


        </div>
    );
};

export default SurveyDetails;