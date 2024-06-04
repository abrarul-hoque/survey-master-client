import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../components/Pages/Home/Home";
import Root from "../components/Root";
import Surveys from "../components/Pages/Surveys/Surveys";
import Pricing from "../components/Pages/Pricing/Pricing";
import NotFound from "../components/Pages/NotFound/NotFound";
import SurveyDetails from "../components/shared/SurveyDetails";
import AboutUs from "../components/Pages/AboutUs/AboutUs";

const router = createBrowserRouter([
    {
        path: "",
        element: <Root></Root>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/surveys",
                element: <Surveys></Surveys>
            },
            {
                path: "/surveys/surveyDetails/:id",
                element: <SurveyDetails></SurveyDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/surveys/surveyDetails/${params.id}`)
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
            },
        ]
    },
]);

export default router;