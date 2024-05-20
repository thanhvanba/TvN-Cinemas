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

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!room.roomName) newErrors.roomName = 'Vui lòng nhập tên phòng!';
        if (!room.rowSeat) newErrors.rowSeat = 'Vui lòng nhập số hàng!';
        else if (isNaN(room.rowSeat)) newErrors.rowSeat = 'Vui lòng nhập đúng định dạng là số!';
        if (!room.colSeat) newErrors.colSeat = 'Vui lòng nhập số ghế mỗi hàng!';
        else if (isNaN(room.colSeat)) newErrors.colSeat = 'Vui lòng nhập đúng định dạng là số!';
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
    const handleAddRoom = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = room
            user.role === "ADMIN" ? await addRoomAdminApi(data) : await addRoomApi(data);
            changeTab(-1)
            setLoading(false);
        }
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
                            <form id='formAddCinema' onSubmit={handleAddRoom}>
                                <div className='flex'>
                                    <div className='w-1/6'>
                                        <div className="relative my-4">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Tên phòng <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setRoom({ ...room, roomName: e.target.value })
                                                    clearError('roomName')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                            {errors.roomName && <p className="text-red-600">{errors.roomName}</p>}
                                        </div>
                                        <div className="relative my-4">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Số hàng <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setRoom({ ...room, rowSeat: e.target.value })
                                                    clearError('rowSeat')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                            {errors.rowSeat && <p className="text-red-600">{errors.rowSeat}</p>}
                                        </div>
                                        <div className="relative my-4">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Số ghế mỗi hàng <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setRoom({ ...room, colSeat: e.target.value })
                                                    clearError('colSeat')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder=""
                                            />
                                            {errors.colSeat && <p className="text-red-600">{errors.colSeat}</p>}
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