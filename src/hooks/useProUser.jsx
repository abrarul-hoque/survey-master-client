import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProUser = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, 'isProUser'],
        queryFn: async () => {
            console.log("Asking the user is pro-user", user);
            const res = await axiosSecure.get(`/users/proUser/${user?.email}`);
            console.log(res.data);
            return res.data?.proUser;
        },
        enabled: !!user?.email
    });

    return [isProUser, isProUserLoading || authLoading]
};

export default useProUser;