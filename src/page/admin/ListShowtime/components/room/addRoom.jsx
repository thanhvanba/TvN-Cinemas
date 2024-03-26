import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ManagerService from '../../../../../service/ManagerService';
import CinemaService from '../../../../../service/CinemaService';
const AddRoom = () => {
    const { addRoomApi } = ManagerService()
    const { getAllCinemaApi } = CinemaService()

    const [loading, setLoading] = useState(false);
    const [allCinema, setAllCinema] = useState([])
    const location = useLocation()
    const { cinemaName } = location.state || {}

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const [room, setRoom] = useState({
        cinemaId: "",
        roomName: ""
    })
    const handleAddRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = { roomName: room.roomName };
        await addRoomApi(params);
        changeTab(-1)
        setLoading(false);
    };


    const handleGetCinema = async () => {
        let res = await getAllCinemaApi()
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllCinema(res.data.result.content)
        }
    }

    const nameCinema = allCinema.map(item => item.cinemaName)

    const handleSelectChange = (selectedValue) => {
        setFood((prevType) => ({ ...prevType, foodType: selectedValue }));
        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        setRoom({ ...room, cinemaId: selectedId })
    };
    
    useEffect(() => {
        handleGetCinema()
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
                        <h2 className='cursor-default text-xl'>Thêm phòng</h2>
                    </div>
                </div>
                <div className='py-6 border-b-2'>
                    <div onClick={() => changeTab(`/admin/add-item/room`)} id="add-room-tab">
                        Thêm phòng
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
                                        Tên rạp
                                    </label>
                                    <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                        <SelectMenu onSelectChange={handleSelectChange} items={nameCinema} content={"-------Select-------"} />
                                    </div>
                                </div>
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
                                <div className='flex justify-end'>
                                    <button
                                        className="w-[12%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
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