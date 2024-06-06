import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !loading,
        queryFn: async () => {
            console.log("asking or checking is admin", user);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        },
        enabled: !!user?.email
    })
    // console.log("useAdmin: user", user);
    // console.log("useAdmin: isAdmin", isAdmin);
    // console.log("useAdmin: authLoading", authLoading);
    // console.log("useAdmin: isAdminLoading", isAdminLoading);

    return [isAdmin, isAdminLoading || authLoading];
};

export default useAdmin;