import React, { useState } from 'react';
import './login.css';
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from 'axios';
import { SuccessNotification, ErrorNotification } from './notification';


const Login = ({ isOpen, onClose, LoggedIn }) => {
    const [OTP, setOTP] = useState("");
    const [onSignin, setOnSignin] = useState(true);
    const [signinEmail, setsigninEmail] = useState("");
    const [signinPassword, setsigninPassword] = useState("");
    const [signupEmail, setsignupEmail] = useState("");
    const [signupPassword, setsignupPassword] = useState("");


    const signingIN = async () => {
        console.log(signinEmail, signinPassword);

        try {
            const response = await axios.post('http://10.1.162.128:1234/signin',
                {
                    email: signinEmail,
                    password: signinPassword
                },
            );
            console.log(response.data);
            localStorage.setItem('token', response.data);
            localStorage.setItem('email', signinEmail);
            setsigninEmail("");
            setsigninPassword("");
            SuccessNotification("Logged In Successfully !!");
            onClose();
            LoggedIn();
        } catch (error) {
            ErrorNotification(error.response.data['detail']);
            // console.log(error.response.data['detail']);
        }
    }
    const signingUP = async () => {
        console.log(signupEmail, signupPassword);
        try {
            const response = await axios.post('http://10.1.162.128:1234/signup',
                {
                    email: signupEmail,
                    password: signupPassword
                },
            );
            SuccessNotification(response.data['message']);
            sendOTP();
            console.log(response.data);
            localStorage.setItem('token', response.data);
        } catch (error) {
            console.log(error.details);
            ErrorNotification(error.response.data['detail']);
        }
        // onClose();
    }

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
        const signupContainer = document.querySelector('.signup-container');
        const otpContainer = document.querySelector('.otp-container');
        if (signupContainer && otpContainer) {
            signupContainer.classList.add('hidden');
            otpContainer.classList.remove('hidden');
        }
    }
    const verifyOTP = async () => {
        try {
            const response = await axios.post('http://10.1.162.128:1234/verify',
                {
                    email: signupEmail,
                    otp: OTP
                },
            );
            setOTP();
            console.log(response.data);
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('email', signupEmail);
            setsignupEmail("");
            setsignupPassword("");
            SuccessNotification(response.data['message']);
            onClose();
            LoggedIn();
        } catch (error) {
            console.log(error.response.data['detail']);
            ErrorNotification(error.response.data['detail']);
        }


    }

    return (
        <>
            {isOpen && (
                <div className='login-container' id='login-container'>
                    <div className="container2" >
                        {!onSignin &&
                            <div className="form-container sign-in-container">
                                <div className='form'>
                                    <div className='signup-container '>
                                        <h1 className='font-bold'>Create Account</h1>
                                        <input className='input' id="email" type="email" placeholder="Email" value={signupEmail} onChange={(e) => setsignupEmail(e.target.value)} />
                                        <input className='input' id="password" type="password" placeholder="Password" value={signupPassword} onChange={(e) => setsignupPassword(e.target.value)} />
                                        <p className='text-base text-gray-700 my-2'>OTP will be sent ton your Email id.</p>
                                        <button onClick={signingUP} className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign Up</button>
                                    </div>
                                    <button onClick={() => setOnSignin(!onSignin)} className="rounded-full hover:bg-[#fc445c]  font-bold text-xs px-8 py-2 my-1 hover:text-white tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign In</button>
                                    <div className='otp-container hidden'>
                                        <h1 className='font-bold'>Enter OTP received on your Email :</h1>
                                        <OTPInput className='otp-input' value={OTP} onChange={setOTP} OTPLength={4} otpType="number" disabled={false} secure />
                                        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
                                        <button className="rounded-full my-4 border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Verify</button>
                                    </div>
                                </div>
                            </div>}
                        {onSignin &&
                            <div className="form-container sign-in-container">
                                <div className='form'>
                                    <h1 className='font-bold'>Sign in</h1>
                                    <input className='input' type="email" placeholder="Email" value={signinEmail} onChange={(e) => setsigninEmail(e.target.value)} />
                                    <input className='input' type="password" placeholder="Password" value={signinPassword} onChange={(e) => setsigninPassword(e.target.value)} />
                                    <button onClick={signingIN} className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white my-2 font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign In</button>
                                    <button onClick={() => setOnSignin(!onSignin)} className="rounded-full hover:bg-[#fc445c]  font-bold text-xs px-8 py-2 my-1 hover:text-white tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign up</button>
                                </div>
                            </div>}
                    </div>

                    <div className="container1" id="container">
                        <div className="form-container sign-up-container">
                            <div className='close-container'>
                                <div className='form' action="#">
                                    <div className='signup-container '>
                                        <h1 className='font-bold'>Create Account</h1>
                                        <input className='input' id="email" type="email" placeholder="Email" value={signupEmail} onChange={(e) => setsignupEmail(e.target.value)} />
                                        <input className='input' id="password" type="password" placeholder="Password" value={signupPassword} onChange={(e) => setsignupPassword(e.target.value)} />
                                        <button onClick={signingUP} className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign Up</button>
                                    </div>
                                    <div className='otp-container hidden'>
                                        <h1 className='font-bold'>Enter OTP received on your Email :</h1>
                                        <OTPInput className='otp-input' value={OTP} onChange={setOTP} OTPLength={4} otpType="number" disabled={false} secure />
                                        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
                                        <button onClick={verifyOTP} className="rounded-full my-4 border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Verify</button>
                                    </div>
                                </div>
                                <button onClick={onClose} className='close'></button>
                            </div>
                        </div>
                        <div className="form-container sign-in-container">
                            <div className='form'>
                                <h1 className='font-bold'>Sign in</h1>
                                <input className='input' id="Email" type="email" placeholder="Email" value={signinEmail} onChange={(e) => setsigninEmail(e.target.value)} />
                                <input className='input' id="Password" type="password" placeholder="Password" value={signinPassword} onChange={(e) => setsigninPassword(e.target.value)} />
                                <a className='text-base text-gray-700 no-underline my-6'>Forgot your password?</a>
                                <button onClick={signingIN} className="rounded-full border border-solid border-red-600 bg-[#fc445c] text-white font-bold text-xs uppercase px-8 py-2 tracking-wide focus:outline-none transition-transform duration-75 transform hover:scale-95 active:scale-95">Sign In</button>
                            </div>
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
