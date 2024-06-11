import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const Comments = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: comments = [] } = useQuery({
        queryKey: ['comments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/comments/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Comments</title>
            </Helmet>

            {
                comments.length === 0 ? <p className='text-xl text-center my-5'>You have not commented to any surveys yet!</p> :
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
                                    comments.map((comment, idx) => <tr key={comment._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{comment.title}</td>
                                        <td>{comment.category}</td>
                                        <td>{new Date(comment.deadline).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</td>
                                        <td>{comment.surveyStatus}</td>
                                        <td>
                                            {/* <Link to={`/dashboard/surveyor/update/${comment._id}`}>
                                                <button className='btn btn-warning mr-2 mb-1 btn-sm tooltip' alt="Update" data-tip="Update"><FaPen></FaPen></button>
                                            </Link>
                                            <Link to={`/dashboard/surveyor/surveys/${comment._id}`}>
                                                <button className="btn btn-primary mr-2 mb-1 btn-sm tooltip" alt="Details" data-tip="Details"><FcViewDetails /></button>
                                            </Link>
                                            <button onClick={() => handleDeleteSurvey(comment._id)} className='btn btn-error btn-sm'><FaTrash></FaTrash></button> */}
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

export default Comments;