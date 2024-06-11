import React from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaPen } from 'react-icons/fa6';

const Feedbacks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: surveysBySurveyor = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyor/surveys/${user?.email}`);
            return res.data;
        }
    });

    const unpublishSurveys = surveysBySurveyor.filter(survey => survey.surveyStatus === "unpublish");
    console.log(unpublishSurveys)
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | All Feedbacks</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Feedbacks given by Admin</h1>

            {
                unpublishSurveys.length === 0 ? <p className='text-xl text-center my-5'>No data found!</p> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Survey Title</th>
                                    <th>Category</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    unpublishSurveys.map((survey, idx) => <tr key={survey._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{survey.title}</td>
                                        <td>{survey.feedbackMessage}</td>
                                        <td>{survey.deadline}</td>

                                        <td>{survey.surveyStatus}</td>
                                        <td>
                                            <Link to={`/dashboard/surveyor/update/${survey._id}`}>
                                                <button className='btn btn-warning mr-2 mb-1 btn-sm tooltip' alt="Update" data-tip="Update"><FaPen></FaPen></button>
                                            </Link>
                                        </td>
                                    </tr>)
                                }
                                {/* row 2 */}


                            </tbody>
                        </table>
                    </div>
            }


        </div>
    );
};

export default Feedbacks;