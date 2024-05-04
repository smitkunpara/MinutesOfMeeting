import React, { useEffect, useState } from 'react';
import './login.css';
import OTPInput, { ResendOTP } from "otp-input-react";




const Login = ({ isOpen, onClose }) => {
    const [OTP, setOTP] = useState("");
    const swictToSignUp = () => {
        const container = document.getElementById("container");
        if (container) {
            container.classList.add("right-panel-active");
        }
    }

    const swictToSignIn = () => {
        const container = document.getElementById("container");
        if (container) {
            container.classList.remove("right-panel-active");
        }
    }
    const sendOTP = () => {
        const signup = document.querySelector('.signup-container');
        const otp = document.querySelector('.otp-container');
        if (signup && otp) {
            signup.classList.add('hidden');
            otp.classList.remove('hidden');

            
        }
        
    }
    return (
        <>
            {isOpen && (
                <div className='login-container' id='login-container'>

                    <div className="container1" id="container">
                        <div className="form-container sign-up-container">
                            <div className='close-container'>
                                <form className='form' action="#">
                                    <div className='signup-container '>
                                        <h1 className='font-bold'>Create Account</h1>
                                        <input className='input' id="email" type="email" placeholder="Email" />
                                        <input className='input' id="password" type="password" placeholder="Password" />
                                        <button onClick={sendOTP} className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Send OTP</button>
                                    </div>
                                    <div className='otp-container hidden'>
                                        <h1 className='font-bold'>Enter OTP received on your Email :</h1>
                                        <OTPInput className='otp-input' value={OTP} onChange={setOTP} OTPLength={4} otpType="number" disabled={false} secure />
                                        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
                                        <button className="rounded-full my-4 border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign Up</button>
                                    </div>
                                </form>
                                <button onClick={onClose} className='close'></button>
                            </div>
                        </div>
                        <div className="form-container sign-in-container">

                            <form className='form' action="#">
                                <h1 className='font-bold'>Sign in</h1>
                                <input className='input' id="Email" type="email" placeholder="Email" />
                                <input className='input' id="Password" type="password" placeholder="Password" />
                                <a className='text-base text-gray-700 no-underline my-6'>Forgot your password?</a>
                                <button className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign In</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1 className='font-bold'>Welcome Back!</h1>
                                    <p className='text-base font-hairline leading-5 tracking-wide my-5'>To keep connected with us please login with your Email and Password</p>
                                    <button onClick={swictToSignIn} className="rounded-full border border-solid border-white bg-transparent text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95" id="signIn">Sign In</button>
                                </div>
                                <div className='close-container demo'>
                                    <div className="overlay-panel overlay-right">
                                        <h1 className='font-bold'>Hello, Friend!</h1>
                                        <p>Enter your personal details and start learning with us</p>
                                        <button onClick={swictToSignUp} className="rounded-full border border-solid border-white bg-transparent text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95" id="signUp">Sign Up</button>
                                    </div>
                                    <button onClick={onClose} className='close '></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default Login;
