import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !loading,
        enabled: !!user?.email,
        queryFn: async () => {
            console.log("asking or checking is admin", user);
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res.data);
            return res.data?.admin;
        },
    });

    if (error) {
        console.error("Error checking admin status : ", error);
    }


    return [isAdmin, isAdminLoading];
};

export default useAdmin;