import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !loading,
        queryFn: async () => {
            if (!user?.email) {
                throw new Error("User email is not available!");
            }
            console.log("asking or checking is admin", user);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        },
        enabled: !!user?.email,
        retry: false
    });

    if (error) {
        console.error("Error checking admin status : ", error);
    }
    // console.log("useAdmin: user", user);
    // console.log("useAdmin: isAdmin", isAdmin);
    // console.log("useAdmin: authLoading", authLoading);
    // console.log("useAdmin: isAdminLoading", isAdminLoading);

    return [isAdmin, isAdminLoading || authLoading];
};

export default useAdmin;