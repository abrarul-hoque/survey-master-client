import { Helmet } from "react-helmet";
import useSurveys from "../../../hooks/useSurveys";
import SectionTitle from "../../shared/SectionTitle";
import SurveyCard from "../../shared/SurveyCard";
import { useState } from "react";

const Surveys = () => {
    const surveys = useSurveys();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortByVote, setSortByVote] = useState(false);
    console.log(surveys[0])

    const filteredSurveys = surveys[0].filter((survey => {
        if (selectedCategory === "") return true;
        return survey.category === selectedCategory;
    }));


    const sortedSurveys = sortByVote ? [...filteredSurveys].sort((a, b) => b.yesOption + b.noOption - (a.yesOption + a.noOption)) : filteredSurveys;

    const handleFilterChange = event => {
        setSelectedCategory(event.target.value);
    }

    const handleSortClick = () => {
        setSortByVote((prevState) => !prevState);
    }


    return (
        <div className="max-w-6xl mx-auto p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | All Surveys</title>
            </Helmet>


            <SectionTitle heading={"All Surveys"} subHeading={"View and Vote to a Surveys"}></SectionTitle>
            <div className="flex  flex-col lg:flex-row justify-between items-center">
                <div className="text-base">
                    {/* Filter */}
                    <label htmlFor="category">Filter by Category</label>
                    <select className="border-primary border-2 rounded-xl p-3 ml-2" onChange={handleFilterChange} value={selectedCategory} name="" id="category">
                        <option value="">All Categories</option>
                        <option value="Customer Satisfaction">Customer Satisfaction</option>
                        <option value="Employee Engagement">Employee Engagement</option>
                        <option value="Market Research">Market Research</option>
                        <option value="Academic Research">Academic Research</option>
                        <option value="Social Research">Social Research</option>
                        <option value="Technology and Software">Technology and Software</option>
                        <option value="Customer Experience">Customer Experience</option>
                    </select>
                </div>

                {/* Sort button */}
                <div className="my-4">
                    <button className="btn btn-primary" onClick={handleSortClick}>
                        {sortByVote ? "Unsort" : "Sort by Vote"}
                    </button>
                </div>
            </div>
            <div className="divider my-0"></div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    // surveys[0].map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                    sortedSurveys.map((survey, idx) => <SurveyCard key={idx} survey={survey}></SurveyCard>)
                }
            </div>
        </div >
    );
};

export default Surveys;