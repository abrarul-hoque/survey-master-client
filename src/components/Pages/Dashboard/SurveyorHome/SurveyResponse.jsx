import React from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';

const SurveyResponse = () => {
    const surveyResponse = useLoaderData();
    console.log(surveyResponse)

    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Surveys</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Total Response for this Survey: {surveyResponse.length}</h1>

            {
                surveyResponse.length === 0 ? <p className='text-xl text-center my-5'>No Response found!</p> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Email</th>
                                    <th>User Name</th>
                                    <th>Vote</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    surveyResponse.map((response, idx) => <tr key={response._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{response?.userEmail || "Anonymous"}</td>
                                        <td>{response.userName}</td>

                                        <td>{response.vote}</td>

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

export default SurveyResponse;