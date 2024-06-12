import { Helmet } from "react-helmet";
import useAuth from "../../../../hooks/useAuth";
import useProUser from "../../../../hooks/useProUser";
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Sector, Cell } from 'recharts';

const colors2 = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042',];
const barColors = ['#0088FE', '#00C49F', '#FFBB28'];

const UserHome = () => {
    const { user } = useAuth();
    const [isProUser] = useProUser();
    console.log(isProUser)

    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/surveys/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    const { data: reports = [] } = useQuery({
        queryKey: ['reports', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/reports/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });
    const { data: comments = [] } = useQuery({
        queryKey: ['comments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/comments/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    const allData = [
        { topic: "Participated Surveys", value: surveys.length },
        { topic: "Reported Surveys", value: reports.length },
        { topic: "Commented on Surveys", value: comments.length },
        { topic: "Payments", value: payments.length },
    ];
    // console.log(surveys, reports, comments)
    // <th>Title</th>
    // <th>Category</th>
    // <th>Deadline</th>
    // <th>Vote</th>

    const yesVoted = surveys.filter(survey => survey.vote === "yes");
    const noVoted = surveys.filter(survey => survey.vote === "no");

    const data = [
        { topic: "Yes", value: yesVoted.length },
        { topic: "No", value: noVoted.length },
    ];

    // const unpublishSurveys = surveysBySurveyor.filter(survey => survey.surveyStatus === "unpublish");


    // const data2 = [
    //     { topic: "Surveys", value: surveysBySurveyor.length },
    //     { topic: "Feedbacks", value: unpublishSurveys.length },
    // ];



    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | User Home</title>
            </Helmet>
            <h2 className='text-3xl text-center'>
                Hi! Welcome {user?.displayName ? user?.displayName : "Back"}
            </h2>
            <div className='flex flex-col lg:flex-row items-center gap-8 my-4 rounded-xl shadow-md p-10'>
                <div className='flex-1'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-4 border-warning w-48 h-48' src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-3'>
                    <h1 className='text-xl lg:text-2xl'>Name: {user?.displayName}</h1>
                    <h1 className='text-xl lg:text-2xl'>Email: {user?.email}</h1>
                    <h1 className='text-xl lg:text-2xl'>User Role: {isProUser ? "Pro-User" : "User"}</h1>
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
                <div className='w-full lg:w-1/2 shadow-md rounded-xl'>
                    <div style={{ height: 400, padding: 0 }}>
                        <ResponsiveContainer height="100%">
                            <h1 className="text-2xl font-bold mt-5 text-center ">Total Responses:</h1>
                            <PieChart width={400} height={400}>

                                `<Pie
                                    data={data}
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
                                </Pie>`
                                <Tooltip /> {/* Show tooltip on hover */}

                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default UserHome;