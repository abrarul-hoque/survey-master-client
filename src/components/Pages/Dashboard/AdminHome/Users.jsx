import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../../../../hooks/useAdmin';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const { user } = useAuth();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });


    const handleMakeSurveyor = user => {
        console.log(user);
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Surveyor now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {
        console.log(user)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete the user!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Dashboard | Users</title>
            </Helmet>

            <h1>Users </h1>
            <div>
                <div className="flex justify-between my-4">
                    <h2 className="text-3xl">All Users</h2>
                    <h2 className="text-3xl">Total Users: {users.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((singleUser, idx) => <tr key={singleUser._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{singleUser.name}</td>
                                    <td>{singleUser.email}</td>
                                    <td>{singleUser.role}</td>
                                    <td>
                                        <select
                                            onChange={() => handleMakeSurveyor(singleUser)}
                                            className="select select-bordered w-full max-w-xs"
                                            disabled={singleUser.email === user.email}
                                        >
                                            <option disabled selected>Change Role</option>
                                            <option value="surveyor" >Surveyor</option>
                                        </select>
                                    </td>
                                    <td>
                                        {/* <button onClick={() => handleMakeSurveyor(singleUser)} className='btn btn-warning text-white tooltip' data-tip="Click to make Surveyor">
                                            <FaUsers className="text-xl" ></FaUsers>
                                        </button> */}
                                        <button
                                            onClick={() => handleDelete(singleUser)}
                                            disabled={singleUser.role === "admin"}
                                            className='btn btn-error text-white'
                                        >
                                            <MdDelete ></MdDelete>
                                        </button>
                                    </td>
                                </tr>)
                            }
                            {/* row 1 */}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;