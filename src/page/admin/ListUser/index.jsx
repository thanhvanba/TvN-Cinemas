import React from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CinemaService from '../../../service/CinemaService'

import AdminService from '../../../service/AdminService'
const ListUser = () => {
    const [loading, setLoading] = useState(false);
    const { addManagerApi } = AdminService()
    const navigate = useNavigate()
    const listUser = [
        {
            header: { stt: "STT", info: "Basic info", username: "user name", role: "role", status: "status", created: "created date", login: "last login", action: "actions" },
            user: [
                { stt: "1", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "2", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "3", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Banned", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "4", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "5", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "6", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Banned", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "7", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "8", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "9", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "10", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } }
            ]
        }
    ]

    const handleAddManager = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading)
        const data = account;
        await addManagerApi(data);
        setLoading(false);
    };

    const [account, setAccount] = useState({
        fullName: "",
        email: "",
        phone: "",
        userName: "",
        password: "",
        cinemaId: ""
    })

    const handleSelectChange = (selectedValue) => {
        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        setAccount({ ...account, cinemaId: selectedId })
    };

    const [allCinema, setAllCinema] = useState([])

    const { getAllCinemaApi } = CinemaService()


    const handleGetCinema = async () => {
        let res = await getAllCinemaApi()
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllCinema(res.data.result.content)
        }
    }

    useEffect(() => {
        handleGetCinema()
    }, []);
    const nameCinema = allCinema.map(item => item.cinemaName)
    return (
        <div>
            <div className='px-4'>
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
                                        <SelectMenu onSelectChange={handleSelectChange} items={nameCinema} />
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

                <div>
                    <div className='px-3'>
                        <div className=''>
                            {
                                listUser.map((user) => (
                                    <table className='mt-6 w-full'>
                                        <thead className=''>
                                            <tr>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.stt}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.info}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.username}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.role}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.status}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.created}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.login}</th>
                                                <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.action}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                user.user.map((item) => (
                                                    <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                        <td className='text-start font-medium px-5 py-4'>{item.stt}</td>
                                                        <td className='text-start font-medium px-5 py-4'>
                                                            <div className='flex items-center'>
                                                                <div div className='pr-2' >
                                                                    <item.info.iAvatar className="h-16 w-16 text-emerald-600" />
                                                                </div >
                                                                <div>
                                                                    <h3>{item.info.iName}</h3>
                                                                    <p className='font-normal'>Email: {item.info.iEmail}</p>
                                                                    <span className='font-normal'>Sdt: {item.info.iPhone}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-start font-medium px-5 py-4'>{item.username}</td>
                                                        <td className='text-start font-medium px-5 py-4'>{item.role}</td>
                                                        <td className={`${item.status === "Approved" ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{item.status}</td>
                                                        <td className='text-start font-medium px-5 py-4'>{item.created}</td>
                                                        <td className='text-start font-medium px-5 py-4'>{item.login}</td>
                                                        <td className='text-start font-medium px-5 py-4'>
                                                            <div className='flex items-center'>
                                                                <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                                    <item.action.aChange className='h-4 w-4 text-emerald-600' />
                                                                </button>
                                                                <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                    <item.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                                </a>
                                                                <button className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                                    <item.action.aDelete className='h-4 w-4 text-red-600' />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUser
