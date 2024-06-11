import React from 'react';
import { useForm } from 'react-hook-form';

const PostComment = ({ surveyId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitComment = data => {
        console.log(data, surveyId)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitComment)}>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Add a comment:</span>
                    </div>
                    <textarea {...register('comment', { required: true })} className="textarea textarea-bordered h-24" placeholder="Add your Comment"></textarea>
                    {/* errors will return when field validation fails  */}
                    {errors.comment && <span className='text-red-400 my-4'>This field is required</span>}
                </label>
                <div className='flex justify-end'>
                    <input className='btn btn-warning my-5' type="submit" value="Post comment" />

                </div>
            </form>
        </div>
    );
};

export default PostComment;