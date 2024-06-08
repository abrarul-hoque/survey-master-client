import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

const UpdateSurvey = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const survey = useLoaderData();
    console.log(survey);
    const { _id, title, description, yesOption, noOption, category, deadline, surveyStatus } = survey;

    const [selectedDeadline, setSelectedDeadline] = useState(new Date(deadline));

    useEffect(() => {
        setValue('title', title);
        setValue('description', description);
        setValue('yesOption', yesOption);
        setValue('noOption', noOption);
        setValue('category', category);
        setValue('surveyStatus', surveyStatus);
        setValue('deadline', new Date(deadline));
    }, [setValue, title, description, yesOption, noOption, category, deadline]);

    const handleDateChange = (date) => {
        setSelectedDeadline(date);
        setValue('deadline', date);
    };

    const handleUpdateSurvey = async (data) => {
        console.log(data)
        const updatedSurveyData = {
            title: data.title,
            description: data.description,
            category: data.category,
            deadline: data.deadline,
            surveyStatus: data.surveyStatus,
            updatedOn: new Date().toLocaleString()
        }
        console.log(updatedSurveyData)
        const surveyUpdateRes = await axiosSecure.patch(`/surveyor/update/${_id}`, updatedSurveyData);
        console.log(surveyUpdateRes.data);
        if (surveyUpdateRes.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} has been Updated!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    return (
        <div>

            <h1 className='text-3xl font-bold text-center'>Update a survey</h1>
            <div>
                <form onSubmit={handleSubmit(handleUpdateSurvey)}>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Survey Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Survey Title"
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
                            placeholder="Survey Description"
                            {...register("description", { required: true })}
                            className="input input-bordered w-full " />
                    </label>
                    <p className='text-red-400 my-2'>{errors.description && <span className=''>Description is required</span>}</p>

                    <div className='flex justify-between gap-2'>
                        <label className="form-control w-full lg:w-1/3">
                            <div className="label">
                                <span className="label-text">Survey Options (Yes)</span>
                            </div>
                            <input
                                type="number"
                                {...register("yesOption", { required: true })}
                                className="input input-bordered w-full" disabled />
                            <p className='text-red-400 my-2'>{errors.yesOption && <span className=''>YesOption Count is required</span>}</p>

                        </label>

                        <label className="form-control w-full lg:w-1/3">
                            <div className="label">
                                <span className="label-text">Survey Options (No)</span>
                            </div>
                            <input
                                type="number"
                                {...register("noOption", { required: true })}
                                className="input input-bordered w-full" disabled />
                            <p className='text-red-400 my-2'>{errors.noOption && <span className=''>NoOption Count  is required</span>}</p>
                        </label>
                        <label className="form-control w-full lg:w-1/3">
                            <div className="label">
                                <span className="label-text">Survey Status</span>
                            </div>
                            <select {...register("surveyStatus", { required: true })} defaultValue={"none"} className="select select-bordered">
                                <option disabled value="none">Select Status</option>
                                <option value="publish">Publish</option>
                                <option value="unpublish">Unpublish</option>
                            </select>
                            <p className='text-red-400 my-2'>{errors.category && <span className=''>SurveyStatus is required</span>}</p>

                        </label>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <label className="form-control w-full lg:w-1/2 ">
                            <div className="label">
                                <span className="label-text">Survey Category</span>
                            </div>
                            <select {...register("category", { required: true })} defaultValue={"none"} className="select select-bordered">
                                <option disabled value="none">Select a Category</option>
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

                            <ReactDatePicker
                                {...register("deadline", { required: true })}
                                // value={deadline}
                                className='input input-bordered w-full'
                                selected={selectedDeadline}
                                onChange={handleDateChange}
                            />
                        </label>
                    </div>
                    <input className='btn btn-primary' type="submit" value="Update Survey" />
                </form>
            </div>
        </div>
    );
};

export default UpdateSurvey;