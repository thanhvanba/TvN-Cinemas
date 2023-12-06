import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AdminService from '../../../service/AdminService'
import CinemaService from '../../../service/CinemaService';
import './index.css'
const AddItem = () => {
    const { item } = useParams()
    
    const [loading, setLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
      }

    const { addCinemaApi, addFoodApi, addRoomApi } = AdminService()

    const handleTabChange = () => {
        if (item === "cinema") {
            setTabIndex(0);
        } else if (item === "food") {
            setTabIndex(1);
        } else if (item === "room") {
            setTabIndex(2);
        }
    };

    const [cinema, setCinema] = useState({
        cinemaName: "",
        location: "",
        desc: "",
        urlLocation: ""
    })
    const handleAddCinema = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = cinema;
        await addCinemaApi(data);
        setLoading(false);
    };

    const [food, setFood] = useState({
        name: "",
        price: "",
        foodType: ""
    })
    const nameFoods = ["BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = food;
        await addFoodApi(data);
        setLoading(false);
    };

    const [room, setRoom] = useState({
        cinemaId: "",
        roomName: ""
    })
    const handleAddRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = room;
        await addRoomApi(data);
        setLoading(false);
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
        handleTabChange()
    }, [item]);
    const nameCinema = allCinema.map(item => item.cinemaName)

    const handleSelectChange = (selectedValue) => {
        setFood((prevType) => ({ ...prevType, foodType: selectedValue }));

        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        setRoom({ ...room, cinemaId: selectedId })
    };

    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>Manager Cinema</h2>
                </div>
                <Tabs selectedIndex={tabIndex}>
                    <TabList className='py-6 border-b-2'>
                        <Tab onClick={() => changeTab(`/admin/add-item/cinema`)} id="add-cinema-tab">Add Cinema</Tab>
                        <Tab onClick={() => changeTab(`/admin/add-item/food`)} id="add-food-tab">Add Food</Tab>
                        <Tab onClick={() => changeTab(`/admin/add-item/room`)} id="add-room-tab">Add Room</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="w-full py-8">
                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                <form id='formAddCinema' onSubmit={handleAddCinema} action="">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            // value={account.fullName}
                                            onChange={e => setCinema({ ...cinema, cinemaName: e.target.value })}
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
                                            Location
                                        </label>
                                        <input
                                            // value={account.email}
                                            onChange={e => { setCinema({ ...cinema, location: e.target.value }); }}
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
                                            Description
                                        </label>
                                        <textarea
                                            onChange={e => setCinema({ ...cinema, desc: e.target.value })}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            placeholder=""
                                            rows={5}
                                        />
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Location URL
                                        </label>
                                        <input
                                            // value={account.userName}
                                            onChange={e => setCinema({ ...cinema, urlLocation: e.target.value })} type="text"
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
                                            &nbsp;Add Cinema
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="w-full py-8">
                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                <form id='formAddCinema' onSubmit={handleAddFood} action="">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={e => setFood({ ...food, name: e.target.value })}
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
                                            Price
                                        </label>
                                        <input
                                            onChange={e => { setFood({ ...food, price: e.target.value }); }}
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
                                            Food type
                                        </label>
                                        <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            className="w-[12%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                            type='submit'
                                            disabled={loading}
                                        >
                                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                            &nbsp;Add Food
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="w-full py-8">
                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                <form id='formAddCinema' onSubmit={handleAddRoom} action="">
                                    <div className="relative my-4">
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
                                            Name
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
                                            &nbsp;Add Room
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>



            </div>
        </div >
    )
}
export default AddItem