import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        }
    })


    const handleAprovePayment = (userEmail, paymentId) => {
        axiosSecure.patch(`/payments/${paymentId}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    axiosSecure.patch(`/users/${userEmail}`)
                        .then(res => {
                            console.log(res.data)
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Payment has been Approved`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                }


            })
            .catch(error => {
                console.log(error)
            })

    }

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
                            <th>User Email</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{payment.email}</td>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                <td>{payment.status}</td>
                                <td><button
                                    onClick={() => handleAprovePayment(payment.email, payment._id)}
                                    className='btn'
                                    disabled={payment.status === "approved"}
                                >Approve</button></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;