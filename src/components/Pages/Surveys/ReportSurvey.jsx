// import React from 'react';
// import useAuth from '../../../../hooks/useAuth';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useForm } from 'react-hook-form';
// import './ReportSurvey.css';

// const ReportSurvey = ({ surveyId, surveyName, deadline }) => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();


//     const submitReport = async (data) => {
//         console.log(data, surveyId);

//         if (!user) {
//             Swal.fire({
//                 position: "top-end",
//                 icon: "warning",
//                 title: "Please login to report a survey!",
//                 showConfirmButton: false,
//                 timer: 1500,

//             });
//             return;
//         }

//         const reportData = {
//             userEmail: user?.email,
//             userName: user?.displayName,
//             surveyId: surveyId,
//             surveyName: surveyName,
//             deadline: deadline,
//             reportMessage: data.reportMessage,
//             reportedOn: new Date().toLocaleString(),
//         }
//         console.log(reportData)
//         // const res = await axiosSecure.post('/reports', reportData);
//         // console.log(res.data);
//         // if (res.data.insertedId) {
//         //     reset();
//         //     successToast("Report submitted successfully!");
//         // }
//     }
//     return (
//         <div>
//             <form onSubmit={handleSubmit(submitReport)}>
//                 <label className="form-control">
//                     <div className="label">
//                         <span className="label-text">Add a Report:</span>
//                     </div>
//                     <textarea {...register('reportMessage', { required: true })} className="textarea textarea-bordered h-24" placeholder="Please write something"></textarea>
//                     {/* errors will return when field validation fails  */}
//                     {errors.reportMessage && <span className='text-red-400 my-4'>Please write something</span>}
//                 </label>
//                 <div className='flex justify-end'>
//                     <input className='btn btn-warning mt-4' type="submit" value="Submit Report" />
//                 </div>

//             </form>
//         </div>
//     );
// };

// export default ReportSurvey;


import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import './ReportSurvey.css';

const ReportSurvey = ({ surveyId, surveyName, deadline }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const submitReport = async (data) => {
        console.log(data, surveyId);

        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please login to report a survey!",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    container: 'swal2-container'
                }
            });
            return;
        }

        const reportData = {
            userEmail: user?.email,
            userName: user?.displayName,
            surveyId: surveyId,
            surveyName: surveyName,
            deadline: deadline,
            reportMessage: data.reportMessage,
            reportedOn: new Date().toLocaleString(),
        };
        console.log(reportData);


    };

    return (
        <div>
            <form onSubmit={handleSubmit(submitReport)}>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Add a Report:</span>
                    </div>
                    <textarea
                        {...register('reportMessage', { required: true })}
                        className="textarea textarea-bordered h-24"
                        placeholder="Please write something"
                    ></textarea>
                    {errors.reportMessage && <span className='text-red-400 my-4'>Please write something</span>}
                </label>
                <div className='flex justify-end'>
                    <input className='btn btn-warning mt-4' type="submit" value="Submit Report" />
                </div>
            </form>
        </div>
    );
};

export default ReportSurvey;
