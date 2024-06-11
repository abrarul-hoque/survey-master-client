import React from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Reports = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: reports = [] } = useQuery({
        queryKey: ['reports', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/reports/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });


    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Reports</title>
            </Helmet>
            <h1 className='text-2xl font-bold text-center mb-6'>Reports : {reports.length}</h1>

            {
                reports.length === 0 ? <p className='text-xl text-center my-5'>No Reports found!</p> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Survey Name</th>
                                    <th>Report</th>
                                    <th>Deadline</th>
                                    <th>Reported On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports.map((report, idx) => <tr key={report._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{report.surveyTitle}</td>
                                        <td>{report.reportMessage}</td>
                                        <td>{new Date(report.deadline).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</td>
                                        <td>{report.reportedOn}</td>

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

export default Reports;