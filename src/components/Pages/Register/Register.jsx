import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import loginImg from '../../../assets/log-in-girl.svg';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleRegister = data => {
        console.log(data)
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Register</title>
            </Helmet>

            <div className='flex flex-col md:flex-row lg:flex-row items-center'>
                <div className='w-4/5 md:w-1/2 lg:w-1/2'>
                    <img className='w-full' src={loginImg} alt="" />
                </div>
                <div className='w-4/5 md:w-1/2 lg:w-1/2 p-5 py-10'>
                    <h1 className='text-2xl font-bold text-center mb-6'>Please Login</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <label className="form-control w-full lg:w-4/5 mb-2">
                            <div className="label">
                                <span className="label-text">Your Email</span>
                            </div>
                            <input
                                type="text"
                                {...register('email', { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full" />
                            {errors.email && <span className='text-red-400 mb-2'>Email is required</span>}
                        </label>
                        <label className="form-control w-full lg:w-4/5 ">
                            <div className="label">
                                <span className="label-text">Your Password</span>
                            </div>
                            <input
                                type="text"
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    maxLength: 20,
                                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full" />
                            {errors.password?.type === "required" && <span className='text-red-400'>Password is required</span>}
                            {errors.password?.type === "minLength" && <span className='text-red-400'>Password must be 8 characters</span>}
                            {errors.password?.type === "maxLength" && <span className='text-red-400'>Password must be less then 20 characters</span>}
                            {errors.password?.type === "pattern" && <span className='text-red-400'>Password must contain One number, One upper leter, One lower letter and One special character</span>}

                        </label>

                        <input className='btn btn-primary my-5' type="submit" value="Login" />
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Register;