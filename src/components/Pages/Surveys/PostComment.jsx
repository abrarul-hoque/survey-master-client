import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import useProUser from '../../../hooks/useProUser';
import Swal from 'sweetalert2';

const PostComment = ({ surveyId, surveyName, deadline }) => {
    const { user } = useAuth();
    const [isProUser] = useProUser();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const successToast = (successMessage) => toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    const errorToast = (errorMessage) => toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    const submitComment = async (data) => {
        console.log(data, surveyId);
        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please login to comment on a survey!",
                showConfirmButton: false,
                timer: 1500
            });

            return;
        }
        if (!isProUser) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Only pro-user can comment on a survey!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const commentData = {
            userEmail: user?.email,
            userName: user?.displayName,
            surveyId: surveyId,
            surveyName: surveyName,
            deadline: deadline,
            comment: data.comment,
            commentedOn: new Date().toLocaleString(),
        }
        const res = await axiosSecure.post('/comments', commentData);
        console.log(res.data);
        if (res.data.insertedId) {
            reset();
            successToast("Comment added Successfully!");
        }
    }


    return (
        <div>
            <ToastContainer />

            <form onSubmit={handleSubmit(submitComment)}>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Add a comment:</span>
                    </div>
                    <textarea {...register('comment', { required: true })} className="textarea textarea-bordered h-24" placeholder="Add your Comment"></textarea>
                    {/* errors will return when field validation fails  */}
                    {errors.comment && <span className='text-red-400 my-4'>Please Write a comment..</span>}
                </label>
                <div className='flex justify-end'>
                    <input className='btn btn-warning my-5' type="submit" value="Post comment" />

                </div>
            </form>
        </div>
    );
};

export default PostComment;