import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSurveys = () => {
    const axiosPublic = useAxiosPublic();

    const { data: surveys = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })
    return [surveys, loading, refetch]
};

export default useSurveys;