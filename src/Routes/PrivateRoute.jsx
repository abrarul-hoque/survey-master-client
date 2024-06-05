import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loader from '../assets/loader.svg';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center"><img src={loader} alt="" /></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;