import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../../../../components/Loading'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { XMarkIcon, ChevronRightIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import AdminService from '../../../../../service/AdminService';
import CreateSeat from '../../../../../components/CreateSeat';

import { Armchair, Plus } from 'lucide-react';
import ManagerService from '../../../../../service/ManagerService';
import { LoginContext } from '../../../../../context/LoginContext';

const DetailRoom = () => {
    const { getOneRoomApi, getRoomeByCinemaApi, addRoomAdminApi, updateRoomAdminApi } = AdminService()
    const { addRoomApi, getOneRoomManagerApi, getAllRoomByManagerApi, updateRoomManagerApi } = ManagerService()

    const { user } = useContext(LoginContext);
    const location = useLocation()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { cinemaId, cinemaName } = location.state || {}
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [modalStates, setModalStates] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(roomId);
    const [allRoom, setAllRoom] = useState([]);
    const [seatMap, setSeatmap] = useState({
        rowSeat: "",
        colSeat: "",
    })
    const [room, setRoom] = useState({
        cinema: {
            cinemaId: "",
            location: "",
            cinemaName: "",
            desc: "",
            status: true,
            urlLocation: null
        },
        roomName: "",
        rowSeat: "",
        colSeat: "",
    })
    const generateSeatData = CreateSeat(room.rowSeat, room.colSeat);
    const seatData = generateSeatData();
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!seatMap.rowSeat) newErrors.rowSeat = 'Vui lòng nhập số hàng!';
        else if (isNaN(seatMap.rowSeat)) newErrors.rowSeat = 'Vui lòng nhập đúng định dạng là số!';
        if (!seatMap.colSeat) newErrors.colSeat = 'Vui lòng nhập số ghế mỗi hàng!';
        else if (isNaN(seatMap.colSeat)) newErrors.colSeat = 'Vui lòng nhập đúng định dạng là số!';
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
    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = {
                roomName: room.roomName,
                rowSeat: seatMap.rowSeat,
                colSeat: seatMap.colSeat
            };
            await updateRoomManagerApi(data, roomId)
            setModalStates(false)
        }

    };
    const handleGetOneRoom = async (roomId) => {

        setLoading(true)
        const resRoom = user.role === "ADMIN" ? await getOneRoomApi(roomId) : await getOneRoomManagerApi(roomId)
        if (resRoom && resRoom.data && resRoom.data.result) {
            setRoom(resRoom.data.result)
            setSeatmap(prevState => ({ ...prevState, rowSeat: resRoom.data.result.rowSeat }));
            setSeatmap(prevState => ({ ...prevState, colSeat: resRoom.data.result.colSeat }));
        }
        setLoading(false)
    }

    const handleGetRoomByCinema = async () => {
        let resR = user.role === "ADMIN" ? await getRoomeByCinemaApi(cinemaId) : await getAllRoomByManagerApi()
        if (resR && resR.data && resR.data.result.content) {
            setAllRoom(resR.data.result.content.reverse());
        }
    }

    useEffect(() => {
        handleGetOneRoom(roomId)
        handleGetRoomByCinema()
        setModalStates(false)
    }, [roomId])
    return (
        <div className='px-4'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 className='cursor-default font-medium text-2xl'>Rạp</h2>
                    {user.role === "ADMIN" &&
                        <>
                            <ChevronRightIcon className='px-1 h-6' />
                            <h2 onClick={() => { navigate(-1) }} className='cursor-pointer font-medium text-2xl'>{cinemaName}</h2>
                        </>
                    }
                    <ChevronRightIcon className='px-1 h-6' />
                    <h2 className='cursor-default text-xl'>Chi tiết phòng</h2>
                </div>
            </div>
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                {loading && <Loading />}
            </div>
            {!loading &&
                <div className='flex'>
                    <div className='w-11/12 mr-4'>
                        <div className='bg-slate-100 shadow-inner p-4 rounded-lg'>
                            <div className='font-semibold text-4xl pb-2 text-emerald-600'>{room.cinema && room.cinema.cinemaName && room.cinema.cinemaName}</div>
                            <div className='flex'>
                                <p className='pr-4 font-medium'>Địa chỉ:</p>
                                <span>{room.cinema.location}</span>
                            </div>
                            <div className='flex'>
                                <p className='pr-4 font-medium'>Mô tả:</p>
                                <span>{room.cinema.desc}</span>
                            </div>
                            <div className='flex'>
                                <p className='pr-4 font-medium'>Phòng:</p>
                                {toggle ?
                                    <input
                                        onChange={e => setRoom({ ...room, roomName: e.target.value })}
                                        type="text"
                                        className="inline px-2 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        value={room.roomName}
                                    />
                                    : <span>{room.roomName}</span>
                                }
                                <span className='pl-2'> - {room.rowSeat * room.colSeat} ghế</span>
                                {!toggle ?
                                    <p
                                        className='underline decoration-solid cursor-pointer hover:text-blue-500 px-4'
                                        onClick={() => setToggle(true)}
                                    >
                                        Chỉnh sửa
                                    </p>
                                    : <p
                                        className='underline decoration-solid cursor-pointer hover:text-blue-500 px-4'
                                        onClick={handleCreateRoom}
                                    >
                                        Lưu
                                    </p>
                                }
                            </div>
                        </div>

                        <div className='bg-slate-100 shadow-inner mt-8 p-4'>
                            <div className='flex justify-between relative'>
                                <h3 className='font-medium text-lg'>Sơ đồ ghế</h3>
                                <div className='p-1 border-2 rounded-xl shadow-inner' onClick={() => setModalStates(true)}>
                                    <WrenchScrewdriverIcon className='h-8 w-8 cursor-pointer opacity-80 hover:opacity-100 text-sky-800' />
                                </div>
                                {
                                    modalStates &&
                                    <div className='absolute left-1/4 top-1/2'>
                                        <div className='border-2 rounded-2xl w-96 bg-white shadow-2xl'>
                                            <div className='px-3 pt-4'>
                                                <h2 className='font-semibold text-3xl'>Tạo sơ đồ ghế</h2>
                                                <form className='px-4' id='formAddCinema' onSubmit={handleCreateRoom} action="">
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Số hàng <span className='text-red-600'>*</span>
                                                        </label>
                                                        <input
                                                            onChange={e => {
                                                                setSeatmap({ ...seatMap, rowSeat: e.target.value })
                                                                clearError('rowSeat')
                                                            }}
                                                            type="text"
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            value={seatMap.rowSeat}
                                                        />
                                                        {errors.rowSeat && <p className="text-red-600">{errors.rowSeat}</p>}
                                                    </div>
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Ghế mỗi hàng <span className='text-red-600'>*</span>
                                                        </label>
                                                        <input
                                                            onChange={e => {
                                                                setSeatmap({ ...seatMap, colSeat: e.target.value })
                                                                clearError('colSeat')
                                                            }}
                                                            type="text"
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            value={seatMap.colSeat}
                                                        />
                                                        {errors.colSeat && <p className="text-red-600">{errors.colSeat}</p>}
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        <button
                                                            className="w-1/4 my-4 mr-3 text-[18px] rounded-xl hover:bg-neutral-400 hover:text-white text-white bg-neutral-300 py-2 transition-colors duration-300"
                                                            type='button'
                                                            onClick={() => setModalStates(false)}
                                                        >
                                                            Hủy
                                                        </button>
                                                        <button
                                                            className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-sky-800 text-white bg-sky-600 py-2 transition-colors duration-300"
                                                            type='submit'
                                                            disabled={loading['change']}
                                                        >
                                                            {/* {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                                            &nbsp;Tạo
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                room.rowSeat == 0 && room.colSeat == 0 ? <p className='text-sm font-light pl-4'>- Phòng hiện chưa có sơ đồ. Vui lòng tạo sơ đồ ghế mới !!!</p> :
                                    <div className={`grid grid-cols-3 gap-1 mx-auto py-4 shadow-black`}
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
                            }
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <span className='font-semibold text-lg pb-10'>Danh sách phòng chiếu khác</span>
                        {allRoom.map((room) => (
                            <div
                                onClick={() => {
                                    navigate(`/admin/room/${room.roomId}`, { state: { cinemaId: cinemaId, cinemaName: cinemaName } })
                                    setSelectedRoom(room.roomId)
                                }}
                                className={`${selectedRoom === room.roomId ? 'shadow-inner' : 'opacity-50'} text-center bg-slate-300 my-1 rounded-md py-2 cursor-pointer hover:opacity-100`}
                            >
                                Phòng {room.roomName}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailRoom
