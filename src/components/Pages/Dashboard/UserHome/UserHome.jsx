import { Helmet } from "react-helmet";
import useAuth from "../../../../hooks/useAuth";
import useProUser from "../../../../hooks/useProUser";


const UserHome = () => {
    const { user } = useAuth();
    const [isProUser] = useProUser();
    console.log(isProUser)
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | User Home</title>
            </Helmet>
            <h2 className='text-3xl text-center'>
                Hi! Welcome {user?.displayName ? user?.displayName : "Back"}
            </h2>
            <div className='flex flex-col lg:flex-row items-center gap-8 my-4 shadow-md p-10'>
                <div className='flex-1'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-4 border-warning w-48 h-48' src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-3'>
                    <h1 className='text-xl lg:text-2xl'>Name: {user?.displayName}</h1>
                    <h1 className='text-xl lg:text-2xl'>Email: {user?.email}</h1>
                    <h1 className='text-xl lg:text-2xl'>User Role: {isProUser ? "Pro-User" : "User"}</h1>
                </div>
            </div>
        </div>
    );
};

export default UserHome;