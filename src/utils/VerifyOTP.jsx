import React from 'react'
import logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import useLoadingState from '../hook/UseLoadingState'
import { useLocation } from 'react-router-dom';

import { useState, useEffect, useRef, useContext } from 'react'

import UserService from '../service/UserService';
function VerifyOTP() {
    const { verifyApi } = UserService()


    const location = useLocation();
    const { email } = location.state || {};

    const { loading, setLoading } = useLoadingState(false);
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (index < 5 && value !== "") {
            // Tự động di chuyển tới ô nhập tiếp theo nếu có giá trị
            inputRefs[index + 1].current.focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
            // Nếu người dùng ấn nút xóa, xóa giá trị của ô này
            const newOTP = [...otp];
            newOTP[index] = "";
            setOTP(newOTP);

            if (index > 0) {
                // Nếu không phải ô đầu tiên, di chuyển tới ô trước đó
                inputRefs[index - 1].current.focus();
                const prevInput = inputRefs[index - 1].current;
                prevInput.selectionStart = prevInput.selectionEnd = prevInput.value.length;
            }
        }
        if (e.key === "ArrowLeft" && index > 0) {
            // Focus vào ô trước đó
            inputRefs[index - 1].current.focus();
            const prevInput = inputRefs[index - 1].current;
            prevInput.selectionStart = prevInput.value.length;
        } else if (e.key === "ArrowRight" && index < 5) {
            e.preventDefault();
            // Focus vào ô tiếp theo
            inputRefs[index + 1].current.focus();
            const nextInput = inputRefs[index + 1].current;
            nextInput.selectionStart = nextInput.value.length;
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        setOTP(["", "", "", "", "", ""])
        console.log(loading)
        setLoading('verify', true)
        console.log(loading)
        const otpValue = otp.join("");
        console.log("🚀 ~ file: verifyOTP.jsx:67 ~ handleVerify ~ otpValue:", otpValue)
        await verifyApi(otpValue)
        setLoading('verify', false)
    }
    return (
        <div className='pt-32 pb-10'>
            <div className='max-w-4xl mx-auto border-4 border-cyan-600 rounded-xl p-4 bg-slate-200'>
                <div className='text-center'>
                    <div className='flex justify-center'>
                        <img className="h-36 w-auto" src={logo} alt="" />
                    </div>
                    <p className='text-3xl text-slate-600 font-bold'>T&N Cinemas</p>
                    <p className='text-xl text-cyan-500 font-bold pb-4 mb-4'>
                        Trải nghiệm điện ảnh tuyệt vời cùng T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
                    </p>
                </div>
                <div className="text-center max-w-md mx-auto border-2 border-slate-600 rounded-md bg-slate-200">
                    <div>
                        <h2 className='text-2xl font-bold p-2'>Xác thực mã OTP</h2>
                        <p className='font-medium pb-4'>
                            Mã xác thực của bạn đã được gửi qua email
                            <br />
                            <span>{email || "***@gmail.com"}</span>
                        </p>
                        <p className='p-4'>Nhập mã OTP</p>
                    </div>
                    <form onSubmit={handleVerify} action="">
                        <div className="">
                            {otp.map((value, index) => (
                                <input
                                    className='h-12 w-12 m-2 text-center border border-slate-400 rounded-lg'
                                    key={index}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    maxLength="1"
                                    ref={inputRefs[index]}
                                />
                            ))}
                            {/* <div className='flex justify-between px-8'>
                            <p>Bạn chưa nhận được mã ?</p>
                            <a
                                onClick={handleSendOtp}
                                className='underline text-cyan-500 font-semibold'
                                disabled={loading['sendotp']}
                            >
                                {loading['sendotp'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                &nbsp;Gửi lại mã OTP
                            </a>
                        </div> */}

                        </div>
                        <button
                            className="w-11/12 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='submit'
                            disabled={loading['verify']}
                        >
                            {loading['verify'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;Xác nhận
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default VerifyOTP
