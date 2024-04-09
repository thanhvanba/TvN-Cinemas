import React, { useEffect, useState } from 'react'
import UserService from '../../../service/UserService';
import useLoadingState from '../../../hook/UseLoadingState';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import FormatDataTime from '../../../utils/FormatDataTime';
import { LoginContext } from '../../../context/LoginContext';
import { useContext } from 'react';
import AdminService from '../../../service/AdminService';
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading';

const ProfileDetail = () => {
    const { updateProfileApi, getUserInfoApi } = UserService();
    const { getOneUserApi, updateUserApi } = AdminService()

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { userId } = useParams()
    const { user } = useContext(LoginContext)

    const { loading, setLoading } = useLoadingState(false);
    const [image, setImage] = useState()
    const [dob, setDob] = useState(null);
    const [account, setAccount] = useState({
        address: {
            street: "",
            district: "",
            province: "",
            country: ""
        },
        role: "",
        userName: "",
        email: "",
        fullName: "",
        dob: "",
        phone: "",
        // createdAt: null,
        // updatedAt: "",
        // lastLoginAt: "",
        // cinema: {
        //     cinemaId: "",
        //     location: "",
        //     cinemaName: "",
        //     desc: "",
        //     status: true,
        //     urlLocation: null
        // },
    })
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
        // cinema: {
        //     cinemaId: "",
        //     location: "",
        //     cinemaName: "",
        //     desc: "",
        //     status: true,
        //     urlLocation: null
        // },
        active: true,
        delete: false
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

    const handlePreviewImage = (e) => {
        const img = e.target.files[0]
        img.preview = URL.createObjectURL(img)
        setImage(img)
        setMovie({ ...movie, poster: img.preview })
    }

    useEffect(() => {
        handleGetItems()
    }, [userId]);

    useEffect(() => {
        if (userInfo && (user.role === "MANAGER" ? userInfo.cinema : true)) {
            setAccount({
                ...account,
                fullName: userInfo.fullName,
                dob: userInfo.dob,
                address: {
                    ...account.address,
                    street: (userInfo && userInfo.address && userInfo.address.street) ? userInfo.address.street : '',
                    district: (userInfo && userInfo.address && userInfo.address.district) ? userInfo.address.district : '',
                    province: (userInfo && userInfo.address && userInfo.address.province) ? userInfo.address.province : '',
                    country: (userInfo && userInfo.address && userInfo.address.country) ? userInfo.address.country : ''
                },
                email: userInfo.email,
                phone: userInfo.phone,
                userName: userInfo.userName,
                role: userInfo.role.roleName,
                // ...(user.role === "MANAGER" && {
                //     cinema: {
                //         ...account.cinema,
                //         cinemaId: userInfo.cinema.cinemaId || "",
                //         location: userInfo.cinema.location || "",
                //         cinemaName: userInfo.cinema.cinemaName || "",
                //         desc: userInfo.cinema.desc || "",
                //         status: userInfo.cinema.status || true,
                //         urlLocation: userInfo.cinema.urlLocation || null
                //     }
                // }),
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
                    {!userId && <h2 className="text-2xl text-emerald-800 font-bold uppercase text-center mb-6">Profile details</h2>}
                    <form id='formUpdateProfile' action="" onSubmit={handleUpdateUserInfo}>
                        <div className="rounded-md p-8 shadow-lg bg-slate-100">
                            {!userId && <div className='pb-8 mb-2 border-b border-b-slate-400 flex justify-center items-center'>
                                <div className=''>
                                    <div className='flex justify-center h-24 text-center rounded-sm'>
                                        <input
                                            onChange={handlePreviewImage}
                                            type="file"
                                            className="hidden" // Ẩn input mặc định
                                            id="form_img-upload"
                                        />
                                        <UserCircleIcon className="h-20 w-20 text-emerald-600 bg-slate-200 rounded-full" />
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


                            </div>}
                            <div className="my-2">
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
                                    className="block w-full px-4 py-1 text-[10px] sm:text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                    value={account.fullName}
                                    placeholder='Họ và tên'
                                />
                            </div>
                            <div className='flex justify-between items-center text-[10px] sm:text-lg'>
                                <div className="relative my-2">
                                    <label
                                        htmlFor=""
                                        className="block w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Birth
                                    </label>
                                    <DatePicker
                                        selected={dob}
                                        onChange={date => {
                                            setDob(date);
                                            setAccount({ ...account, dob: date });
                                        }}
                                        value={FormatDataTime(account.dob).date}
                                        placeholderText='Ngày sinh'
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        dateFormat="yyyy-MM-dd" // Định dạng ngày
                                    />
                                </div>
                                <div className="my-2">
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
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        value={account.phone}
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
                                        // value={account.fullName}
                                        onChange={e => setAccount({ ...account, email: e.target.value })}
                                        type="email"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        value={account.email}
                                        placeholder={"Email"}
                                    />
                                </div>
                                {user.role === "MANAGER" && <div className="my-2 w-2/5">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Cinema
                                    </label>
                                    <input
                                        value={account.cinema.cinemaName}
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
                                    Address
                                </label>
                                <div className='flex justify-between w-full'>
                                    <input
                                        value={account.address ? account.address.street : ''}
                                        onChange={e => setAccount({ ...account, address: { ...account.address, street: e.target.value } })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                        placeholder={"Wards (Xã, Phường)"}
                                    />
                                    <input
                                        value={account.address ? account.address.district : ''}
                                        onChange={e => setAccount({ ...account, address: { ...account.address, district: e.target.value } })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder={"District (Quận, Huyện)"}
                                    />
                                </div>
                                <div className='flex justify-between w-full'>
                                    <input
                                        value={account.address ? account.address.province : ''}
                                        onChange={e => setAccount({ ...account, address: { ...account.address, province: e.target.value } })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                        placeholder={"Province (Thành phố, Tỉnh)"}
                                    />
                                    <input
                                        value={account.address ? account.address.country : ''}
                                        onChange={e => setAccount({ ...account, address: { ...account.address, country: e.target.value } })}
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
                                        // value={account.fullName}
                                        onChange={e => setAccount({ ...account, userName: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        value={account.userName}
                                        placeholder='Tên đăng nhập'
                                    />
                                </div>
                                <div className="my-2 w-1/3">
                                    <label
                                        htmlFor=""
                                        className="w-24 font-bold leading-9 text-gray-900"
                                    >
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2"
                                        placeholder={account.role && account.role}
                                        readOnly
                                    />
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
                </>
            }
        </div>
    )
}

export default ProfileDetail
