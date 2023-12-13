import { Link } from 'react-router-dom'
import bg from "../../images/bg-cinema-10.png"
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import logo from "../../images/logo.png";
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLoadingState from '../../hook/UseLoadingState'

import UserService from '../../service/UserService';

import { useContext } from 'react'
import { RegisterContext } from '../../context/RegisterContext'

const Info = () => {
    const [image, setImage] = useState()
    const [userInfo, setUserInfo] = useState([]);
    const { getUserInfoApi, updateUserApi, changePasswordApi } = UserService();

    const {loading, setLoading} = useLoadingState(false);

    const [account, setAccount] = useState({
        fullName: "",
        gender: "",
        birth: "",
        address: "",
        email: "",
        phone: "",
        userName: "",
        role: ""
    })

    const [passwordUpdateInfo, setPasswordUpdateInfo] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState('1');

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleGetUserInfo = async () => {
        let resInfo = await getUserInfoApi()
        if (resInfo && resInfo.data && resInfo.data.result) {
            setUserInfo(resInfo.data.result)
        }
    }

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        setLoading('account', true);
        console.log("vào handle")
        const data = account
        const userId = userInfo.userId
        await updateUserApi(data, userId);
        setLoading('account', false);
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading('change', true);
        const data = passwordUpdateInfo
        await changePasswordApi(data);
        setLoading('change', false);
    }

    const handlePreviewImage = (e) => {
        const img = e.target.files[0]
        img.preview = URL.createObjectURL(img)
        setImage(img)
        setMovie({ ...movie, poster: img.preview })
    }

    useEffect(() => {
        handleGetUserInfo()
    }, []);
    return (
        <div >
            <div className='mx-auto max-w-6xl pt-32 pb-8'>
                <div style={{ display: currentTab === '1' ? 'block' : 'none' }}>
                    <div className='grid grid-cols-2 gap-8'>
                        {/* Thông tin tài khoản */}
                        <div>
                            <h2 className="text-2xl text-emerald-800 font-bold uppercase text-center mb-6">Profile details</h2>
                            <form id='formAddCinema' action="" onSubmit={handleUpdateUserInfo}>
                                <div className="rounded-md p-8 shadow-lg bg-slate-100">
                                    <div className='pb-8 mb-8 border-b border-b-slate-400 flex justify-center items-center'>
                                        <div className='w-2/5'>
                                            <div className='flex justify-center h-44 text-center rounded-sm'>
                                                <input
                                                    onChange={handlePreviewImage}
                                                    type="file"
                                                    className="hidden" // Ẩn input mặc định
                                                    id="form_img-upload"
                                                />
                                                <UserCircleIcon className="h-40 w-40 text-emerald-600 bg-slate-200 rounded-full" />
                                                {image && (
                                                    <img className='absolute top-0 left-0 h-full' src={image.preview} alt="" />
                                                )}
                                            </div>
                                            <label
                                                htmlFor="form_img-upload" // Liên kết label với input
                                                className="bg-slate-200 px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                            >
                                                Choose a File
                                            </label>
                                        </div>

                                    </div>
                                    <div className="my-4">
                                        <label
                                            htmlFor=""
                                            className="w-24 font-bold leading-9 text-gray-900"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            //value={userInfo.fullName}
                                            onChange={e => setAccount({ ...account, fullName: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder={userInfo.fullName}
                                        />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className="my-4">
                                            <label
                                                htmlFor="gender"
                                                className="w-24 font-bold leading-9 text-gray-900"
                                            >
                                                Gender
                                            </label>

                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className='h-4 w-4'
                                                    id="male"
                                                    name="gender"
                                                    value="male"
                                                    checked={account.gender === 'male'}
                                                    onChange={e => setAccount({ ...account, gender: e.target.value })}
                                                    defaultChecked={account.gender === 'male'}
                                                />
                                                <label htmlFor="male" className="ml-2 text-gray-900">Male</label>

                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="female"
                                                    checked={account.gender === 'female'}
                                                    onChange={e => setAccount({ ...account, gender: e.target.value })}
                                                    defaultChecked={account.gender === 'female'}
                                                    className="ml-4 h-4 w-4"
                                                />
                                                <label htmlFor="female" className="ml-2 text-gray-900">Female</label>

                                                <input
                                                    type="radio"
                                                    id="other"
                                                    name="gender"
                                                    value="other"
                                                    checked={account.gender === 'other'}
                                                    onChange={e => setAccount({ ...account, gender: e.target.value })}
                                                    placeholder={userInfo.fullName}
                                                    defaultChecked={account.gender === 'other'}
                                                    className="ml-4 h-4 w-4"
                                                />
                                                <label htmlFor="other" className="ml-2 text-gray-900">Other</label>
                                            </div>
                                        </div>
                                        <div className="relative my-4">
                                            <label
                                                htmlFor=""
                                                className="block w-24 font-bold leading-9 text-gray-900"
                                            >
                                                Birth
                                            </label>
                                            <DatePicker
                                                selected={account.birth}
                                                onChange={e => setAccount({ ...account, birth: e })}
                                                className="block px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="my-4">
                                        <label
                                            htmlFor=""
                                            className="w-24 font-bold leading-9 text-gray-900"
                                        >
                                            Address
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setAccount({ ...account, address: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder={userInfo.address}
                                        />
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <div className="my-4 w-2/3 pr-4">
                                            <label
                                                htmlFor=""
                                                className="w-24 font-bold leading-9 text-gray-900"
                                            >
                                                Email
                                            </label>
                                            <input
                                                // value={account.fullName}
                                                onChange={e => setAccount({ ...account, email: e.target.value })}
                                                type="email"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.email}
                                            />
                                        </div>
                                        <div className="my-4 w-1/3">
                                            <label
                                                htmlFor=""
                                                className="w-24 font-bold leading-9 text-gray-900"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                // value={account.fullName}
                                                onChange={e => setAccount({ ...account, phone: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <div className="my-4 w-2/3 pr-4">
                                            <label
                                                htmlFor=""
                                                className="w-24 font-bold leading-9 text-gray-900"
                                            >
                                                User Name
                                            </label>
                                            <input
                                                // value={account.fullName}
                                                onChange={e => setAccount({ ...account, userName: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.userName}
                                            />
                                        </div>
                                        <div className="my-4 w-1/3">
                                            <label
                                                htmlFor=""
                                                className="w-24 font-bold leading-9 text-gray-900"
                                            >
                                                Role
                                            </label>
                                            <select
                                                id="gender" // Thêm id cho input và tương ứng với id của label
                                                onChange={e => setAccount({ ...account, role: e.target.value })}
                                                className="block w-full px-4 py-1 text-lg text-gray-400 focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            >
                                                <option value="admin">ADMIN</option>
                                                <option value="viewer">VIEWER</option>
                                                <option value="manager">MANAGER</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='submit'
                                    disabled={loading['account']}
                                >
                                    {loading['account'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;Save
                                </button>
                            </form>
                        </div>
                        {/* passwordUpdateInfo */}
                        <div>
                            <h2 className="text-2xl text-emerald-800  font-bold text-center uppercase mb-6">Change password</h2>
                            <form onSubmit={handleChangePassword} className="rounded-md p-8 shadow-lg bg-slate-100">
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="w-24 font-bold leading-9 text-gray-900"
                                        >
                                            Old Password
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setPasswordUpdateInfo({ ...passwordUpdateInfo, currentPassword: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div >
                                        <label
                                            htmlFor=""
                                            className="w-24 font-bold leading-9 text-gray-900"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setPasswordUpdateInfo({ ...passwordUpdateInfo, newPassword: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="w-24 font-bold leading-9 text-gray-900"
                                        >
                                            Confirm New Password
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setPasswordUpdateInfo({ ...passwordUpdateInfo, confirmNewPassword: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <button
                                        className="col-span-2 w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                        type='submit'
                                        disabled={loading['change']}
                                    >
                                        {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                        &nbsp;Change
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;