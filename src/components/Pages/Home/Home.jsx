import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import FeaturedSurvey from './FeaturedSurvey';
import HowItWorks from './HowItWorks';
import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import SurveyCard from '../../shared/SurveyCard';
import SectionTitle from '../../shared/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useSurveys from '../../../hooks/useSurveys';
import { Helmet } from 'react-helmet';

const Home = () => {
    const [surveys] = useSurveys();
    const [recentSurveys, setRecentSurveys] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchRecentSurveys = async () => {
            try {
                const res = await axiosPublic.get('/surveys/recent');
                setRecentSurveys(res.data);
                console.log(res.data);
            }
            catch (error) {
                console.error("Error fetching recent surveys:", error);

            }
        };
        fetchRecentSurveys();

    }, []);

    console.log("before sort:", surveys)
    console.log("Recent Surveys:", recentSurveys)

    const sortedSurveys = surveys.sort((a, b) => {
        const aVotes = (a.yesOption || 0) + (a.noOption || 0);
        const bVotes = (b.yesOption || 0) + (b.noOption || 0);
        return bVotes - aVotes;
    });

    const sixMostVotedSurveys = sortedSurveys.slice(0, 6);


    return (
        <div className='max-w-6xl mx-auto p-4'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Home</title>
            </Helmet>
            <Banner></Banner>

            {/* 6 most voted surveys from DB */}
            <div>
                <SectionTitle subHeading={"Featured Surveys"} heading={"Most Voted Surveys in Survey Master"}></SectionTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {
                        sixMostVotedSurveys.map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                    }
                </div>
            </div>
            <div className="divider"></div>

            {/* 6 mons recently created surveys from the DB */}
            <div>
                <SectionTitle subHeading={"Latest Surveys"} heading={"Most Recently Created Surveys in Survey Master"}></SectionTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {
                        recentSurveys.map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                    }
                </div>
            </div>



            <FeaturedSurvey></FeaturedSurvey>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
            <div className='p-6 lg:p-10 text-center bg-base-300 rounded-xl my-6'>
                <h1 className='text-4xl font-bold mb-4'>Join Thousands of Satisfied Users</h1>
                <h2 className='text-2xl'>Ready to get started? <Link to="/register" className='font-bold underline'>Register now</Link></h2>
            </div>
        </div>
    );
};

export default Home;