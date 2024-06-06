import SectionTitle from "../../shared/SectionTitle";
import { Link } from 'react-router-dom';

import './Pricing.css';
import { Helmet } from "react-helmet";
const Pricing = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Pricing Page</title>
            </Helmet>
            <SectionTitle subHeading={"Choose the Plan That's Right for You"} heading={"Upgrade to Pro and Unlock Advanced Features"}></SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8">
                <div className="border p-8 rounded-xl PricingCard">
                    <h1 className="text-2xl font-bold">Basic Plan - Free</h1>
                    <div className="divider my-0"></div>
                    <div>
                        <ul className="pricingPlanItem">
                            <li>● Perticipate in Surveys</li>
                            <li>● Report to a Survey</li>
                            <li>● Free Register</li>
                            <li>● Survey Result after Vote</li>
                        </ul>
                    </div>

                </div>
                <div className="border p-8 rounded-xl PricingCard">
                    <h1 className="text-2xl font-bold">Pro Plan - $75/month </h1>
                    <div className="divider my-0"></div>
                    <div>
                        <ul className="pricingPlanItem">
                            <li>● Perticipate in Surveys</li>
                            <li>● Add comment to a Survey</li>
                            <li>● Report to a Survey</li>
                            <li>● Like or Dislike to a Survey</li>
                            <li>● Free Register</li>
                            <li>● Survey Result after Vote</li>
                        </ul>
                        <div className="flex justify-center my-8">
                            <Link to="/payment"><button className="btn btn-primary">Upgrade to Pro-User</button></Link>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Pricing;