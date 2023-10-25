import { Link } from 'react-router-dom'
import './index.css'
import bg from "../../images/bg-cinema-10.png"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
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
            default:
                setCurrentTab("1")
        }
    }

    useEffect(() => {
        handleCheckPathname(pathname)

    }, [pathname]);
    return (
        <div style={{ background: `url(${bg})`, "background-attachment": "fixed" }}>
            <div className='mx-auto max-w-6xl pt-32'>
                <div className="sub-tab">
                    <ul className="relative inline-block">
                        <li onClick={() => changeTab("/thanhvien")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full text-slate-100">
                            <a href="" className={`${currentTab === '1' ? "active1" : ""} text-3xl font-bold uppercase p-2 leading-[3.5rem]`}>Thành viên</a>

                        </li>
                        <li onClick={() => changeTab("/quydinh")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full text-slate-100">
                            <a href="" className={`${currentTab === '2' ? "active1" : ""} text-3xl font-bold uppercase p-2 leading-[3.5rem]`}>Quy định</a>
                        </li>
                    </ul>
                </div>
                {/* <div className='flex justify-center'>
                    <h1 className='m-4 text-3xl font-bold uppercase text-white hover:text-cyan-500 active'>Thành viên</h1>
                    <h1 className='m-4 text-3xl font-bold uppercase text-white hover:text-cyan-500'>FAQ</h1>
                    <h1 className='m-4 text-3xl font-bold uppercase text-white hover:text-cyan-500'>Quy định</h1>
                </div> */}
                <div className='grid grid-cols-2'>
                    <div className='m-8'>
                        <h2 className="text-white font-bold uppercase text-center mb-6">Đăng Nhập</h2>
                        <div className=" border border-slate-400 rounded-md p-8 shadow-lg  relative">
                            <form action="">
                                <div className="relative my-4">
                                    <input type="email" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="relative my-4">
                                    <input type="password" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
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
                                <button className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='m-8'>
                        <h2 className="text-white font-bold text-center uppercase mb-6">Đăng ký</h2>
                        <div className="border border-slate-400 rounded-md p-8 shadow-lg  relative">
                            <form action="">
                                <div className="relative my-4">
                                    <input type="email" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                                        Email
                                    </label>
                                </div>
                                <div className="relative my-4">
                                    <input type="email" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                                        Full Name
                                    </label>
                                </div>
                                <div className="relative my-4">
                                    <input type="password" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                                        Password
                                    </label>
                                </div>
                                <div className="relative my-4">
                                    <input type="password" className="block w-full py-2.5 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                                    <label htmlFor="" className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                                        Confirm Password
                                    </label>
                                </div>
                                <button className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                                >
                                    SignUp
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
