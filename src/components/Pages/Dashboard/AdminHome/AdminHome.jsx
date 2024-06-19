import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import useAdmin from '../../../../hooks/useAdmin';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const customShapeBarColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const colors2 = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042',];
const barColors = ['#0088FE', '#00C49F', '#FFBB28'];
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};
const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
const AdminHome = () => {
    const { user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const axiosSecure = useAxiosSecure();

    // getting all users
    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const normalUser = users.filter(user => user.role === "user");
    const proUser = users.filter(user => user.role === "pro-user");
    const surveyor = users.filter(user => user.role === "surveyor");
    const admin = users.filter(user => user.role === "admin");

    const usersData = [
        { userRole: "Normal User", value: normalUser.length },
        { userRole: "Pro User", value: proUser.length },
        { userRole: "Surveyor", value: surveyor.length },
        { userRole: "Admin", value: admin.length },
    ];

    // getting all surveys
    const { data: surveys = [], refetch: refetchSurveys } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/admin/surveys');
            return res.data;
        }
    })

    const publishedSurveys = surveys.filter(survey => survey.surveyStatus === "publish");
    const unPublishedSurveys = surveys.filter(survey => survey.surveyStatus === "unpublish");

    const surveyData = [
        { status: "Published Surveys", value: publishedSurveys.length },
        { status: "Unpublish Surveys", value: unPublishedSurveys.length },
    ];



    // getting All Payments
    const { data: payments = [], refetch: refetchPayments } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        }
    })

    // getting all contact messages
    const { data: contactMessage = [], refetch: refetchComments } = useQuery({
        queryKey: ['contactMessage'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/contactMessage`);
            return res.data;
        }
    })




    const allData = [
        { topic: "Users", value: users.length },
        { topic: "Surveys", value: surveys.length },
        { topic: "Payments", value: payments.length },
        { topic: "Contact Messages", value: contactMessage.length },
    ];

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | Admin Home</title>
            </Helmet>
            <h2 className='text-3xl text-center my-6'>
                Hi! Welcome {user.displayName ? user.displayName : "Back"}
            </h2>

            <div className='flex flex-col lg:flex-row items-center gap-8 my-4 shadow-md p-10'>
                <div className='flex-1'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-4 border-warning h-36 w-36' src={user.photoURL} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-3'>
                    <h1 className='text-xl lg:text-2xl'>Name: {user.displayName}</h1>
                    <h1 className='text-xl lg:text-2xl'>Email: {user.email}</h1>
                    <h1 className='text-xl lg:text-2xl'>User Role: {isAdmin && "Admin"}</h1>
                </div>
            </div>

            {/* Dashboard Charts */}
            <div className="border rounded-xl shadow-md my-8 p-4">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={allData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="topic" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value">
                                {allData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-4'>
                {/* Custom shape Bar Chart for Users */}
                <div className='w-full lg:w-1/2'>
                    <div className="border rounded-xl shadow-md my-8 p-4">
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={usersData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="userRole" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                        {usersData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={customShapeBarColors[index % 20]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
                {/* Pie Chart for surveys */}
                <div className='w-full lg:w-1/2 shadow-md rounded-xl '>
                    <div style={{ height: 300, padding: 0 }}>
                        <ResponsiveContainer height="100%">
                            <h1 className="text-2xl font-bold mt-5 text-center ">Published & Unpublished Surveys:</h1>
                            <PieChart>

                                <Pie
                                    data={surveyData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.status}: ${entry.value}`} // Custom label showing status and value
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {surveyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={customShapeBarColors[index % customShapeBarColors.length]} />
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

export default AdminHome;