import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa6';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                console.log(res);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate("/");
                    })
            })
    }

    return (
        <div>
            <div className='flex justify-center border p-2 m-2 rounded-xl bg-orange-400'>
                <button onClick={handleGoogleLogin} className='w-full flex justify-center'>
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;