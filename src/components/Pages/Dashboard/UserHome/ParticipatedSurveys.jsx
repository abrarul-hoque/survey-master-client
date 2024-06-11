import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const ParticipatedSurveys = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [] } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/surveys/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });


    // const { data: payments = [] } = useQuery({
    //     queryKey: ['payments', user.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/payments/${user.email}`);
    //         return res.data;
    //     }
    // })

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Home</title>
            </Helmet>
            <h1 className='text-3xl text-center my-4'>Participated Surveys: {surveys.length}</h1>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-orange-300">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Deadline</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveys.map((survey, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.category}</td>
                                <td>{survey.deadline}</td>
                                <td>{survey.vote}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParticipatedSurveys;