import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistoryUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-4xl text-center">Total Payments: {payments.length}</h2>
            <p className='text-center my-2'>(If Your payment is currently pending, Please be patient; an Admin will approve your payment shortly, and you will become a Pro-User)</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-orange-300">
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                <td>{payment.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistoryUser;