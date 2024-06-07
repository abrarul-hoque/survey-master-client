import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSurveyor = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        // enabled: !loading,
        queryFn: async () => {
            console.log("Asking or checking is Surveyor", user);
            const res = await axiosSecure.get(`/users/surveyor/${user?.email}`);
            console.log(res.data);
            return res.data?.surveyor;
        },
        enabled: !!user?.email

    })

    return [isSurveyor, isSurveyorLoading || authLoading]
};

export default useSurveyor;