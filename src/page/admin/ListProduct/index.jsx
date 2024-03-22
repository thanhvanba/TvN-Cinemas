import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AdminService from '../../../service/AdminService'
import UserService from '../../../service/UserService';
import ManagerService from '../../../service/ManagerService';

import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent'
import { LoginContext } from '../../../context/LoginContext';
import useLoadingState from '../../../hook/UseLoadingState';

import Pagination from '../../../components/Pagination'
import ModalComponent from '../../../utils/Modal';
import FormatDataTime from '../../../utils/FormatDataTime';
import Loading from '../../../components/Loading';
import Search from '../../../components/Search';
import FoodItems from './components/foodItems';

import popcorn from '../../../images/popcorn.png'
import pnpegg from '../../../images/pngegg.png'
import AddItem from './components/addItem';
import Inflow from './components/inflow';
import Button from './components/button';

const ListProduct = () => {
    const { item } = useParams()
    const { user } = useContext(LoginContext)
    const { pathname } = useLocation()
    const { loading, setLoading } = useLoadingState(false);
    const [toggle, setToggle] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [modalStates, setModalStates] = useState({});
    const [allFood, setAllFood] = useState([])
    const [allRoom, setAllRoom] = useState([])
    const [allUser, setAllUser] = useState([])
    const [allTicket, setAllTicket] = useState([])
    const [food, setFood] = useState({
        name: "",
        price: "",
        foodType: ""
    })
    const [room, setRoom] = useState({
        cinemaId: "",
        roomName: ""
    })

    const { getAllRoomApi, deleteFoodApi, getAllTicketApi, getAllUserApi } = AdminService()
    const { getFoodApi } = UserService()
    const { getAllRoomByManagerApi, changeStatusRoomApi, deleteRoomApi, getAllTicketByManagerApi } = ManagerService()


    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const listFood = {
        header: { stt: "STT", name: "Name", price: "Price", foodType: "Type", status: "Status", action: "Action" },
        foods: allFood,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
    }
    const listRoom = {
        header: { stt: "STT", roomName: "Name", cinema: "Cinema Info", status: "Status", action: "Action" },
        rooms: allRoom,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
    }
    const listTicket = {
        header: { stt: "STT", movieName: "Movie", cinemaName: "Cinema", showtime: "Showtime", ticketPrice: "Price", createAt: "CreateAt", user: "User" },
        tickets: allTicket,
    }
    // const handleChangeStatus = async (roomId) => {
    //     await changeStatusRoomApi(roomId);
    //     handleGetItems(currentPage)
    //     const updatedRooms = allRoom.map((room) => {
    //         if (room.roomId === roomId) {
    //             return { ...room, delete: !room.delete };
    //         }
    //         return room;
    //     });

    //     setAllRoom(updatedRooms);
    // };
    // const handleDeleteRoom = async (roomId) => {
    //     await deleteRoomApi(roomId);
    //     handleGetItems(currentPage)
    //     const updatedRooms = allRoom.filter((room) => room.roomId !== roomId);

    //     setAllRoom(updatedRooms);
    // };
    // const handleDeleteFood = async (foodId) => {
    //     await deleteFoodApi(foodId);
    //     handleGetItems(currentPage)
    //     const updatedFoods = allFood.filter((food) => food.foodId !== foodId);

    //     setAllFood(updatedFoods);
    // };
    const handleGetItems = async (foodType) => {
        // setCurrentPage(pageIndex)
        setLoading("food", true)
        let resFood = await getFoodApi(foodType)
        setLoading("food", false)
        if (resFood && resFood.data && resFood.data.result) {
            setAllFood(resFood.data.result)
        }

        // setLoading("room", true)
        // let resRoom = (user.role === "ADMIN") ? await getAllRoomApi() : await getAllRoomByManagerApi()
        // setLoading("room", false)
        // if (resRoom && resRoom.data && resRoom.data.result && resRoom.data.result.content) {
        //     setAllRoom(resRoom.data.result.content)
        // }

        // setLoading("ticket", true)
        // let resTicket = (user.role === "ADMIN") ? await getAllTicketApi(pageIndex, 7) : await getAllTicketByManagerApi(pageIndex, 7)
        // setLoading("ticket", false)
        // if (resTicket && resTicket.data && resTicket.data.result && resTicket.data.result.content) {
        //     setAllTicket(resTicket.data.result.content)
        // }

        // let resUser = await getAllUserApi()
        // if (resUser && resUser.data && resUser.data.result && resUser.data.result.content) {
        //     setAllUser(resUser.data.result.content)
        // }
    }
    // const handleOpenModal = (itemId) => {
    //     setModalStates((prevStates) => ({ ...prevStates, [itemId]: true }));
    // };
    // const handleCloseModal = (itemId) => {
    //     setModalStates((prevStates) => ({ ...prevStates, [itemId]: false }));
    // };
    // const getNameById = (userId) => {
    //     const user = allUser.find((user) => user.userId === userId);
    //     return user ? user.userName : null;
    // };


    const nameFoods = ["ALL", "BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const handleSelectChange = (selectedValue) => {
        selectedValue === "ALL" ? handleGetItems() : handleGetItems(selectedValue)
    }

    useEffect(() => {
        handleGetItems()
    }, [item]);

    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl cursor-default'>Quản lý sản phẩm</h2>
                </div>
                {
                    /^\/admin\/(add-item\/food|update-item\/food|food)/.test(pathname) ?
                        <AddItem /> :
                        <div className='border-2 h-screen'>
                            <div className='h-full'>
                                <div className='relative flex justify-end items-center p-4'>
                                    <div className="border-2 rounded-xl z-10">
                                        <Search />
                                    </div>
                                    <div className="inline-block z-10 pl-2 py-2 hover:bg-emerald-600 bg-slate-500 m-2 rounded-bl-full rounded-r-full text-gray-200 relative h-10 w-36">
                                        <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"ALL"} />
                                    </div>
                                    <div className='flex justify-center absolute top-0 w-full p-3'>
                                        <Button click={() => changeTab('/admin/add-item/food')} img={popcorn} title={"Thêm sản phẩm"} />
                                        <Button click={() => { setToggle(!toggle) }} img={pnpegg} title={"Nhập hàng"} />
                                    </div>
                                </div>
                                {toggle && <Inflow />}
                                <div className='grid grid-cols-5 gap-4 px-4'>
                                    <FoodItems listFood={allFood} />
                                </div>
                            </div>
                        </div>
                }






                {/* <Tabs>
                    <TabList className='py-6 border-b-2'>

                        <Tab id="add-cinema-tab">Phòng</Tab>
                        <Tab id="add-food-tab">Thức ăn</Tab>
                        {user.role === "ADMIN" && <Tab id="add-room-tab">Vé</Tab>}

                    </TabList>
                    <TabPanel>
                        <div className='relative'>
                            {
                                allRoom.length === 0 ?
                                    <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                                        {loading["room"] && <Loading />}
                                    </div>
                                    :
                                    <>
                                        <table className='mt-6 w-full'>
                                            <thead className=''>
                                                <tr>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listRoom.header.stt}</th>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listRoom.header.roomName}</th>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listRoom.header.cinema}</th>
                                                    {user.role === "MANAGER" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listRoom.header.status}</th>}
                                                    {user.role === "MANAGER" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listRoom.header.action}</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listRoom.rooms.map((item, index) => (
                                                        <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                            <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                                                            <td className='text-start font-medium px-5 py-4'>{item.roomName}</td>
                                                            <td className='text-start font-medium px-5 py-4'>
                                                                <div className='flex items-center'>
                                                                    <div>
                                                                        <h3>{item.cinema.cinemaName}</h3>
                                                                        <p className='font-normal'><TruncatedContent content={item.cinema.location} maxLength={255} /></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {user.role === "MANAGER" && <td className={`${!item.delete ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{!item.delete ? "Visible" : "Hidden"}</td>}
                                                            {user.role === "MANAGER" && <td className='text-start font-medium px-5 py-4'>
                                                                <div className='flex items-center'>
                                                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.roomId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                                        <listRoom.action.aChange className='h-4 w-4 text-emerald-600' />
                                                                    </button>
                                                                    <button onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/room/${item.roomId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                        <listRoom.action.aEdit className='h-4 w-4 text-cyan-600' />
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
                                        <Pagination pageNumber={currentPage} onPageChange={handleGetItems} />
                                    </>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='relative'>
                            {
                                allFood.length === 0 ?
                                    <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                                        {loading["food"] && <Loading />}
                                    </div>
                                    :
                                    <>
                                        <table className='mt-6 w-full'>
                                            <thead className=''>
                                                <tr>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.stt}</th>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.name}</th>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.price}</th>
                                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.foodType}</th>
                                                    {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.status}</th>}
                                                    {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listFood.header.action}</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listFood.foods.map((item, index) => (
                                                        <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                            <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                                                            <td className='text-start font-medium px-5 py-4'>{item.name}</td>
                                                            <td className='text-start font-medium px-5 py-4'>{format(item.price)}</td>
                                                            <td className='text-start font-medium px-5 py-4'>{item.foodType}</td>
                                                            {user.role === "ADMIN" && <td className={`${item.status ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{!item.delete ? "Active" : "In Active"}</td>}
                                                            {user.role == "ADMIN" && <td className='text-start font-medium px-5 py-4'>
                                                                <div className='flex items-center'>
                                                                    <button onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/food/${item.foodId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                        <listFood.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                                    </button>
                                                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.foodId) }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                                        <listFood.action.aDelete className='h-4 w-4 text-red-600' />
                                                                    </button>
                                                                    <div>
                                                                        {modalStates[item.foodId] && (
                                                                            <ModalComponent
                                                                                isOpen={modalStates[item.foodId]}
                                                                                onClose={() => handleCloseModal(item.foodId)}
                                                                                onConfirm={() => handleDeleteFood(item.foodId)}
                                                                                onCancel={() => handleCloseModal(item.foodId)}
                                                                                title='Xóa Bắp Nước'
                                                                                content='Bạn có chắc chắn xóa đồ dùng này ???'
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
                                        <Pagination pageNumber={currentPage} onPageChange={handleGetItems} />
                                    </>
                            }
                        </div>
                    </TabPanel>

                    {user.role === "ADMIN" &&
                        <TabPanel>
                            <div className='relative'>
                                {
                                    allTicket.length === 0 ?
                                        <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                                            {loading['ticket'] && <Loading />}
                                        </div>
                                        :
                                        <>
                                            <table className='mt-6 w-full'>
                                                <thead className=''>
                                                    <tr>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.stt}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.movieName}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.cinemaName}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.showtime}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.ticketPrice}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.createAt}</th>
                                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listTicket.header.user}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        listTicket.tickets.map((item, index) => (
                                                            <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                                <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{item.movieName}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{item.cinemaName}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.showtime).time} - Ngày {FormatDataTime(item.showtime).date}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{item.ticketPrice}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.createAt).time} {FormatDataTime(item.createAt).date}</td>
                                                                <td className='text-start font-medium px-5 py-4'>{getNameById(item.userId)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>

                                            </table>
                                            <Pagination pageNumber={currentPage} onPageChange={handleGetItems} />
                                        </>
                                }
                            </div>
                        </TabPanel>}
                </Tabs> */}
            </div>
        </div >
    )
}
export default ListProduct