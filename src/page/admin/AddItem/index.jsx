import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../../service/UserService';
import AdminService from '../../../service/AdminService'
import ManagerService from '../../../service/ManagerService';
import CinemaService from '../../../service/CinemaService';
import './index.css'
import { LoginContext } from '../../../context/LoginContext';
const AddItem = () => {
    const { item } = useParams()
    const { user } = useContext(LoginContext)
    const [loading, setLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [imageURL, setImageURL] = useState(null);
    const { pathname } = useLocation()
    const { foodId, cinemaId } = useParams()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const { getOneFoodApi, getOneCinemaApi } = UserService()
    const { addCinemaApi, addFoodApi, updateCinemaApi, updateFoodApi } = AdminService()
    const { addRoomApi } = ManagerService()

    const handleTabChange = () => {
        if (item === "cinema" || cinemaId || pathname === `/admin/update-item/food/${foodId}` || pathname === `/admin/update-item/cinema/${cinemaId}`) {
            setTabIndex(0);
        } else if (item === "food" || foodId) {
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
    const [food, setFood] = useState({
        name: "",
        price: "",
        foodType: ""
    })

    const [oneFood, setOneFood] = useState({
        foodId: "",
        name: "",
        price: "",
        foodType: "",
        status: null
    })
    const [oneCinema, setOneCinema] = useState({
        cinemaId: "",
        location: "",
        cinemaName: "",
        desc: "",
        status: true,
        urlLocation: ""
    })

    const handleGetOneFood = async () => {
        let resFood = await getOneFoodApi(foodId)
        if (resFood && resFood.data && resFood.data.result) {
            setOneFood(resFood.data.result)
        }
    }
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     readAndDisplayFile(selectedFile);
    // };
    // const readAndDisplayFile = (file) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setImageURL(reader.result);
    //         setMovie((prevMovie) => ({
    //             ...prevMovie,
    //             poster: file,
    //         }));
    //     };
    //     reader.readAsDataURL(file);
    // };
    const handleGetOneCinema = async () => {
        let resCinema = await getOneCinemaApi(cinemaId)
        if (resCinema && resCinema.data && resCinema.data.result) {
            setOneCinema(resCinema.data.result)
        }
    }
    const handleAddCinema = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = cinema;
        await addCinemaApi(data);
        changeTab("/admin/list-cinemas")
        setLoading(false);
    };
    const handleUpdateCinema = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = cinema;
        await updateCinemaApi(data, cinemaId);
        changeTab("/admin/list-cinemas")
        setLoading(false);
    };


    const nameFoods = ["BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = food;
        await addFoodApi(data);
        changeTab("/admin/list-other")
        setLoading(false);
    };
    const handleUpdateFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = food;
        await updateFoodApi(data, foodId);
        changeTab("/admin/list-other")
        setLoading(false);
    };
    const [room, setRoom] = useState({
        cinemaId: "",
        roomName: ""
    })
    const handleAddRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = { roomName: room.roomName };
        await addRoomApi(params);
        changeTab("/manager/list-other")
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

        // hadleGetOneFood()
    }, [item]);
    const nameCinema = allCinema.map(item => item.cinemaName)

    const handleSelectChange = (selectedValue) => {
        setFood((prevType) => ({ ...prevType, foodType: selectedValue }));

        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        setRoom({ ...room, cinemaId: selectedId })
    };

    useEffect(() => {
        if (pathname === "/admin/add-item/cinema") {
            setCinema({
                cinemaName: "",
                location: "",
                desc: "",
                urlLocation: ""
            })
            setOneCinema({
                cinemaId: "",
                status: true,
                cinemaName: "",
                location: "",
                desc: "",
                urlLocation: ""
            })
        }
        if (pathname === "/admin/add-item/food") {
            setFood({
                name: "",
                price: "",
                foodType: ""
            })
            setOneFood({
                foodId: "",
                name: "",
                price: "",
                foodType: "",
                status: null
            })
        }
        handleTabChange()
    }, [pathname]);

    useEffect(() => {
        cinemaId && handleGetOneCinema()
    }, [cinemaId]);
    useEffect(() => {
        foodId && handleGetOneFood()
    }, [foodId]);

    useEffect(() => {
        pathname !== "/admin/add-item/cinema" &&
            setCinema({
                ...cinema,
                cinemaName: oneCinema.cinemaName,
                location: oneCinema.location,
                desc: oneCinema.desc,
                urlLocation: oneCinema.urlLocation
            })
        setOneCinema(oneCinema)
    }, [oneCinema]);
    useEffect(() => {
        pathname !== "/admin/add-item/cinema" &&
            setFood({
                ...food,
                name: oneFood.name,
                price: oneFood.price,
                foodType: oneFood.foodType
            })
        setOneFood(oneFood)
    }, [oneFood]);

    const indexProp = user.role === "ADMIN" ? "selectedIndex" : "defaultIndex";
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>Quản lý rạp</h2>
                </div>
                <Tabs {...{ [indexProp]: tabIndex }} >

                    <TabList className='py-6 border-b-2'>
                        {user.role === "ADMIN" ? (
                            <>
                                {pathname === `/admin/update-item/cinema/${cinemaId}` ? (
                                    <Tab id="update-cinema-tab">Sửa thông tin rạp</Tab>
                                ) : pathname === `/admin/update-item/food/${foodId}` ? (
                                    <Tab id="update-food-tab">Sửa sản phẩm</Tab>
                                ) : (
                                    <>
                                        <Tab onClick={() => changeTab(`/admin/add-item/cinema`)} id="add-cinema-tab">
                                            Thêm rạp phim
                                        </Tab>
                                        <Tab onClick={() => changeTab(`/admin/add-item/food`)} id="add-food-tab">
                                            Thêm sản phẩm
                                        </Tab>
                                    </>
                                )}
                            </>
                        ) : (
                            <Tab onClick={() => changeTab(`/admin/add-item/room`)} id="add-room-tab">
                                Thêm phòng
                            </Tab>
                        )}
                    </TabList>

                    {user.role === "ADMIN" ?
                        <>
                            {pathname === `/admin/update-item/cinema/${cinemaId}` ? (
                                <TabPanel>
                                    <div className="w-full py-8">
                                        <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                            <form id='formAddCinema' onSubmit={handleUpdateCinema} action="">
                                                <div className="relative my-4">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900"
                                                    >
                                                        Tên rạp phim
                                                    </label>
                                                    <input
                                                        onChange={e => setCinema({ ...cinema, cinemaName: e.target.value })}
                                                        type="text"
                                                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        value={cinema.cinemaName}
                                                    />

                                                </div>
                                                <div className="relative my-4">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        // value={account.email}
                                                        onChange={e => { setCinema({ ...cinema, location: e.target.value }); }}
                                                        type="text"
                                                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        value={cinema.location}
                                                    />
                                                </div>
                                                <div className="relative my-4">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900"
                                                    >
                                                        Mô tả
                                                    </label>
                                                    <textarea
                                                        onChange={e => setCinema({ ...cinema, desc: e.target.value })}
                                                        type="text"
                                                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        value={cinema.desc}
                                                        rows={5}
                                                    />
                                                </div>
                                                <div className="relative my-4">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900"
                                                    >
                                                        URL
                                                    </label>
                                                    <input
                                                        // value={account.userName}
                                                        onChange={e => setCinema({ ...cinema, urlLocation: e.target.value })} type="text"
                                                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        value={cinema.urlLocation}
                                                    />
                                                </div>
                                                <div className='flex justify-end'>
                                                    <button
                                                        className="w-[12%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                                        type='submit'
                                                        disabled={loading}
                                                    >
                                                        {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                                        &nbsp;Lưu thay đổi
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </TabPanel>
                            ) : pathname === `/admin/update-item/food/${foodId}` ? (
                                <TabPanel>
                                    <div className="w-full py-8">
                                        <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                            <div className="flex">
                                                <div>
                                                    {/* {pathname !== `/admin/movie/${movieId}` ?
                                                    <div className="my-4 border">
                                                        <img src={imageURL} alt="Preview" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
                                                    </div> : */}
                                                    <div className='my-4 border'>
                                                        <img
                                                            className='w-96 h-80'
                                                        // src={movie.poster}
                                                        />
                                                    </div>
                                                    <div className='px-4'>
                                                        <input
                                                            // onChange={handleFileChange}
                                                            type="file"
                                                            className="hidden"
                                                            id="form_img-upload"
                                                        />
                                                        <label
                                                            htmlFor="form_img-upload"
                                                            className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                                        >
                                                            Chọn một tập tin
                                                        </label>
                                                    </div>
                                                </div>
                                                <form className='px-4 w-[80%]' id='formAddCinema' onSubmit={handleUpdateFood} action="">
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Tên sản phẩm
                                                        </label>
                                                        <input
                                                            onChange={e => setFood({ ...food, name: e.target.value })}
                                                            type="text"
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            value={food.name}
                                                        />
                                                    </div>
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Giá tiền
                                                        </label>
                                                        <input
                                                            onChange={e => { setFood({ ...food, price: e.target.value }); }}
                                                            type="text"
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            value={food.price}
                                                        />
                                                    </div>
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Loại sản phẩm
                                                        </label>
                                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                            {pathname === `/admin/update-item/food/${foodId}` ?
                                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={food.foodType} /> :
                                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"-------Select-------"} />}
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        <button
                                                            className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                                            type='submit'
                                                            disabled={loading}
                                                        >
                                                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                                            &nbsp;Lưu thay đổi
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            ) : (
                                <>
                                    <TabPanel>
                                        <div className="w-full py-8">
                                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                                <form id='formAddCinema' onSubmit={handleAddCinema} action="">
                                                    <div className="relative my-4">
                                                        {pathname === "/admin/add-item/cinema" ?
                                                            <>
                                                                <label
                                                                    htmlFor=""
                                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                                >
                                                                    Tên rạp phim
                                                                </label>
                                                                <input
                                                                    // value={account.fullName}
                                                                    onChange={e => setCinema({ ...cinema, cinemaName: e.target.value })}
                                                                    type="text"
                                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                    placeholder=""
                                                                />
                                                            </> :
                                                            <input
                                                                onChange={e => setCinema({ ...cinema, cinemaName: e.target.value })}
                                                                type="text"
                                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                placeholder=""
                                                            // value={coo.name}
                                                            />}
                                                    </div>
                                                    <div className="relative my-4">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            Địa chỉ
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
                                                            Mô tả
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
                                                            URL
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
                                                            &nbsp;Thêm rạp phim
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="w-full py-8">
                                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                                <div className='flex'>
                                                    <div>
                                                        {/* {pathname !== `/admin/movie/${movieId}` ?
                                                    <div className="my-4 border">
                                                        <img src={imageURL} alt="Preview" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
                                                    </div> : */}
                                                        <div className='my-4 border'>
                                                            <img
                                                                className='w-96 h-80'
                                                            // src={movie.poster}
                                                            />
                                                        </div>
                                                        <div className='px-4'>
                                                            <input
                                                                // onChange={handleFileChange}
                                                                type="file"
                                                                className="hidden"
                                                                id="form_img-upload"
                                                            />
                                                            <label
                                                                htmlFor="form_img-upload"
                                                                className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                                            >
                                                                Chọn một tập tin
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <form className='px-4 w-[80%]' id='formAddCinema' onSubmit={handleAddFood} action="">
                                                        <div className="relative my-4">
                                                            <label
                                                                htmlFor=""
                                                                className="block text-lg font-medium leading-6 text-gray-900"
                                                            >
                                                                Tên sản phẩm
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
                                                                Giá tiền
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
                                                                Loại sản phẩm
                                                            </label>
                                                            <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"-------Select-------"} />
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-end'>
                                                            <button
                                                                className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                                                type='submit'
                                                                disabled={loading}
                                                            >
                                                                {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                                                &nbsp;Thêm sản phẩm
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </>
                            )}


                        </> :
                        <TabPanel>
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
                        </TabPanel>}
                </Tabs>



            </div>
        </div >
    )
}
export default AddItem