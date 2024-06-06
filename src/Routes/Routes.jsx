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
                element: <PrivateRoute><SurveyDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/surveys/surveyDetails/${params.id}`)
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/payment",
                element: <Payment></Payment>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
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
                element: <UserHome></UserHome>
            },
            {
                path: "reports",
                element: <UserHome></UserHome>
            },
            {
                path: "comments",
                element: <UserHome></UserHome>
            },

            //Admin Routes
            // {
            //     path: "",
            //     element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            // },
            {
                path: "adminHome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "users",
                element: <AdminRoute><Users></Users></AdminRoute>
            },

        ]
    }
]);

export default router;