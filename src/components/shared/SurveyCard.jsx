import { Link } from "react-router-dom";
import moment from 'moment';

const SurveyCard = ({ survey }) => {
    const { _id, title, description, category, yesOption, noOption, deadline, createdOn } = survey;


    return (
        <div className='border p-6 my-2 rounded-xl shadow-md'>
            <h1 className='text-xl font-bold mb-3 text-center'>{title}:</h1>
            <div className="divider"></div>

            <h2 className='text-base mb-3'>{description}</h2>
            <p className="text-base my-2"><span className="font-semibold">Category:</span>  {category}</p>
            <div className="flex justify-between items-center">
                <p><span className="font-semibold">Total Votes:</span>  {yesOption + noOption}</p>
                <p><span className="font-semibold">Deadline:</span>  {moment(deadline).format('LL')}</p>
            </div>
            <p className="text-center my-3"><span className="font-semibold">Survey Created On:</span> {moment(createdOn).format('LL')}</p>

            <div className="flex justify-center my-4">
                <Link to={`/surveys/surveyDetails/${_id}`}>
                    <button className="btn btn-primary">Details</button>
                </Link>
            </div>
        </div>
    );
};

export default SurveyCard;