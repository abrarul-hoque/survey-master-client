import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ContactMessage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contactMessage = [], refetch } = useQuery({
        queryKey: ['contactMessage'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/contactMessage`);
            return res.data;
        }
    })

    console.log(contactMessage)
    // dashboard/contactMessage
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Contact Messages</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Contact Form Messages: {contactMessage.length}</h1>

            {
                contactMessage.length === 0 ? <p className='text-xl text-center my-5'>No Messages found!</p> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactMessage.map((msge, idx) => <tr key={msge._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{msge.name}</td>
                                        <td>{msge.email}</td>
                                        <td>{msge.message}</td>
                                    </tr>)
                                }
                                {/* row 2 */}


                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default ContactMessage;