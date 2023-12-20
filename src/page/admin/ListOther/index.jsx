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
const ListOther = () => {
    const { item } = useParams()
    const { user } = useContext(LoginContext)
    const { pathname } = useLocation()
    const [loading, setLoading] = useState(false);
    const [allFood, setAllFood] = useState([])
    const [allRoom, setAllRoom] = useState([])
    console.log("🚀 ~ file: index.jsx:26 ~ ListOther ~ allRoom:", allRoom)
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

    const { addCinemaApi, addFoodApi, getAllRoomApi, deleteFoodApi } = AdminService()
    const { getFoodApi } = UserService()
    const { getAllRoomByManagerApi, changeStatusRoomApi, deleteRoomApi, } = ManagerService()


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

    // const listTicket = {
    //     header: { stt: "STT", info: "Basic info", username: "user name", role: "role", status: "status", created: "created date", login: "last login", action: "actions" },
    //     user: allTicket,
    //     action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon },
    // }
    const handleChangeStatus = async (roomId) => {
        await changeStatusRoomApi(roomId);

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

        const updatedRooms = allRoom.filter((room) => room.roomId !== roomId);

        setAllRoom(updatedRooms);
    };
    const handleDeleteFood = async (foodId) => {
        await deleteFoodApi(foodId);

        const updatedFoos = allFood.filter((food) => food.foodId !== foodId);

        setAllFood(updatedFoods);
    };

    const handleGetItems = async () => {

        let resFood = await getFoodApi()
        if (resFood && resFood.data && resFood.data.result) {
            setAllFood(resFood.data.result)
        }

        let resRoom = (user.role === "ADMIN") ? await getAllRoomApi() : await getAllRoomByManagerApi()
        if (resRoom && resRoom.data && resRoom.data.result && resRoom.data.result.content) {
            setAllRoom(resRoom.data.result.content)
        }
    }
    useEffect(() => {
        handleGetItems()
    }, [item]);

    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>Manager</h2>
                </div>
                <Tabs>
                    <TabList className='py-6 border-b-2'>

                        <Tab id="add-cinema-tab">Room</Tab>
                        <Tab id="add-food-tab">Food</Tab>
                        <Tab id="add-room-tab">Ticket</Tab>

                    </TabList>
                    <TabPanel>
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
                                                    {/* <button onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/room/${item.roomId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                        <listRoom.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                    </button> */}
                                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleDeleteRoom(item.roomId) }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                        <listRoom.action.aDelete className='h-4 w-4 text-red-600' />
                                                    </button>
                                                </div>
                                            </td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
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
                                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleDeleteFood(item.foodId) }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                        <listFood.action.aDelete className='h-4 w-4 text-red-600' />
                                                    </button>
                                                </div>
                                            </td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </TabPanel>

                    <TabPanel>

                    </TabPanel>
                </Tabs>



            </div>
        </div >
    )
}
export default ListOther