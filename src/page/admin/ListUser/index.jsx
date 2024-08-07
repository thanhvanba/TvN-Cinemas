import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CinemaService from '../../../service/CinemaService'
import FormatDataTime from '../../../utils/FormatDataTime'
import Pagination from '../../../components/Pagination'

import searchImg from '../../../images/7a0bfed18240211e7851.jpg'
import AdminService from '../../../service/AdminService'

import ModalComponent from '../../../utils/Modal';
import Loading from '../../../components/Loading'
import Search from '../../../components/Search'
import TimeAgo from '../../../components/TimeAgo'
import ManagerService from '../../../service/ManagerService'
import { LoginContext } from '../../../context/LoginContext'
import useLoadingState from '../../../hook/UseLoadingState'
import { UserGroupIcon, UsersIcon } from '@heroicons/react/24/solid'

const ListUser = () => {
    const { user } = useContext(LoginContext)
    const { pathname } = useLocation()

    const navigate = useNavigate();
    const changeTab = (pathname) => {
        navigate(pathname);
    };

    const cinemaId = localStorage.getItem('cinemaId');

    const { loading, setLoading } = useLoadingState(false);
    const [modalStates, setModalStates] = useState({});
    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );

    const { addManagerApi, getAllPersonnelApi, getAllViewerApi, deleteUserApi, changeStatusUserApi, getCinemasUnmanagedApi, getOneUserApi } = AdminService()
    const { getAllPersonnelManagerApi, addStaffApi, changeStatusStaffApi } = ManagerService()

    const [allCinema, setAllCinema] = useState([])
    const [allUser, setAllUser] = useState([])
    console.log("🚀 ~ allUser:", allUser)

    const [account, setAccount] = useState({
        fullName: "",
        email: "",
        phone: "",
        userName: "",
        password: "",
        cinemaId: cinemaId || ""
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
    const listUser = {
        header: { stt: "STT", info: "Thông tin cơ bản", username: "Tên đăng nhập", role: "Chức vụ", status: "Trạng thái", created: "Ngày tạo", login: "Đăng nhập gần đây", action: "actions", cinema: "Rạp" },
        user: allUser,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
        iAvatar: UserCircleIcon
    }

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!account.fullName) newErrors.fullName = 'Vui lòng nhập họ tên!';
        if (!account.email) newErrors.email = 'Vui lòng nhập email!';
        // else if (isEmail(account.email)) newErrors.email = 'Vui lòng nhập đúng định dạng!'
        if (!account.phone) newErrors.phone = 'Vui lòng nhập số điện thoại!';
        if (!account.cinemaId) newErrors.cinema = 'Vui lòng chọn rạp phim!';
        if (!account.userName) newErrors.userName = 'Vui lòng nhập tên đăng nhập!';
        if (!account.password) newErrors.password = 'Vui lòng nhập mật khẩu!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: undefined
            }));
        }
    };
    const handleAddManager = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading('add', true);
            const data = account;
            { pathname === "/manager/list-personnel" ? await addStaffApi(data) : await addManagerApi(data); }
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            setLoading('add', false);
        }
    };
    const handleClickIconSearch = () => {

    }
    const handleGetItem = async () => {
        let res = await getCinemasUnmanagedApi()

        if (res && res.data && res.data.result && res.data.result) {
            setAllCinema(res.data.result)
        }
    }
    const handleGetOneUser = async (userId) => {
        let res = await getOneUserApi(userId)

        if (res && res.data && res.data.result && res.data.result) {
            setUserInfo(res.data.result)
        }
    }
    const handleGetUser = async (pageNumber) => {
        setLoading('get', true);
        let ress = pathname === "/admin/list-viewer" ? await getAllViewerApi(pageNumber, 5) : user.role === "ADMIN" ? await getAllPersonnelApi(pageNumber, 5) : await getAllPersonnelManagerApi(pageNumber, 5)
        setLoading('get', false);
        if (ress && ress.data && ress.data.result && ress.data.result && ress.data.result.content) {
            setAllUser(ress.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: ress.data.result.pageSize,
                totalPages: ress.data.result.totalPages,
                totalElements: ress.data.result.totalElements
            }));
        }
    }

    const [inputSearch, setInputSearch] = useState([])
    const [showListSearch, setShowListSearch] = useState(false)
    const handleSearchFc = async (value) => {
        setLoading('search', true);
        let ress = pathname === "/admin/list-viewer" ? await getAllViewerApi(1, 5, value) : user.role === "ADMIN" ? await getAllPersonnelApi(1, 5, value) : await getAllPersonnelManagerApi(1, 5, value)
        setLoading('search', false);
        if (ress && ress.data && ress.data.result && ress.data.result && ress.data.result.content) {
            setAllUser(ress.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: 1,
                pageSize: ress.data.result.pageSize,
                totalPages: ress.data.result.totalPages,
                totalElements: ress.data.result.totalElements
            }));
        }
    }
    const handleChangeStatus = async (userId) => {
        user.role === "ADMIN" ? await changeStatusUserApi(userId) : await changeStatusStaffApi(userId)
        handleGetUser(pagination.pageNumber)
        const updatedUser = allUser.map((user) => {
            if (user.userId === userId) {
                return { ...user, delete: !user.delete };
            }
            return user;
        });

        setAllUser(updatedUser);

        setModalStates((prevStates) => ({ ...prevStates, [userId]: false }));
    };

    const handleDeleteUser = async (userId) => {
        await deleteUserApi(userId);
        handleGetUser(pagination.pageNumber)
        const updatedUser = allUser.filter((user) => user.userId !== userId);

        setAllUser(updatedUser);
    };

    const handleSelectChange = (selectedValue) => {
        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        setAccount({ ...account, cinemaId: selectedId })
        clearError('cinema')
    };

    const handleOpenModal = (userId) => {
        setModalStates((prevStates) => ({ ...prevStates, [userId]: true }));
    };

    const handleCloseModal = (userId) => {
        setModalStates((prevStates) => ({ ...prevStates, [userId]: false }));
    };

    useEffect(() => {
        handleGetItem()
        handleGetUser(pagination.pageNumber)
    }, []);
    const nameCinema = allCinema.map(item => item.cinemaName)
    return (
        <div>
            <div className='px-4'>
                {/* add manager */}
                <Popover className='relative h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>
                        {pathname === "/admin/list-viewer"
                            ? <p className='flex items-center'>
                                <UsersIcon className='h-12 w-12 mr-1 text-emerald-600' />
                                Danh sách khách hàng
                            </p>
                            : <p className='flex items-center'>
                                <UserGroupIcon className='h-12 w-12 mr-1 text-emerald-600' />
                                Danh sách nhân sự
                            </p>
                        }
                    </h2>
                    {(pathname === "/admin/list-personnel" || user.role === "MANAGER") &&
                        <Popover.Button
                            className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl focus:outline-none hover:bg-emerald-800 bg-emerald-600 text-white"
                            type='submit'
                        >
                            Thêm
                        </Popover.Button>
                    }
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute top-full right-72 z-10 w-1/2 overflow-hidden bg-slate-300 rounded-md">
                            <div className="px-6 py-3 relative">
                                <form id='formAddManager' onSubmit={handleAddManager} action="">
                                    <h2 className='text-xl font-semibold'>
                                        Thông tin cơ bản
                                    </h2>
                                    <div className='px-8'>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Họ và tên <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                // value={account.fullName}
                                                onChange={e => {
                                                    setAccount({ ...account, fullName: e.target.value })
                                                    clearError('fullName')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder="Nhập họ và tên"
                                            />
                                        </div>
                                        {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Email <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                // value={account.email}
                                                onChange={e => {
                                                    setAccount({ ...account, email: e.target.value });
                                                    clearError('email')
                                                }}
                                                type="email"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder="Nhập email"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Số điện thoại <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                // value={account.phone}
                                                onChange={e => {
                                                    setAccount({ ...account, phone: e.target.value })
                                                    clearError('phone')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-600">{errors.phone}</p>}
                                        {pathname !== "/manager/list-personnel" &&
                                            <div className="relative my-2 z-50">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg leading-6 text-gray-900"
                                                >
                                                    Rạp quản lý <span className='text-red-600'>*</span>
                                                </label>
                                                <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                    <SelectMenu onSelectChange={handleSelectChange} items={nameCinema} content={"Chọn rạp"} />
                                                </div>
                                                {errors.cinema && <p className="text-red-600">{errors.cinema}</p>}
                                            </div>
                                        }
                                    </div>
                                    <h2 className='text-xl font-semibold pt-3'>
                                        Thông tin đăng nhập
                                    </h2>
                                    <div className='px-8'>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Tên đăng nhập <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                // value={account.userName}
                                                onChange={e => {
                                                    setAccount({ ...account, userName: e.target.value })
                                                    clearError('userName')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder="Nhập tên đăng nhập"
                                            />
                                            {errors.userName && <p className="text-red-600">{errors.userName}</p>}
                                        </div>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Mật khẩu <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                // value={account.password}
                                                onChange={e => {
                                                    setAccount({ ...account, password: e.target.value })
                                                    clearError('password')
                                                }}
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder="Nhập mật khẩu"
                                            />
                                            {errors.password && <p className="text-red-600">{errors.password}</p>}
                                        </div>
                                    </div>
                                    <div className='flex justify-end mt-10'>
                                        <button
                                            className="w-1/3 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                            type='submit'
                                            disabled={loading['add']}
                                        >
                                            {loading['add'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                            &nbsp; {pathname !== "/manager/list-personnel" ? "Thêm quản lý" : "Thêm nhân viên"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Popover.Panel>
                    </Transition>

                </Popover>

                <div className='relative'>
                    <div className='px-2'>
                        <div className='flex justify-center absolute mx-auto top-48 right-1/2 left-1/2 z-50'>
                            {loading['get'] && <Loading />}
                        </div>
                        {!loading['get'] &&
                            <div className=''>
                                <div className='flex justify-end items-center py-4 pr-4'>
                                    <div className="relative border-2 rounded-xl ">
                                        <Search searchFunction={handleSearchFc}  handleClickIconSearch={handleClickIconSearch} setShowListSearch={setShowListSearch} inputSearch={inputSearch} setInputSearch={setInputSearch} />
                                    </div>
                                </div>
                                {allUser.length === 0 ?
                                    <>
                                        <div className='flex justify-center'>
                                            <img src={searchImg} alt="" />
                                        </div>

                                        <div className='p-4 font-light text-center text-gray-500'>Không tìm thấy thành viên nào. Tiến hành thêm  !!!</div>
                                    </> :
                                    <>
                                        <table className='mt-6 w-full'>
                                            <thead className=''>
                                                <tr className='border-b-2 border-slate-200'>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.stt}</th>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.info}</th>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.username}</th>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.role}</th>
                                                    {pathname === "/admin/list-personnel" && <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.cinema}</th>}
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.created}</th>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase w-28'>{listUser.header.login}</th>
                                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listUser.header.action}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allUser && allUser.map((item, index) => (
                                                        <tr className='border-b-2 border-slate-200 hover:bg-slate-200'>
                                                            <td className='text-center px-2 py-3'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                                                            <td className='text-start px-2 py-3'>
                                                                <div className='flex items-center'>
                                                                    <div div className='pr-2' >
                                                                        {item.avatar ? <img className='rounded-full w-14 h-14 border-2' src={item.avatar} alt="" /> : <listUser.iAvatar className="h-16 w-16 text-emerald-600" />}
                                                                    </div >
                                                                    <div>
                                                                        <h3 className='font-semibold text-lg'>{item.fullName}</h3>
                                                                        <p className='text-sm'>Email: {item.email}</p>
                                                                        <span className='text-sm'>Sdt: {item.phone}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='text-center px-2 py-3'>{item.userName}</td>
                                                            <td className='text-center px-2 py-3'>
                                                                <div className='flex justify-center px-2 py-0.5 rounded-md bg-orange-100'>
                                                                    {item.role.roleName === "VIEWER" ? "Người dùng" : item.role.roleName === "ADMIN" ? "Admin" : item.role.roleName === "MANAGER" ? "Quản lý" : "Nhân viên"}
                                                                </div>
                                                            </td>
                                                            {pathname === "/admin/list-personnel" && <td className='text-center px-2 py-3'>{item.cinema ? item.cinema.cinemaName : "-"}</td>}
                                                            <td className='text-center px-2 py-3'>{FormatDataTime(item.createdAt).date}</td>
                                                            <td className='text-center px-2 py-3 text-sky-600'>{item.lastLoginAt === null ? '-' : TimeAgo(item.lastLoginAt)}</td>
                                                            <td className='text-center px-2 py-3'>
                                                                <div className='flex items-center'>
                                                                    <button
                                                                        className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'
                                                                        type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.userId); }}
                                                                    >
                                                                        <listUser.action.aChange className='h-4 w-4 text-emerald-600' />
                                                                    </button>
                                                                    <button onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/user/${item.userId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                        <listUser.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                                    </button>
                                                                    {/* <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.userId); }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                                        <listUser.action.aDelete className='h-4 w-4 text-red-600' />
                                                                    </button> */}
                                                                    <div>
                                                                        {modalStates[item.userId] && (
                                                                            <ModalComponent
                                                                                isOpen={modalStates[item.userId]}
                                                                                onClose={() => handleCloseModal(item.userId)}
                                                                                onConfirm={() => handleChangeStatus(item.userId)}
                                                                                onCancel={() => handleCloseModal(item.userId)}
                                                                                title={!item.delete ? 'Xóa Tài khoản' : 'Khôi phục'}
                                                                                content={!item.delete ? 'Bạn có chắc chắn xóa tài khoản này ???' : 'Bạn có muốn khôi phục tài khoản này ???'}
                                                                                buttonName={!item.delete ? 'Xóa' : 'Khôi phục'}
                                                                                buttonCancel='Thoát'
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={`${!item.delete ? "text-green-600" : "text-red-600"} text-center px-2 py-3`}>{!item.delete ? "Khả dụng" : "Bị cấm"}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        {allUser.length !== 0 && <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetUser} />}
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ListUser
