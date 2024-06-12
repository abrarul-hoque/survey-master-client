import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, 'isProUser'],
        // enabled: !loading,
        enabled: !!user?.email,
        queryFn: async () => {
            console.log("Asking the user is pro-user", user);
            const res = await axiosSecure.get(`/users/proUser/${user?.email}`);
            console.log(res.data);
            return res.data?.proUser;
        },
    });

    return [isProUser, isProUserLoading]
};

export default useProUser;