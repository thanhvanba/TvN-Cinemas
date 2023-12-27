import React from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CinemaService from '../../../service/CinemaService'
import FormatDataTime from '../../../utils/FormatDataTime'
import Pagination from '../../../utils/Pagination'

import AdminService from '../../../service/AdminService'

import ModalComponent from '../../../utils/Modal';

const ListUser = () => {
    const [loading, setLoading] = useState(false);
    const [modalStates, setModalStates] = useState({});
    const navigate = useNavigate()

    const { addManagerApi, getAllUserApi, deleteUserApi, changeStatusUserApi, getCinemasUnmanagedApi } = AdminService()

    const [allCinema, setAllCinema] = useState([])
    const [allUser, setAllUser] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [account, setAccount] = useState({
        fullName: "",
        email: "",
        phone: "",
        userName: "",
        password: "",
        cinemaId: ""
    })
    const listUser = {
        header: { stt: "STT", info: "Basic info", username: "user name", role: "role", status: "status", created: "created date", login: "last login", action: "actions" },
        user: allUser,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
        iAvatar: UserCircleIcon
    }


    const handleAddManager = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = account;
        await addManagerApi(data);
        setLoading(false);
    };
    const handleGetItem = async () => {
        let res = await getCinemasUnmanagedApi()

        if (res && res.data && res.data.result && res.data.result) {
            setAllCinema(res.data.result)
        }
    }
    const handleGetUser = async (pageIndex) => {
        setLoading(true);
        let ress = await getAllUserApi(pageIndex, 5)
        setLoading(false);
        setCurrentPage(pageIndex)
        if (ress && ress.data && ress.data.result && ress.data.result && ress.data.result.content) {
            setAllUser(ress.data.result.content)
        }
    }
    const handleChangeStatus = async (userId) => {
        await changeStatusUserApi(userId);
        handleGetUser(currentPage)
        const updatedUser = allUser.map((user) => {
            if (user.userId === userId) {
                return { ...user, delete: !user.delete };
            }
            return user;
        });

        setAllUser(updatedUser);
    };

    const handleDeleteUser = async (userId) => {
        await deleteUserApi(userId);
        handleGetUser(currentPage)
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
        handleGetUser(currentPage)
    }, []);
    const nameCinema = allCinema.map(item => item.cinemaName)
    return (
        <div>
            <div className='px-4'>
                {/* add manager */}
                <Popover className='relative h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>List User</h2>
                    <Popover.Button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl focus:outline-none hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                    >
                        Add User
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute top-full right-72 z-10 w-1/2 overflow-hidden bg-slate-300 rounded-md">
                            <div className="px-6 py-4 relative">
                                <form id='formAddManager' onSubmit={handleAddManager} action="">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setAccount({ ...account, fullName: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
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
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            // value={account.phone}
                                            onChange={e => setAccount({ ...account, phone: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="relative my-4 z-50">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Cinemas
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            <SelectMenu onSelectChange={handleSelectChange} items={nameCinema} content={"----Select----"} />
                                        </div>
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            User Name
                                        </label>
                                        <input
                                            // value={account.userName}
                                            onChange={e => setAccount({ ...account, userName: e.target.value })} type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <input
                                            // value={account.password}
                                            onChange={e => setAccount({ ...account, password: e.target.value })}
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className='flex justify-end mt-10'>
                                        <button
                                            className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                            type='submit'
                                            disabled={loading}
                                        >
                                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                            &nbsp;Add Manager
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Popover.Panel>
                    </Transition>

                </Popover>

                <div className='relative'>
                    <div className='px-3'>
                        {
                            allUser.length === 0 &&
                            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                                {loading && <FontAwesomeIcon className='w-16 h-16 ' icon={faSpinner} spin />}
                            </div>
                        }
                        <div className=''>
                            {
                                <table className='mt-6 w-full'>
                                    <thead className=''>
                                        <tr>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.stt}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.info}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.username}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.role}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.status}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.created}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.login}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listUser.header.action}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listUser && listUser.user && listUser.user.map((item, index) => (
                                                <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                    <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                                                    <td className='text-start font-medium px-5 py-4'>
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
                                                    <td className='text-start font-medium px-5 py-4'>{item.userName}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{item.role.roleName}</td>
                                                    <td className={`${!item.delete ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{!item.delete ? "Approved" : "Banned"}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.createdAt).date}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.lastLoginAt).date}</td>
                                                    <td className='text-start font-medium px-5 py-4'>
                                                        <div className='flex items-center'>
                                                            <button
                                                                className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'
                                                                type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.userId) }}
                                                            >
                                                                <listUser.action.aChange className='h-4 w-4 text-emerald-600' />
                                                            </button>
                                                            {/* <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                <listUser.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                            </a> */}
                                                            <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.userId); }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                                <listUser.action.aDelete className='h-4 w-4 text-red-600' />
                                                            </button>
                                                            <div>
                                                                {modalStates[item.userId] && (
                                                                    <ModalComponent
                                                                        isOpen={modalStates[item.userId]}
                                                                        onClose={() => handleCloseModal(item.userId)}
                                                                        onConfirm={() => handleDeleteUser(item.userId)}
                                                                        onCancel={() => handleCloseModal(item.userId)}
                                                                        title='Xóa Tài khoản'
                                                                        content='Bạn có chắc chắn xóa tài khoản này ???'
                                                                        buttonName='Delete'
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                        </div>
                        <Pagination pageNumber={currentPage} onPageChange={handleGetUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUser
