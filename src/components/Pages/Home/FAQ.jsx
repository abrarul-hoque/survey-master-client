import React from 'react';
import SectionTitle from '../../shared/SectionTitle';

const FAQ = () => {
    return (
        <div>
            <SectionTitle subHeading={"Frequently Asked Questions"} heading={"Find Answers to Common Questions About SurveyMaster"}></SectionTitle>
            <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    What is SurveyMaster?
                </div>
                <div className="collapse-content">
                    <p>SurveyMaster is a comprehensive survey creation platform that allows you to design, distribute, and analyze surveys with ease. Our platform is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to provide a seamless user experience.</p>
                </div>
            </div>
            <div className="divider my-0"></div>

            <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    How do I get started with SurveyMaster?
                </div>
                <div className="collapse-content">
                    <p>Getting started is simple! Just sign up for a free account, and you can start creating your first survey in minutes. Explore our features and upgrade to a paid plan as needed.</p>
                </div>
            </div>
            <div className="divider my-0"></div>

            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Can I try SurveyMaster for free?
                </div>
                <div className="collapse-content">
                    <p>Yes! We offer a free Basic plan that allows you to create account, like or dislike to surveys. You can upgrade to our Pro or Enterprise plans for additional features and capabilities.</p>
                </div>
            </div>
            <div className="divider my-0"></div>

            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    How do I create a survey?
                </div>
                <div className="collapse-content">
                    <p>Once logged in, navigate to the "dashboard" {">"} "Create Survey" section. Use our default survey form to add questions and set your survey preferences.</p>
                </div>
            </div>
            <div className="divider my-0"></div>

            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    What roles are available for users?
                </div>
                <div className="collapse-content">
                    <p>We offer several predefined roles such as Admin, Surveyor, Pro-User and user. Admins have full access to all features, surveyor can create and manage surveys, Pro-User can comment on surveys and Normal users can only view and vote on surveys.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;