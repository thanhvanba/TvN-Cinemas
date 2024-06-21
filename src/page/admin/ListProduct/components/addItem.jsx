import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../../../service/UserService';
import AdminService from '../../../../service/AdminService';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Loading from '../../../../components/Loading';
const AddItem = () => {
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState()
    const { pathname } = useLocation()
    const { foodId } = useParams()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const { getOneFoodApi, getOneCinemaApi } = UserService()
    const { addCinemaApi, addFoodApi, updateCinemaApi, updateFoodApi } = AdminService()
    const [food, setFood] = useState({
        name: "",
        image: {},
        // quantity: "",
        price: "",
        foodType: "",
        status: null
    })

    const handleGetOneFood = async () => {
        let resFood = await getOneFoodApi(foodId)
        if (resFood && resFood.data && resFood.data.result) {
            setFood(resFood.data.result)
        }
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        readAndDisplayFile(selectedFile);
    };
    const readAndDisplayFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
            setFood((prevFood) => ({
                ...prevFood,
                image: file,
            }));
        };
        reader.readAsDataURL(file);
        clearError('image')
    };


    const nameFoods = ["BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!/^\/(admin|manager)\/update-item/.test(pathname)) {
            if (!food.name) newErrors.name = 'Vui lòng nhập tên sản phẩm!';
            if (!food.image) newErrors.image = 'Vui lòng chọn hình ảnh!';
            if (!food.price) newErrors.price = 'Vui lòng nhập giá tiền!';
            else if (isNaN(food.price)) newErrors.price = 'Vui lòng nhập đúng định dạng là số!';
            if (!food.foodType) newErrors.foodType = 'Vui lòng chọn loại sản phẩm!';
        }
        if (isNaN(food.price)) newErrors.price = 'Vui lòng nhập đúng định dạng là số!';
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
    const handleAddFood = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = food;
            await addFoodApi(data);
            setLoading(false);
            changeTab("/admin/list-food")
        }
    };
    const handleUpdateFood = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = food;
            await updateFoodApi(data, foodId);
            setLoading(false);
            changeTab("/admin/list-food")
        }
    };

    const handleSelectChange = (selectedValue) => {
        setFood((prevType) => ({ ...prevType, foodType: selectedValue }));
        clearError('foodType')
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
        <div className='relative'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { navigate("/admin/list-food/") }} className='cursor-pointer font-medium text-2xl'>Quản lý sản phẩm</h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    {/^\/admin\/add-item\/food/.test(pathname) ?
                        <h2 className='cursor-default text-xl'>Thêm sản phẩm</h2>
                        : <h2 className='cursor-default text-xl'>Chỉnh sửa sản phẩm</h2>
                    }
                </div>
            </div>
            <div><div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                {loading && <Loading />}
            </div>
                {!loading &&
                    <div className="w-full py-8">
                        <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                            <div className="flex">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Ảnh {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                    </label>
                                    <div className='mb-4 border'>
                                        <img
                                            className='w-96 h-80'
                                            // src={movie.poster}
                                            src={imageURL ? imageURL : food.image} alt="Ảnh sản phẩm"
                                        />
                                    </div>
                                    <div className='px-4'>
                                        <input
                                            onChange={handleFileChange}
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
                                    {errors.image && <p className="text-red-600">{errors.image}</p>}
                                </div>
                                <form className='px-4 w-[80%]' id='formAddCinema' onSubmit={pathname === "/admin/add-item/food" ? handleAddFood : handleUpdateFood} action="">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Tên sản phẩm {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <input
                                            onChange={e => {
                                                setFood({ ...food, name: e.target.value })
                                                clearError('name')
                                            }}
                                            type="text"
                                            placeholder='Nhập tên sản phẩm'
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            value={food.name}
                                        />
                                        {errors.name && <p className="text-red-600">{errors.name}</p>}
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Giá tiền {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <input
                                            onChange={e => {
                                                setFood({ ...food, price: e.target.value });
                                                clearError('price')
                                            }}
                                            type="text"
                                            placeholder='Nhập giá tiền'
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            value={food.price}
                                        />
                                        {errors.price && <p className="text-red-600">{errors.price}</p>}
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Loại sản phẩm {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            {pathname === `/admin/update-item/food/${foodId}` ?
                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={food.foodType} /> :
                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"Chọn loại sản phẩm"} />}
                                        </div>
                                        {errors.foodType && <p className="text-red-600">{errors.foodType}</p>}
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
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
                }
            </div>

        </div >
    )
}
export default AddItem