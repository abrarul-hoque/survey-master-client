import React from 'react';
import useSurveys from '../../../../hooks/useSurveys';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { FcViewDetails } from 'react-icons/fc';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllSurvey = () => {
    // const [surveys, refetch] = useSurveys();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/admin/surveys');
            return res.data;
        }
    })

    // const handleUnpublish = survey => {
    //     console.log(survey);
    //     axiosSecure.patch(`/admin/survey/${survey._id}`)
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.modifiedCount > 0) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${survey.title} is Unpublished!`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });

    //             }
    //         });
    // }



    const handleUnpublish = survey => {
        console.log(survey);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            input: 'textarea', // Add an input field for the admin message
            inputPlaceholder: 'Enter your feedback here...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unpublish the survey!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write a message!'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const adminMessage = result.value; // Get the admin message
                const feedback = {
                    feedbackMessage: adminMessage
                }
                axiosSecure.patch(`/admin/survey/${survey._id}`, feedback)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            // perform post a feedback message on db
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${survey.title} is Unpublished!`,
                                showConfirmButton: true,
                            });
                        }
                    })
                    .catch(error => {
                        console.log("Error updating survey :", error);
                    })
            }
        });


    }


    const handleDeleteSurvey = async (id) => {
        const res = await useAxiosSecure.delete(`/surveys/${id}`);
        if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${res.data.title} has been deleted!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | All Surveys</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Your Surveys</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Survey Title</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveys.map((survey, idx) => <tr key={survey._id} className="hover">
                                <th>{idx + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.category}</td>
                                <td>{survey.createdBy}</td>
                                <td>{new Date(survey.deadline).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</td>
                                <td>{survey.surveyStatus}</td>
                                <td >
                                    <div className='flex flex-col justify-center'>
                                        <Link to={`/dashboard/surveyor/surveys/${survey._id}`}>
                                            <button className="btn btn-primary mr-2 mb-1 btn-sm tooltip" alt="Responses" data-tip="Responses">Responses</button>
                                        </Link>
                                        <button
                                            onClick={() => handleUnpublish(survey)}
                                            className='btn btn-warning mr-2 mb-1 btn-sm tooltip'
                                            alt="Update"
                                            data-tip="Unpublish Survey"
                                            disabled={survey.surveyStatus === "unpublish"}
                                        >
                                            Unpublish
                                        </button>
                                        <button onClick={() => handleDeleteSurvey(survey._id)} className='btn btn-error btn-sm mr-2 mb-1 '>Delete</button>


                                    </div>

                                </td>
                            </tr>)
                        }
                        {/* row 2 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSurvey;