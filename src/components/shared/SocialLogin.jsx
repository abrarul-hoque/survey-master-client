import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/google.json';
import Lottie from 'react-lottie';

const SocialLogin = () => {
    const { googleSignIn, setUser, user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {

        try {
            const res = await googleSignIn();
            console.log(res);
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            const userRes = await axiosPublic.post('/users', userInfo);
            setUser(userRes.data.user);
            console.log(userRes.data.user);
            navigate("/");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error during Google login:', error);
            // Handle error here
        }

    }


    const avater = {
        loop: true,
        autoplay: true,
        animationData: googleIcon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <div className=' border-2 p-2 px-10 m-2 rounded-xl'>
                <button onClick={handleGoogleLogin} className='p-2' >
                    {/* <FaGoogle></FaGoogle> */}
                    <Lottie
                        options={avater}
                        height={30}
                        width={60}
                    />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;