import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../../hooks/useAuth';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Legend } from '@headlessui/react';

const COLORS = ['#FFBB28', '#00C49F', '#0088FE', '#FF8042'];
const colors2 = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042',];

const SurveyorHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveysBySurveyor = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyor/surveys/${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const publishedSurveys = surveysBySurveyor.filter(survey => survey.surveyStatus === "publish");
    const unPublishedSurveys = surveysBySurveyor.filter(survey => survey.surveyStatus === "unpublish");

    const data = [
        { status: "Published Surveys", value: publishedSurveys.length },
        { status: "Unpublish Surveys", value: unPublishedSurveys.length },
    ];

    const unpublishSurveys = surveysBySurveyor.filter(survey => survey.surveyStatus === "unpublish");


    const data2 = [
        { topic: "Surveys", value: surveysBySurveyor.length },
        { topic: "Feedbacks", value: unpublishSurveys.length },
    ];
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | Surveyor Home</title>
            </Helmet>
            <h2 className='text-3xl text-center'>
                Hi! Welcome {user?.displayName ? user?.displayName : "Back"}
            </h2>
            {/* Users Info */}
            <div className='flex flex-col lg:flex-row items-center gap-8 my-4 shadow-md p-10'>
                <div className='flex-1'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-4 border-warning w-48 h-48' src={user.photoURL} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-3'>
                    <h1 className='text-xl lg:text-2xl'>Name: {user.displayName}</h1>
                    <h1 className='text-xl lg:text-2xl'>Email: {user.email}</h1>
                    <h1 className='text-xl lg:text-2xl'>User Role: Surveyor</h1>
                </div>
            </div>

            {/* Dashboard Charts */}
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='w-full lg:w-1/2 shadow-md rounded-xl'>
                    <div style={{ height: 400, padding: 0 }}>
                        <ResponsiveContainer height="100%">
                            <h1 className="text-2xl font-bold mt-5 text-center ">Surveys & Feedbacks</h1>
                            <PieChart width={400} height={400}>

                                <Pie
                                    data={data2}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.topic}: ${entry.value}`} // Custom label showing status and value
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors2[index % colors2.length]} />
                                    ))}
                                </Pie>
                                <Tooltip /> {/* Show tooltip on hover */}

                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                {/* publish and unpublish survey */}
                <div className='w-full lg:w-1/2 shadow-md rounded-xl'>
                    <div style={{ height: 400, padding: 0 }}>
                        <ResponsiveContainer height="100%">
                            <h1 className="text-2xl font-bold mt-5 text-center ">Published & Unpublished Surveys:</h1>
                            <PieChart width={400} height={400}>

                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.status}: ${entry.value}`} // Custom label showing status and value
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip /> {/* Show tooltip on hover */}

                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SurveyorHome;