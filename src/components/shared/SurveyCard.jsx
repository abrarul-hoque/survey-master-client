import { Link } from "react-router-dom";

const SurveyCard = ({ survey }) => {
    const { _id, title, description, totalVotes } = survey;


    return (
        <div className='border p-6 my-2 rounded-xl'>
            <h1 className='text-xl font-bold mb-3'>{title}:</h1>
            <h2 className='text-base mb-3'>{description}</h2>
            <div className="flex justify-between items-center">
                <p>Total Votes: {totalVotes}</p>

                <Link to={`/surveys/surveyDetails/${_id}`}>
                    <button className="btn btn-primary">Details</button>
                </Link>
            </div>
        </div>
    );
};

export default SurveyCard;