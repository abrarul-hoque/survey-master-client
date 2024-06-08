import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const SurveysBySurveyor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [surveysBySurveyor, setSurveysBySurveyor] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/surveyor/surveys/${user?.email}`)
                // console.log(res.data);
                setSurveysBySurveyor(res.data);
            }
        };
        fetchSurveys();
    }, [user?.email, axiosSecure])



    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>Your Surveys</h1>

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
                            surveysBySurveyor.map((survey, idx) => <tr key={survey._id} className="hover">
                                <th>{idx + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.category}</td>
                                <td>{new Date(survey.deadline).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</td>
                                <td>{survey.surveyStatus}</td>
                                <td>
                                    <Link to={`/dashboard/surveyor/update/${survey._id}`}>
                                        <button className='btn btn-warning mr-2'>Update</button>
                                    </Link>
                                    <button className='btn btn-primary'>Details</button>
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

export default SurveysBySurveyor;