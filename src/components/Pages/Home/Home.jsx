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

const Home = () => {
    const [surveys] = useSurveys();
    // const [surveyQuestions, setSurveyQuestions] = useState([]);
    const sixSurveys = surveys.slice(0, 6);
    console.log(surveys)
    // const axiosPublic = useAxiosPublic();

    // axiosPublic.get("/surveys");
    // console.log(res.data);

    // useEffect(() => {
    //     fetch('/survey-data.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setSurveyQuestions(data);
    //         })
    // }, [])


    return (
        <div className='max-w-6xl mx-auto'>
            <Banner></Banner>

            {/* 6 most voted surveys from DB */}
            <div>
                <SectionTitle subHeading={"Featured Surveys"} heading={"Most Voted Surveys in Survey Master"}></SectionTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {
                        sixSurveys.map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                    }
                </div>
            </div>

            {/* 6 mons recently created surveys from the DB */}
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