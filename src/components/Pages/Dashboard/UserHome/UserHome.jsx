import { Helmet } from "react-helmet";
import useAuth from "../../../../hooks/useAuth";


const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | User Home</title>
            </Helmet>
            <h2 className='text-3xl'>
                Hi! Welcome {user.displayName ? user.displayName : "Back"}
            </h2>
        </div>
    );
};

export default UserHome;