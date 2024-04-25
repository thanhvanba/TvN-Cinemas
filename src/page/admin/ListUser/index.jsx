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

import AdminService from '../../../service/AdminService'

import ModalComponent from '../../../utils/Modal';
import Loading from '../../../components/Loading'
import Search from '../../../components/Search'
import TimeAgo from '../../../components/TimeAgo'
import ManagerService from '../../../service/ManagerService'
import { LoginContext } from '../../../context/LoginContext'
import useLoadingState from '../../../hook/UseLoadingState'

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
    const { getAllPersonnelManagerApi, addStaffApi } = ManagerService()

    const [allCinema, setAllCinema] = useState([])
    const [allUser, setAllUser] = useState([])

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


    const handleAddManager = async (e) => {
        e.preventDefault();
        setLoading('add', true);
        const data = account;
        { pathname === "/manager/list-personnel" ? await addStaffApi(data) : await addManagerApi(data); }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setLoading('add', false);
    };
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
    const handleChangeStatus = async (userId) => {
        await changeStatusUserApi(userId);
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
                            ? <p>Danh sách khách hàng</p>
                            : <p>Danh sách nhân sự</p>
                        }
                    </h2>
                    {(pathname === "/admin/list-personnel" || user.role === "MANAGER") &&
                        <Popover.Button
                            className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl focus:outline-none hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
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
                                    <div className='text-xl font-semibold'>
                                        Thông tin cơ bản
                                    </div>
                                    <div className='px-8'>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Họ và tên
                                            </label>
                                            <input
                                                // value={account.fullName}
                                                onChange={e => setAccount({ ...account, fullName: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Email
                                            </label>
                                            <input
                                                // value={account.email}
                                                onChange={e => { setAccount({ ...account, email: e.target.value }); }}
                                                type="email"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Số điện thoại
                                            </label>
                                            <input
                                                // value={account.phone}
                                                onChange={e => setAccount({ ...account, phone: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                        </div>
                                        {pathname !== "/manager/list-personnel" &&
                                            <div className="relative my-2 z-50">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg leading-6 text-gray-900"
                                                >
                                                    Rạp quản lý
                                                </label>
                                                <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                    <SelectMenu onSelectChange={handleSelectChange} items={nameCinema} content={"----Select----"} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='text-xl font-semibold pt-3'>
                                        Thông tin đăng nhập
                                    </div>
                                    <div className='px-8'>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                // value={account.userName}
                                                onChange={e => setAccount({ ...account, userName: e.target.value })} type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="relative my-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg leading-6 text-gray-900"
                                            >
                                                Mật khẩu
                                            </label>
                                            <input
                                                // value={account.password}
                                                onChange={e => setAccount({ ...account, password: e.target.value })}
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
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
                        <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                            {loading['get'] && <Loading />}
                        </div>
                        {!loading['get'] &&
                            <div className=''>
                                <div className='flex justify-end items-center py-4 pr-4'>
                                    <div className="border-2 rounded-xl ">
                                        <Search />
                                    </div>
                                </div>
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
                                                                <listUser.iAvatar className="h-16 w-16 text-emerald-600" />
                                                            </div >
                                                            <div>
                                                                <h3>{item.fullName}</h3>
                                                                <p className='font-normal'>Email: {item.email}</p>
                                                                <span className='font-normal'>Sdt: {item.phone}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center px-2 py-3'>{item.userName}</td>
                                                    <td className='text-center px-2 py-3'>{item.role.roleName === "VIEWER" ? "Người dùng" : item.role.roleName === "ADMIN" ? "Admin" : item.role.roleName === "MANAGER" ? "Quản lý" : "Nhân viên"}</td>
                                                    {pathname === "/admin/list-personnel" && <td className='text-center px-2 py-3'>{item.cinema ? item.cinema.cinemaName : "-"}</td>}
                                                    <td className='text-center px-2 py-3'>{FormatDataTime(item.createdAt).date}</td>
                                                    <td className='text-center px-2 py-3'>{item.lastLoginAt === null ? '-' : TimeAgo(item.lastLoginAt)}</td>
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
                                <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetUser} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ListUser
