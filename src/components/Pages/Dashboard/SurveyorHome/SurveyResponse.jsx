import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';


const SurveyResponse = () => {
    const surveyResponse = useLoaderData();
    console.log(surveyResponse)

    const yesVote = surveyResponse.filter(response => response.vote === "yes");
    const noVote = surveyResponse.filter(response => response.vote === "no");

    const voteCount = [
        { voteFor: "yes", value: yesVote.length },
        { voteFor: "no", value: noVote.length },
    ];
    console.log(voteCount)

    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Surveys</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Total Response for this Survey: {surveyResponse.length}</h1>

            {
                surveyResponse.length === 0 ? <p className='text-xl text-center my-5'>No Response found!</p> : <>
                    <Tabs>
                        <TabList>
                            <Tab>Table View</Tab>
                            <Tab>Chart View</Tab>
                        </TabList>

                        <TabPanel>
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
                        </TabPanel>
                        <TabPanel>
                            <div style={{ width: '100%', height: 400 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {/* <BarChart width={400} height={250} data={voteCount} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart> */}
                                    <BarChart data={voteCount} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="voteFor" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>

                            </div>
                        </TabPanel>
                    </Tabs>


                </>
            }

        </div>
    );
};

export default SurveyResponse;