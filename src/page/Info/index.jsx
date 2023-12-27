import { Link } from 'react-router-dom'
import bg from "../../images/bg-cinema-10.png"
import { useState, useEffect, useContext, Fragment } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLoadingState from '../../hook/UseLoadingState'
import FormatDataTime from '../../utils/FormatDataTime';
import { LoginContext } from '../../context/LoginContext';
import UserService from '../../service/UserService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './info.css'
import formatPrice from '../../utils/ConvertStringFollowFormat';
const Info = () => {
    const { user } = useContext(LoginContext)
    const [image, setImage] = useState()
    const [dob, setDob] = useState(null);
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
        delete: false
    });
    const [bookingUpcoming, setBookingUpcoming] = useState([]);
    const [bookingViewed, setBookingViewed] = useState([]);
    const [ticketDetail, setTicketDetail] = useState([]);
    const { getUserInfoApi, updateProfileApi, changePasswordApi, getBookingUpcomingApi, getBookingViewedApi, getTicketDetailApi } = UserService();

    const { loading, setLoading } = useLoadingState(false);
    const [toggle, setToggle] = useState(false);
    const [account, setAccount] = useState({
        fullName: "",
        dob: "",
        address: {
            street: "",
            district: "",
            province: "",
            country: ""
        },
        email: "",
        phone: "",
        userName: "",
        cinema: {
            cinemaId: "",
            location: "",
            cinemaName: "",
            desc: "",
            status: true,
            urlLocation: null
        },
    })
    const [passwordUpdateInfo, setPasswordUpdateInfo] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState('1');
    const handleCheckPathname = (pathname) => {
        switch (pathname) {
            case "/user/info":
                setCurrentTab("1")
                break;
            case "/user/history-booking":
                setCurrentTab("2")
                break;
            default:
                setCurrentTab("1")
        }
    }

    const handleOpenModal = () => {
        setToggle(prevToggle => !prevToggle);
    }
    useEffect(() => {
        handleCheckPathname(pathname)
    }, [pathname]);
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleGetItems = async () => {
        let resInfo = await getUserInfoApi()
        if (resInfo && resInfo.data && resInfo.data.result) {
            setUserInfo(resInfo.data.result)
        }

        let resBookingUpcomming = await getBookingUpcomingApi()
        if (resBookingUpcomming && resBookingUpcomming.data && resBookingUpcomming.data.result) {
            setBookingUpcoming(resBookingUpcomming.data.result)
        }

        let resBookingViewed = await getBookingViewedApi()
        if (resBookingViewed && resBookingViewed.data && resBookingViewed.data.result) {
            setBookingViewed(resBookingViewed.data.result)
        }
    }
    const handleGetTicketDetail = async (bookingId) => {
        let resTicket = await getTicketDetailApi(bookingId)
        if (resTicket && resTicket.data && resTicket.data.result) {
            setTicketDetail(resTicket.data.result)
        }
    }
    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        setLoading('account', true);
        const data = account
        await updateProfileApi(data);
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
        handleGetItems()
    }, []);

    useEffect(() => {
        if (userInfo && userInfo.address && (user.role === "MANAGER" ? userInfo.cinema : true)) {
            setAccount({
                ...account,
                fullName: userInfo.fullName,
                dob: userInfo.dob,
                address: {
                    ...account.address,
                    street: userInfo.address.street || '',
                    district: userInfo.address.district || '',
                    province: userInfo.address.province || '',
                    country: userInfo.address.country || '',
                },
                email: userInfo.email,
                phone: userInfo.phone,
                userName: userInfo.userName,
                ...(user.role === "MANAGER" && {
                    cinema: {
                        ...account.cinema,
                        cinemaId: userInfo.cinema.cinemaId || "",
                        location: userInfo.cinema.location || "",
                        cinemaName: userInfo.cinema.cinemaName || "",
                        desc: userInfo.cinema.desc || "",
                        status: userInfo.cinema.status || true,
                        urlLocation: userInfo.cinema.urlLocation || null
                    }
                })
            });
        }
    }, [userInfo]);
    return (
        <div >
            <div className='mx-auto max-w-6xl pt-32 pb-8'>
                {user.role === "VIEWER" &&
                    <div className="sub-tab">
                        <ul className="relative inline-block">
                            <li
                                onClick={() => changeTab("/user/info")}
                                className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full text-slate-100"
                            >
                                <a
                                    className={`${currentTab === '1' ? "active1" : ""} text-2xl font-bold uppercase p-2 leading-[3.5rem]`}
                                >
                                    Profile
                                </a>

                            </li>
                            <li
                                onClick={() => changeTab("/user/history-booking")}
                                className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full text-slate-100"
                            >
                                <a
                                    className={`${currentTab === '2' ? "active1" : ""} text-2xl font-bold uppercase p-2 leading-[3.5rem]`}
                                >
                                    History Booking
                                </a>
                            </li>
                        </ul>
                    </div>}
                <div style={{ display: currentTab === '1' ? 'block' : 'none' }}>
                    <div className='grid grid-cols-2 gap-8'>
                        {/* Thông tin tài khoản */}
                        <div>
                            <h2 className="text-2xl text-emerald-800 font-bold uppercase text-center mb-6">Profile details</h2>
                            <form id='formAddCinema' action="" onSubmit={handleUpdateUserInfo}>
                                <div className="rounded-md p-8 shadow-lg bg-slate-100">
                                    <div className='pb-8 mb-2 border-b border-b-slate-400 flex justify-center items-center'>
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


                                    </div>
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
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder={userInfo.fullName}
                                        />
                                    </div>
                                    <div className='flex justify-between items-center'>
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
                                                placeholderText={FormatDataTime(userInfo.dob).date}
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
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
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-full'>
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
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.email}
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
                                                onChange={e => setAccount({ ...account, cinema: { ...account.cinema, cinemaName: e.target.value } })}
                                                type="email"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2"
                                                placeholder={userInfo.cinema.cinemaName}
                                                readOnly
                                            />
                                        </div>}
                                    </div>
                                    <div className="my-2">
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
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                                placeholder={"Wards (Xã, Phường)"}
                                            />
                                            <input
                                                value={account.address ? account.address.district : ''}
                                                onChange={e => setAccount({ ...account, address: { ...account.address, district: e.target.value } })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={"District (Quận, Huyện)"}
                                            />
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <input
                                                value={account.address ? account.address.province : ''}
                                                onChange={e => setAccount({ ...account, address: { ...account.address, province: e.target.value } })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600 mr-4"
                                                placeholder={"Province (Thành phố, Tỉnh)"}
                                            />
                                            <input
                                                value={account.address ? account.address.country : ''}
                                                onChange={e => setAccount({ ...account, address: { ...account.address, country: e.target.value } })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={"Country (Quốc gia)"}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-between w-full'>
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
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder={userInfo.userName}
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
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2"
                                                placeholder={userInfo.role.roleName}
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
                <div style={{ display: currentTab === '2' ? 'block' : 'none' }}>
                    <Tabs className='bg-white rounded-xl border-b-[12px] border-slate-300'>
                        <TabList className='py-2 px-8  border-b-[12px] border-slate-300'>
                            <Tab>Phim sắp xem</Tab>
                            <Tab>Phim đã xem</Tab>
                        </TabList>

                        <TabPanel>
                            {
                                bookingUpcoming.length === 0 ?
                                    <p className='pl-8'>-- Chưa có lịch sử booking nào --</p> :
                                    bookingUpcoming.map((item) => (
                                        <div
                                            onClick={() => {
                                                handleOpenModal();
                                                handleGetTicketDetail(item.bookingId);
                                            }}
                                            className='flex justify-between border-x-[24px] border-t-[12px] border-b-[12px] border-slate-300 bg-slate-100 px-6'
                                        >
                                            <div className='py-4'>
                                                <p className='text-start font-medium py-4 text-4xl text-emerald-600 '>{item.movieName}</p>
                                                <p className='pl-2 text-start font-light text-xl'>{item.cinemaName}</p>
                                                <p className='pl-2 text-start font-semibold text-xl'>{FormatDataTime(item.timeShow).time} - Ngày {FormatDataTime(item.timeShow).date}  </p>
                                            </div>
                                            <p className='text-start font-medium pt-20 text-5xl text-zinc-500'><span className='text-3xl text-slate-800'>Giá:</span> {formatPrice(item.price)}<sup>đ</sup></p>
                                        </div>
                                    ))
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                bookingViewed.length === 0 ?
                                    <p className='pl-8'>-- Chưa có lịch sử booking nào --</p> :
                                    bookingViewed.map((item) => (
                                        <div
                                            onClick={() => {
                                                handleOpenModal()
                                                handleGetTicketDetail(item.bookingId);
                                            }}
                                            className='flex justify-between border-x-[24px] border-t-[12px] border-b-[12px] border-slate-300 bg-slate-100 px-6'
                                        >
                                            <div className='py-4'>
                                                <p className='text-start font-medium py-4 text-4xl text-emerald-600 '>{item.movieName}</p>
                                                <p className='pl-2 text-start font-light text-xl'>{item.cinemaName}</p>
                                                <p className='pl-2 text-start font-semibold text-xl'>{FormatDataTime(item.timeShow).time} - Ngày {FormatDataTime(item.timeShow).date}  </p>
                                            </div>
                                            <p className='text-start font-medium pt-20 text-5xl text-zinc-500'><span className='text-3xl text-slate-800'>Giá:</span> {formatPrice(item.price)}<sup>đ</sup></p>
                                        </div>
                                    ))
                            }
                        </TabPanel>
                    </Tabs>
                </div>

            </div >

            {toggle && (
                <div className='top-0 bottom-0 bg-cover w-full fixed flex justify-center items-center   '>
                    <div className=" w-[28%] z-10 overflow-hidden bg-slate-300 rounded-md">
                        <div className="p-4 md:p-6 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                            <h4 className="font-bold text-3xl pb-2 border-b-2 border-slate-400">Chi tiết vé</h4>
                            <div className='px-4  space-y-6'>
                                <div>
                                    <p className="text-3xl pt-4 text-emerald-600 font-semibold">{ticketDetail.movieName}</p>
                                </div>
                                <div>
                                    <p className='font-light'>Ngày giờ chiếu</p>
                                    <div className="flex items-center space-x-2 text-xl">
                                        <span className="font-bold text-orange-500">{FormatDataTime(ticketDetail.timeShow).time}</span>
                                        <span>-</span>
                                        <span className="font-bold">{FormatDataTime(ticketDetail.timeShow).date}</span>
                                        <span>({ticketDetail.duration} phút)</span>
                                    </div>

                                </div>
                                <div>
                                    <p className='font-light'>Rạp chiếu</p>
                                    <p className="font-semibold text-xl">{ticketDetail.cinemaName}</p>
                                </div>

                                <div className="flex items-center gap-10">
                                    <div className="w-3/5">
                                        <p className='font-light'>Ghế</p>
                                        <p className="font-semibold text-xl">{ticketDetail && ticketDetail.seats && ticketDetail.seats.map(seat => (
                                            <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column},</span>
                                        ))}</p>
                                    </div>
                                    <div className='w-2/5'>
                                        <p className='font-light'>Phòng chiếu</p>
                                        <p className="font-semibold text-xl">{ticketDetail.roomName}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-10'>
                                    <div className='w-3/5'>
                                        <p className='font-light'>Bắp nước</p>
                                        <p className="font-semibold text-xl">{ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                            <span key={index}>&nbsp;{food.food.name},</span>
                                        ))}</p>
                                    </div>
                                    <div className='w-2/5'>
                                        <p className='font-light'>Giá tiền</p>
                                        <p className="font-semibold text-3xl text-cyan-600">{ticketDetail.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='button'
                                    disabled={loading['change']}
                                    onClick={() => handleOpenModal()}
                                >
                                    {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default Info;
