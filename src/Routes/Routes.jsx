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
import Register from "../components/Pages/Register/Register";
import Login from "../components/Pages/Login/Login";
import DashboardRoot from "../components/DashboardRoot";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../components/Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../components/Pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import Users from "../components/Pages/Dashboard/AdminHome/Users";
import Payment from "../components/Pages/Pricing/Payment";
import PaymentHistory from "../components/Pages/Dashboard/AdminHome/PaymentHistory";
import PaymentHistoryUser from "../components/Pages/Dashboard/UserHome/PaymentHistoryUser";
import SurveyorHome from "../components/Pages/Dashboard/SurveyorHome/SurveyorHome";
import CreateSurvey from "../components/Pages/Dashboard/SurveyorHome/CreateSurvey";
import SurveysBySurveyor from "../components/Pages/Dashboard/SurveyorHome/SurveysBySurveyor";
import UpdateSurvey from "../components/Pages/Dashboard/SurveyorHome/UpdateSurvey";
import ParticipatedSurveys from "../components/Pages/Dashboard/UserHome/ParticipatedSurveys";
import Comments from "../components/Pages/Dashboard/UserHome/Comments";
import Reports from "../components/Pages/Dashboard/UserHome/Reports";
import AllSurvey from "../components/Pages/Dashboard/AdminHome/AllSurvey";
import Feedbacks from "../components/Pages/Dashboard/SurveyorHome/Feedbacks";
import SurveyResponse from "../components/Pages/Dashboard/SurveyorHome/SurveyResponse";
import Contact from "../components/Pages/Contact/Contact";
import ContactMessage from "../components/Pages/Dashboard/AdminHome/ContactMessage";

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
                element: <SurveyDetails />,
                loader: ({ params }) => fetch(`https://survey-app-server-hazel.vercel.app/surveys/surveyDetails/${params.id}`)
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "dashboard/surveyor",
        element: <PrivateRoute><DashboardRoot></DashboardRoot></PrivateRoute>,
        errorElement: <NotFound></NotFound>,
        children: [
            // Surveyor User Route
            {
                path: "surveyorHome",
                element: <SurveyorHome></SurveyorHome>
            },
            {
                path: "create",
                element: <CreateSurvey></CreateSurvey>
            },
            {
                path: "surveys",
                element: <SurveysBySurveyor></SurveysBySurveyor>
            },
            {
                path: "surveys/:id",
                element: <SurveyResponse></SurveyResponse>,
                loader: ({ params }) => fetch(`https://survey-app-server-hazel.vercel.app/dashboard/surveyor/surveys/${params.id}`)
            },
            {
                path: "update/:id",
                element: <UpdateSurvey></UpdateSurvey>,
                loader: ({ params }) => fetch(`https://survey-app-server-hazel.vercel.app/surveys/surveyDetails/${params.id}`)
            },
            {
                path: "feedbacks",
                element: <Feedbacks></Feedbacks>
            },


        ]
    },

    //Admin Routes
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardRoot></DashboardRoot></PrivateRoute>,
        errorElement: <NotFound></NotFound>,
        children: [
            // Normal User Route
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "participatedSurveys",
                element: <ParticipatedSurveys></ParticipatedSurveys>
            },
            {
                path: "reports",
                element: <Reports></Reports>
            },
            {
                path: "comments",
                element: <Comments />
            },
            {
                path: "contactMessage",
                element: <ContactMessage></ContactMessage>
            },
            {
                path: "surveys/:id",
                element: <SurveyResponse></SurveyResponse>,
                loader: ({ params }) => fetch(`https://survey-app-server-hazel.vercel.app/dashboard/surveyor/surveys/${params.id}`)
            },
            {
                path: "userPayments",
                element: <PaymentHistoryUser></PaymentHistoryUser>
            },


            //Admin Routes
            {
                path: "adminHome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "users",
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: "surveys",
                element: <AdminRoute><AllSurvey></AllSurvey></AdminRoute>
            },
            {
                path: "payments",
                element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
            },

        ]
    },
]);

export default router;

