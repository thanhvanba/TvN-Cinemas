import { Link } from 'react-router-dom'
import './index.css'
import bg from "../../images/bg-cinema-10.png"
import ApiService from '../../ApiService'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";

const Signup = () => {
    const { registerApi, loginApi, verifyApi, sendOtpApi } = ApiService();
    const [account, setAccount] = useState({
        fullName: "",
        email: "",
        phone: "",
        userName: "",
        password: "",
        confirmPassword: ""
    })
    const [credentialId, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState('1');

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleCheckPathname = (pathname) => {
        switch (pathname) {
            case "/thanhvien":
                setCurrentTab("1")
                break;
            case "/quydinh":
                setCurrentTab("2")
                break;
            case "/signup/verify":
                setCurrentTab("3")
                break;
            default:
                setCurrentTab("1")
        }
    }

    useEffect(() => {
        handleCheckPathname(pathname)

    }, [pathname]);

    const handleRegister = (e) => {
        e.preventDefault();
        const params = account;
        registerApi(params)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        let logobj = { credentialId, password };
        loginApi(logobj)
    }
    const handleVerify = (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        const email = account.email
        let otpObj = {email, otpValue}
        verifyApi(otpObj)
        
    }
    const handleSendOtp = (e) =>{
        e.preventDefault();
        email = account.email
        sendOtpApi(email)
    }

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
            prevInput.selectionStart= prevInput.value.length;
        } else if (e.key === "ArrowRight" && index < 5) {
            e.preventDefault();
            // Focus vào ô tiếp theo
            inputRefs[index + 1].current.focus();
            const nextInput = inputRefs[index + 1].current;
            nextInput.selectionStart  = nextInput.value.length;
        }
    }

    return (
        <div style={{ background: `url(${bg})`, "background-attachment": "fixed" }}>
            <div className='mx-auto max-w-6xl pt-32 pb-8'>
                <div
                    className="sub-tab"
                    style={{ display: currentTab != '3' ? 'block' : 'none' }}
                >
                    <ul className="relative inline-block">
                        <li
                            onClick={() => changeTab("/thanhvien")}
                            className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full text-slate-100"
                        >
                            <a
                                href=""
                                className={`${currentTab === '1' ? "active1" : ""} text-3xl font-bold uppercase p-2 leading-[3.5rem]`}
                            >
                                Thành viên
                            </a>

                        </li>
                        <li
                            onClick={() => changeTab("/quydinh")}
                            className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full text-slate-100"
                        >
                            <a
                                href=""
                                className={`${currentTab === '2' ? "active1" : ""} text-3xl font-bold uppercase p-2 leading-[3.5rem]`}
                            >
                                Quy định
                            </a>
                        </li>
                    </ul>
                </div>
                <div style={{ display: currentTab === '1' ? 'block' : 'none' }}>
                    <div className='grid grid-cols-2'>
                        {/* Đăng nhập */}
                        <div className='m-8'>
                            <h2 className="text-white font-bold uppercase text-center mb-6">Đăng Nhập</h2>
                            <div className=" border border-slate-400 rounded-md p-8 shadow-lg  relative">
                                <form onSubmit={handleLogin} action="">
                                    <div className="relative my-4">
                                        <input
                                            onChange={e => setUserName(e.target.value)}
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            User Name
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center text-white">
                                            <input type="checkbox" name='' id='' />
                                            <label htmlFor="Remember Me">Remember Me</label>
                                        </div>
                                        <Link to='' className="text-blue-500">Forgot Password?</Link>
                                    </div>
                                    <button
                                        className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                        type='submit'
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                        {/* Đăng ký */}
                        <div className='m-8'>
                            <h2 className="text-white font-bold text-center uppercase mb-6">Đăng ký</h2>
                            <div className="border border-slate-400 rounded-md p-8 shadow-lg  relative">
                                <form onSubmit={handleRegister} action="">
                                    <div className="relative my-4">
                                        <input
                                            value={account.fullName}
                                            onChange={e => setAccount({ ...account, fullName: e.target.value })}
                                            type="text"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Full Name
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            value={account.email}
                                            onChange={e => { setAccount({ ...account, email: e.target.value }); }}
                                            type="email"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            value={account.phone}
                                            onChange={e => setAccount({ ...account, phone: e.target.value })}
                                            type="text"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Phone
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            value={account.userName}
                                            onChange={e => setAccount({ ...account, userName: e.target.value })} type="text"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            User Name
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            value={account.password}
                                            onChange={e => setAccount({ ...account, password: e.target.value })}
                                            type="password"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            value={account.confirmPassword}
                                            onChange={e => setAccount({ ...account, confirmPassword: e.target.value })}
                                            type="password"
                                            className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                    <button
                                        className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                        type='submit'
                                    >
                                        SignUp
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: currentTab === '2' ? 'block' : 'none' }}>
                </div>
                <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
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
                                    <span>{account.email} ***@gmail.com</span>
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
                                    <div className='flex justify-between px-8'>
                                        <p>Bạn chưa nhận được mã ?</p>
                                        <a onClick={handleSendOtp} className='underline text-cyan-500 font-semibold' href="#">Gửi lại mã OTP</a>
                                    </div>

                                </div>
                                <button
                                    className="w-11/12 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='submit'
                                >
                                    Xác nhận
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;
