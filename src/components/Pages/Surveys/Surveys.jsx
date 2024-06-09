import { Helmet } from "react-helmet";
import useSurveys from "../../../hooks/useSurveys";
import SectionTitle from "../../shared/SectionTitle";
import SurveyCard from "../../shared/SurveyCard";

const Surveys = () => {
    const surveys = useSurveys();
    console.log(surveys[0])


    return (
        <div className="max-w-6xl mx-auto p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | All Surveys</title>
            </Helmet>
            <SectionTitle heading={"All Surveys"} subHeading={"View and Vote to a Surveys"}></SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    surveys[0].map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default Surveys;