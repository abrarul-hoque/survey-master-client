import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CreateSurvey = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const [deadline, setDeadline] = useState(new Date());

    const handleDateChange = (date) => {
        setDeadline(date);
        setValue('deadline', date);
    };

    const handleCreateSurvey = async (data) => {
        console.log(data)
        const surveyData = {
            title: data.title,
            description: data.description,
            yesOption: 0,
            noOption: 0,
            category: data.category,
            deadline: data.deadline,
            surveyStatus: "publish",
            createdBy: user?.email,
            createdOn: new Date().toLocaleString()
        }
        console.log(surveyData)
        const res = await axiosSecure.post('/surveys', surveyData);
        console.log(res.data);
        if (res.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} has been Added!`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    };



    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>Create a survey</h1>

            <div>
                <form onSubmit={handleSubmit(handleCreateSurvey)}>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Survey Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            {...register("title", { required: true })}
                            className="input input-bordered w-full " />
                    </label>
                    <p className='text-red-400 my-2'>{errors.title && <span className=''>Title is required</span>}</p>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Survey Description</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            {...register("description", { required: true })}
                            className="input input-bordered w-full " />
                    </label>
                    <p className='text-red-400 my-2'>{errors.description && <span className=''>Description is required</span>}</p>

                    <div className='flex justify-between gap-2'>
                        <label className="form-control w-full lg:w-1/2">
                            <div className="label">
                                <span className="label-text">Survey Options (Yes)</span>
                            </div>
                            <input
                                type="number"
                                disabled
                                defaultValue={0}
                                // {...register("yesOption", { required: true })}
                                className="input input-bordered w-full" />
                            <p className='text-red-400 my-2'>{errors.yesOption && <span className=''>YesOption Count is required</span>}</p>

                        </label>

                        <label className="form-control w-full lg:w-1/2">
                            <div className="label">
                                <span className="label-text">Survey Options (No)</span>
                            </div>
                            <input
                                type="number"
                                disabled
                                defaultValue={0}
                                // {...register("noOption", { required: true })}
                                className="input input-bordered w-full" />
                            <p className='text-red-400 my-2'>{errors.noOption && <span className=''>NoOption Count  is required</span>}</p>
                        </label>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Survey Category</span>
                            </div>
                            <select   {...register("category", { required: true })} className="select select-bordered">
                                <option disabled selected>Select a Category</option>
                                <option value="Customer Satisfaction">Customer Satisfaction</option>
                                <option value="Employee Engagement">Employee Engagement</option>
                                <option value="Market Research">Market Research</option>
                                <option value="Academic Research">Academic Research</option>
                                <option value="Social Research">Social Research</option>
                                <option value="Technology and Software">Technology and Software</option>
                                <option value="Customer Experience">Customer Experience</option>
                            </select>
                            <p className='text-red-400 my-2'>{errors.category && <span className=''>Category is required</span>}</p>

                        </label>

                        <label className="form-control w-full lg:w-1/2">
                            <div className="label">
                                <span className="label-text">Survey Deadline</span>
                            </div>

                            <DatePicker
                                {...register("deadline", { required: true })}
                                className='input input-bordered w-full'
                                selected={deadline}
                                onChange={handleDateChange}
                            />
                            <p className='text-red-400 my-2'>{errors.deadline && <span className=''>Deadline is required</span>}</p>
                        </label>
                    </div>


                    <input className='btn btn-primary' type="submit" value="Create Survey" />
                </form>
            </div>
        </div>
    );
};

export default CreateSurvey;