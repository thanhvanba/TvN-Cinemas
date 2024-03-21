import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../../../service/UserService';
import AdminService from '../../../../service/AdminService';
// import ManagerService from '../../../service/ManagerService';
// import CinemaService from '../../../service/CinemaService';
// import './index.css'
// import { LoginContext } from '../../../context/LoginContext';
const AddItem = () => {
    // const { item } = useParams()
    // const { user } = useContext(LoginContext)
    const [loading, setLoading] = useState(false);
    // const [tabIndex, setTabIndex] = useState(0);
    // const [imageURL, setImageURL] = useState(null);
    const { pathname } = useLocation()
    console.log("🚀 ~ pathname:", pathname)
    const { foodId, cinemaId } = useParams()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const { getOneFoodApi, getOneCinemaApi } = UserService()
    const { addCinemaApi, addFoodApi, updateCinemaApi, updateFoodApi } = AdminService()
    // const { addRoomApi } = ManagerService()

    // const handleTabChange = () => {
    //     if (item === "cinema" || cinemaId || pathname === `/admin/update-item/food/${foodId}` || pathname === `/admin/update-item/cinema/${cinemaId}`) {
    //         setTabIndex(0);
    //     } else if (item === "food" || foodId) {
    //         setTabIndex(1);
    //     } else if (item === "room") {
    //         setTabIndex(2);
    //     }
    // };

    // const [cinema, setCinema] = useState({
    //     cinemaName: "",
    //     location: "",
    //     desc: "",
    //     urlLocation: ""
    // })
    const [food, setFood] = useState({
        name: "",
        price: "",
        foodType: "",
        status: null
    })

    // const [oneFood, setOneFood] = useState({
    //     foodId: "",
    //     name: "",
    //     price: "",
    //     foodType: "",
    //     status: null
    // })

    const handleGetOneFood = async () => {
        let resFood = await getOneFoodApi(foodId)
        if (resFood && resFood.data && resFood.data.result) {
            setFood(resFood.data.result)
        }
    }
    // // const handleFileChange = (e) => {
    // //     const selectedFile = e.target.files[0];
    // //     readAndDisplayFile(selectedFile);
    // // };
    // // const readAndDisplayFile = (file) => {
    // //     const reader = new FileReader();
    // //     reader.onloadend = () => {
    // //         setImageURL(reader.result);
    // //         setMovie((prevMovie) => ({
    // //             ...prevMovie,
    // //             poster: file,
    // //         }));
    // //     };
    // //     reader.readAsDataURL(file);
    // // };


    const nameFoods = ["BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = food;
        await addFoodApi(data);
        changeTab("/admin/list-food")
        setLoading(false);
    };
    const handleUpdateFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = food;
        await updateFoodApi(data, foodId);
        changeTab("/admin/list-food")
        setLoading(false);
    };

    const handleSelectChange = (selectedValue) => {
        setFood((prevType) => ({ ...prevType, foodType: selectedValue }));
    };

    useEffect(() => {
        if (pathname === "/admin/add-item/food") {
            setFood({
                name: "",
                price: "",
                foodType: "",
                status: null
            })
        }
    }, [pathname]);

    useEffect(() => {
        foodId && handleGetOneFood()
    }, [foodId]);

    return (
        <div >
            <div className='py-6 border-b-2 font-semibold text-lg text-green-600'>
                {pathname === '/admin/add-item/food' ? <p>Thêm sản phẩm</p> : <p>Cập nhật sản phẩm</p>}
            </div>
            <div>
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
                                        className="bg-slate-100 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                    >
                                        Chọn một tập tin
                                    </label>
                                </div>
                            </div>
                            <form className='px-4 w-[80%]' id='formAddCinema' onSubmit={pathname === "/admin/add-item/food" ? handleAddFood : handleUpdateFood} action="">
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
                                        &nbsp;{pathname === '/admin/add-item/food' ? <span>Thêm sản phẩm</span> : <span>Lưu thay đổi</span>}
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
export default AddItem