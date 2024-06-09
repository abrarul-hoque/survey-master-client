import { Link } from "react-router-dom";
import moment from 'moment';

const SurveyCard = ({ survey }) => {
    const { _id, title, description, category, yesOption, noOption, deadline } = survey;


    return (
        <div className='border p-6 my-2 rounded-xl'>
            <h1 className='text-xl font-bold mb-3'>{title}:</h1>
            <h2 className='text-base mb-3'>{description}</h2>
            <p className="text-base my-2">Category: {category}</p>
            <div className="flex justify-between items-center">
                <p>Total Votes: {yesOption + noOption || "No vote casted yet"}</p>
                <p>Deadline: {moment(deadline).format('LL')}</p>
            </div>

            <div className="flex justify-center my-4">
                <Link to={`/surveys/surveyDetails/${_id}`}>
                    <button className="btn btn-primary">Details</button>
                </Link>
            </div>
        </div>
    );
};

export default SurveyCard;