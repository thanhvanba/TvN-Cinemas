import React, { useEffect, useState } from 'react'
import UserService from '../../../service/UserService';
import useLoadingState from '../../../hook/UseLoadingState';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Space, TimePicker, DatePicker } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import FormatDataTime from '../../../utils/FormatDataTime';
import { LoginContext } from '../../../context/LoginContext';
import { useContext } from 'react';
import AdminService from '../../../service/AdminService';
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading';
import dayjs from 'dayjs';
import { format, parse } from 'date-fns';

const ProfileDetail = () => {
    const { updateProfileApi, getUserInfoApi } = UserService();
    const { getOneUserApi, updateUserApi } = AdminService()

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { userId } = useParams()
    const { user } = useContext(LoginContext)

    const { loading, setLoading } = useLoadingState(false);
    const [imageURL, setImageURL] = useState()
    const [dob, setDob] = useState(null);
    const [account, setAccount] = useState({})
    const [userInfo, setUserInfo] = useState({
        userId: "",
        address: {
            street: "",
            district: "",
            province: "",
            country: ""
        },
        role: {
            roleId: "",
            roleName: "",
            active: true
        },
        userName: "",
        password: "",
        email: "",
        fullName: "",
        dob: "",
        phone: "",
        createdAt: null,
        updatedAt: "",
        lastLoginAt: "",
        cinema: {
            cinemaId: "",
            location: "",
            cinemaName: "",
            desc: "",
            status: true,
            urlLocation: null
        },
        active: true,
        delete: false,
        avatar: ""
    });

    const handleGetItems = async () => {
        setLoading('hisBooking', true);
        let resInfo = /^\/admin\/update-item\/user/.test(pathname) ? await getOneUserApi(userId) : await getUserInfoApi()
        if (resInfo && resInfo.data && resInfo.data.result) {
            setUserInfo(resInfo.data.result)
            // navigate(-1)
        }
        setLoading('hisBooking', false);
    }

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        setLoading('account', true);
        const data = account
        userId ? await updateUserApi(userId, data) : await updateProfileApi(data);
        setLoading('account', false);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        readAndDisplayFile(selectedFile);
    };

    const readAndDisplayFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
            setAccount((prevAccount) => ({
                ...prevAccount,
                image: file,
            }));
        };
        reader.readAsDataURL(file);
    };
    const handleSelectDate = (date, dateString) => {
        setAccount({
            ...account, dob: format(parse(dateString, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
        })
    };
    useEffect(() => {
        handleGetItems()
    }, [userId]);

    useEffect(() => {
        if (userInfo && (user.role === "MANAGER" ? userInfo.cinema : true)) {
            setAccount({
                ...account,
                street: (userInfo && userInfo.address && userInfo.address.street) ? userInfo.address.street : '',
                district: (userInfo && userInfo.address && userInfo.address.district) ? userInfo.address.district : '',
                province: (userInfo && userInfo.address && userInfo.address.province) ? userInfo.address.province : '',
                country: (userInfo && userInfo.address && userInfo.address.country) ? userInfo.address.country : '',
            });
        }
    }, [userInfo]);
    return (
        <div className='relative'>
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                {loading['hisBooking'] && <Loading />}
            </div>
            {!loading['hisBooking'] &&
                <>
                    {!userId && <h2 className="text-2xl text-emerald-800 font-bold uppercase text-center mb-6">Thông tin cá nhân</h2>}
                    <form id='formUpdateProfile' action="" onSubmit={handleUpdateUserInfo}>
                        <div className="rounded-md p-8 shadow-lg bg-slate-100">
                            {!userId && <div className='pb-8 mb-2 border-b border-b-slate-400 flex justify-center items-center'>
                                <div>
                                    <div className="flex justify-center my-4">
                                        <img src={imageURL ? imageURL : userInfo.avatar} alt="Ảnh đại diện" className="md:w-32 md:h-32 lg:h-40 lg:w-40 rounded-full border-2 text-center" />
                                    </div>

                                    <div className='px-4'>
                                        <input
                                            onChange={handleFileChange}
                                            type="file"
                                            className="hidden"
                                            id="form_img-upload"
                                        />
                                        <label
                                            htmlFor="form_img-upload"
                                            className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                        >
                                            Chọn một tập tin
                                        </label>
                                    </div>
                                </div>


                            </div>}
                            <div className="my-2">
                                <label
                                    htmlFor=""
                                    className="w-24 font-bold leading-9 text-gray-900"
                                >
                                    Họ tên
                                </label>
                                <input
                                    defaultValue={userInfo.fullName}
                                    onChange={e => setAccount({ ...account, fullName: e.target.value })}
                                    type="text"
                                    className="block w-full px-4 py-1 text-[10px] sm:text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                    // defaultValue={account.fullName}
                                    placeholder='Họ và tên'
                                />
                            </div>
                            <div className='flex justify-between items-center text-[10px] sm:text-lg'>
                                <div className="relative my-2">
                                    <label
                                        htmlFor=""
                                        className="block w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Ngày sinh
                                    </label>

                                    <DatePicker
                                        // selected={dob}
                                        onChange={handleSelectDate}
                                        defaultValue={userInfo.dob && dayjs(userInfo.dob, "YYYY-MM-DD")}
                                        // placeholderText='Ngày sinh'
                                        placeholder='Ngày sinh'
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        format='DD/MM/YYYY'
                                    />
                                </div>
                                <div className="my-2">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        onChange={e => setAccount({ ...account, phone: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        defaultValue={userInfo.phone}
                                        placeholder='Số điện thoại'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between w-full text-[10px] sm:text-lg'>
                                <div className="my-2 w-3/5 mr-4">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={e => setAccount({ ...account, email: e.target.value })}
                                        type="email"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        defaultValue={userInfo.email}
                                        placeholder={"Email"}
                                    />
                                </div>
                                {(user.role === "MANAGER" || user.role === "STAFF") && <div className="my-2 w-2/5">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Rạp
                                    </label>
                                    <input
                                        defaultValue={userInfo.cinema.cinemaName}
                                        onChange={e => setAccount({ ...account, cinema: { ...account.cinema, cinemaName: e.target.value } })}
                                        type="email"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2"
                                        placeholder={"Tên rạp"}
                                        readOnly
                                    />
                                </div>}
                            </div>
                            <div className="my-2 text-[10px] sm:text-lg">
                                <label
                                    htmlFor=""
                                    className="w-24 font-bold leading-9 text-gray-900"
                                >
                                    Địa chỉ
                                </label>
                                <div className='flex justify-between w-full'>
                                    <input
                                        defaultValue={userInfo.address && userInfo.address.street}
                                        onChange={e => setAccount({ ...account, street: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                        placeholder={"Wards (Xã, Phường)"}
                                    />
                                    <input
                                        defaultValue={userInfo.address && userInfo.address.district}
                                        onChange={e => setAccount({ ...account, district: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder={"District (Quận, Huyện)"}
                                    />
                                </div>
                                <div className='flex justify-between w-full'>
                                    <input
                                        defaultValue={userInfo.address && userInfo.address.province}
                                        onChange={e => setAccount({ ...account, province: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                        placeholder={"Province (Thành phố, Tỉnh)"}
                                    />
                                    <input
                                        defaultValue={userInfo.address && userInfo.address.country}
                                        onChange={e => setAccount({ ...account, country: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder={"Country (Quốc gia)"}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between w-full text-[10px] sm:text-lg'>
                                <div className="my-2 w-2/3 pr-4">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        User Name
                                    </label>
                                    <input
                                        onChange={e => setAccount({ ...account, userName: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        defaultValue={userInfo.userName}
                                        placeholder='Tên đăng nhập'
                                    />
                                </div>
                                <div className="my-2 w-1/3">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Chức vụ
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2"
                                        placeholder={userInfo.role && userInfo.role.roleName}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='submit'
                            disabled={loading['account']}
                        >
                            {loading['account'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;Lưu
                        </button>
                    </form>
                </>
            }
        </div>
    )
}

export default ProfileDetail
