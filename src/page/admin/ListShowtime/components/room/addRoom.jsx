import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ManagerService from '../../../../../service/ManagerService';
import CinemaService from '../../../../../service/CinemaService';
import AdminService from '../../../../../service/AdminService';
import { LoginContext } from '../../../../../context/LoginContext';
import CreateSeat from '../../../../../components/CreateSeat';
const AddRoom = () => {
    const { addRoomApi } = ManagerService()
    const { addRoomAdminApi } = AdminService()
    const { getAllCinemaApi } = CinemaService()

    const { user } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const { cinemaId, cinemaName } = location.state || {}

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const [room, setRoom] = useState({
        cinemaId: cinemaId || "",
        roomName: "",
        rowSeat: 0,
        colSeat: 0,
    })


    const generateSeatData = CreateSeat(room.rowSeat, room.colSeat);
    const seatData = generateSeatData();

    const handleAddRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = room
        user.role === "ADMIN" ? await addRoomAdminApi(data) : await addRoomApi(data);
        changeTab(-1)
        setLoading(false);
    };

    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <div className='flex items-center'>
                        <h2 className='cursor-default font-medium text-2xl'>Rạp</h2>
                        {user.role === "ADMIN" &&
                            <> <ChevronRightIcon className='px-1 h-6' />
                                <h2 onClick={() => { navigate(-1) }} className='cursor-pointer font-medium text-2xl'>{cinemaName}</h2>
                            </>
                        }
                        <ChevronRightIcon className='px-1 h-6' />
                        <h2 className='cursor-default text-xl'>Thêm phòng</h2>
                    </div>
                </div>
                <div>
                    <div className="w-full py-8">
                        <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                            <form id='formAddCinema' onSubmit={handleAddRoom} action="">
                                <div className="relative my-4">
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Tên phòng
                                    </label>
                                    <input
                                        onChange={e => setRoom({ ...room, roomName: e.target.value })}
                                        type="text"
                                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder=""
                                    />
                                </div>
                                <div className='flex'>
                                    <div className="relative my-4 mr-8">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Số hàng
                                        </label>
                                        <input
                                            onChange={e => setRoom({ ...room, rowSeat: e.target.value })}
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
                                            Số ghế mỗi hàng
                                        </label>
                                        <input
                                            onChange={e => setRoom({ ...room, colSeat: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className={`grid gap-1 mx-auto py-4 shadow-black`}
                                    style={{ gridTemplateColumns: `repeat(${room.colSeat}, minmax(0, 1fr))`, width: `${34 * room.colSeat}px` }}>
                                    {seatData.map(seat => (
                                        <div
                                            key={seat.id}
                                            className={`${seat.type} flex justify-center items-center text-slate-200 h-8 w-8 rounded-xl`}
                                        >
                                            {seat.type === "booked" ? <XMarkIcon className='text-slate-400 h-8' /> : seat.label}
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-end'>
                                    <button
                                        className="w-[12%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                        &nbsp;Thêm phòng
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default AddRoom