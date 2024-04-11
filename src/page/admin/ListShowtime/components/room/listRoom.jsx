import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import AdminService from '../../../../../service/AdminService'
import ManagerService from '../../../../../service/ManagerService';

import TruncatedContent from '../../../../../utils/TruncatedContent'
import { LoginContext } from '../../../../../context/LoginContext';

import Pagination from '../../../../../components/Pagination'
import ModalComponent from '../../../../../utils/Modal';
import Loading from '../../../../../components/Loading';
import Search from '../../../../../components/Search';

const ListRoom = () => {
    const { user } = useContext(LoginContext)
    const location = useLocation()
    const { cinemaId, cinemaName } = location.state || {}
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );
    const [modalStates, setModalStates] = useState({});
    const [allRoom, setAllRoom] = useState([])

    const { getAllRoomApi, deleteFoodApi, getAllTicketApi, getAllUserApi, deleteRoomAdminApi, getRoomeByCinemaApi } = AdminService()
    const { getAllRoomByManagerApi, changeStatusRoomApi, deleteRoomApi, getAllTicketByManagerApi } = ManagerService()


    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const listRoom = {
        header: { stt: "STT", roomName: "phòng", cinema: "Thông tin rạp", status: "Trạng thái", action: "Action" },
        rooms: allRoom,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
    }
    const handleChangeStatus = async (roomId) => {
        await changeStatusRoomApi(roomId);
        handleGetItems(currentPage)
        const updatedRooms = allRoom.map((room) => {
            if (room.roomId === roomId) {
                return { ...room, delete: !room.delete };
            }
            return room;
        });

        setAllRoom(updatedRooms);
    };
    const handleDeleteRoom = async (roomId) => {
        await deleteRoomApi(roomId);
        handleGetItems(currentPage)
        const updatedRooms = allRoom.filter((room) => room.roomId !== roomId);

        setAllRoom(updatedRooms);
    };
    const handleGetItems = async (pageNumber) => {
        setLoading(true)
        let resRoom = (user.role === "ADMIN") ? await getRoomeByCinemaApi(cinemaId, pageNumber, 6) : await getAllRoomByManagerApi()
        setLoading(false)
        if (resRoom && resRoom.data && resRoom.data.result.content) {
            setAllRoom(resRoom.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: resRoom.data.result.pageSize,
                totalPages: resRoom.data.result.totalPages,
                totalElements: resRoom.data.result.totalElements
            }));
        }
    }
    const handleOpenModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: true }));
    };
    const handleCloseModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: false }));
    };

    useEffect(() => {
        handleGetItems(pagination.pageNumber)
    }, []);

    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <div className='flex items-center'>
                        <h2 onClick={() => { navigate("/admin/cinema/") }} className='cursor-pointer font-medium text-2xl'>Rạp</h2>
                        <ChevronRightIcon className='px-1 h-6' />
                        <h2 onClick={() => { navigate(-1) }} className='cursor-pointer font-medium text-2xl'>{cinemaName}</h2>
                        <ChevronRightIcon className='px-1 h-6' />
                        <h2 className='cursor-default text-xl'>Danh sách phòng</h2>
                    </div>
                    {
                        <div className='flex items-center'>
                            <button
                                className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                                onClick={() => navigate('/admin/add-item/room', { state: { cinemaName: cinemaName } })}
                                type='button'
                            >
                                Thêm phòng
                            </button>
                        </div>

                    }
                </div>
                <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                    {loading && <Loading />}
                </div>
                {!loading &&
                    <div className='h-full'>
                        <div className='flex justify-end items-center py-4 pr-4'>
                            <div className="border-2 rounded-xl ">
                                <Search />
                            </div>
                        </div>
                        <div>
                            <table className='mt-6 w-full'>
                                <thead className=''>
                                    <tr>
                                        <th className='text-sm text-center font-light px-5 pb-4 uppercase'>{listRoom.header.stt}</th>
                                        <th className='text-sm text-center font-light px-5 pb-4 uppercase'>{listRoom.header.roomName}</th>
                                        <th className='text-sm text-center font-light px-5 pb-4 uppercase'>{listRoom.header.cinema}</th>
                                        {<th className='text-sm text-center font-light px-5 pb-4 uppercase w-[120px]'>{listRoom.header.status}</th>}
                                        {<th className='text-sm text-center font-light px-5 pb-4 uppercase'>{listRoom.header.action}</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listRoom.rooms.map((item, index) => (
                                            <tr
                                                onClick={() => { navigate(`/admin/room/${item.roomId}`, { state: { cinemaId: item.cinema.cinemaId, cinemaName: cinemaName } }) }}
                                                className='border-b-2 border-slate-200 hover:bg-slate-200'
                                            >
                                                <td className='text-center font-medium px-5 py-4'>{index + 1}</td>
                                                <td className='text-center font-medium px-5 py-4'>{item.roomName}</td>
                                                <td className='text-start font-medium px-5 py-4'>
                                                    <div className='flex items-center'>
                                                        <div>
                                                            <h3>{item.cinema.cinemaName}</h3>
                                                            <p className='font-normal'><TruncatedContent content={item.cinema.location} maxLength={255} /></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                {<td className={`${!item.delete ? "text-green-600" : "text-red-600"} text-center font-medium px-5 py-4`}>{!item.delete ? "Sẵn sàng" : "Bảo trì"}</td>}
                                                {<td className='text-center font-medium px-5 py-4'>
                                                    <div className='flex items-center'>
                                                        <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.roomId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                            <listRoom.action.aChange className='h-4 w-4 text-emerald-600' />
                                                        </button>
                                                        <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.roomId) }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                            <listRoom.action.aDelete className='h-4 w-4 text-red-600' />
                                                        </button>
                                                        <div>
                                                            {modalStates[item.roomId] && (
                                                                <ModalComponent
                                                                    isOpen={modalStates[item.roomId]}
                                                                    onClose={() => handleCloseModal(item.roomId)}
                                                                    onConfirm={() => handleDeleteRoom(item.roomId)}
                                                                    onCancel={() => handleCloseModal(item.roomId)}
                                                                    title='Xóa Phòng'
                                                                    content='Bạn có chắc chắn xóa phòng này ???'
                                                                    buttonName='Delete'
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetItems} />
                    </div>
                }
            </div>
        </div >
    )
}
export default ListRoom