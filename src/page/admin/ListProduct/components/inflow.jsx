import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import UserService from '../../../../service/UserService'
import AdminService from '../../../../service/AdminService'
import { LoginContext } from '../../../../context/LoginContext'
import ManagerService from '../../../../service/ManagerService'

const Inflow = ({ onToggle }) => {
    const { user } = useContext(LoginContext)
    const { getAllUserApi, getFoodAdminApi } = AdminService()
    const { getFoodApi, getUserInfoApi } = UserService()
    const { stockEntryApi } = ManagerService()
    const [loading, setLoading] = useState("")
    const [allFood, setAllFood] = useState([])
    const [cinemaId, setCinemaId] = useState("")
    const [product, setProduct] = useState({
        foodId: "",
        imgProduct: '',
        quantity: '',
        purchasePrice: '',
        supplier: "",
    })

    const handleGetItems = async (foodType) => {
        let id = cinemaId && cinemaId
        if (user.role === "MANAGER" && cinemaId === '') {
            let resInfo = await getUserInfoApi();
            if (resInfo && resInfo.data && resInfo.data.result && resInfo.data.result) {
                setCinemaId(resInfo.data.result.cinema.cinemaId)
                id = resInfo.data.result.cinema.cinemaId
            }
        }
        let resFood = user.role === "ADMIN" ? await getFoodAdminApi(foodType) : await getFoodApi(foodType, '', '', id)
        if (resFood && resFood.data && resFood.data.result.content) {
            setAllFood(resFood.data.result.content)
        }
    }
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!product.foodId) newErrors.foodType = 'Vui lòng chọn loại sản phẩm!';
        if (!product.foodId) newErrors.food = 'Vui lòng chọn sản phẩm!';
        if (!product.quantity) newErrors.quantity = 'Vui lòng nhập số lượng!';
        else if (isNaN(product.quantity)) newErrors.quantity = 'Vui lòng nhập đúng định dạng là số!';
        if (!product.purchasePrice) newErrors.purchasePrice = 'Vui lòng nhập giá nhập hàng!';
        else if (isNaN(product.purchasePrice)) newErrors.purchasePrice = 'Vui lòng nhập đúng định dạng là số!';
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
    const handleStockEntry = async () => {
        if (validate()) {
            setLoading(true)
            await stockEntryApi(product)
            onToggle(false)
            setLoading(false)
        }
    }

    const nameFoods = ["BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const listNameFood = allFood.map(item => item.name)
    const handleSelectChange = (selectedValue) => {
        handleGetItems(selectedValue)
        clearError('foodType')
    }
    const handleSelectFood = (selectedValue) => {
        const food = allFood.find(food => food.name === selectedValue)
        setProduct({ ...product, foodId: food.foodId, imgProduct: food.image })
        clearError('food')
    }
    return (
        <div className='flex justify-center items-center bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-20'>
            <div className='relative rounded-xl bg-slate-100 w-1/2 z-10'>
                <button
                    type="button"
                    className="absolute top-1 right-1 z-50"
                >
                    <span className="sr-only">Close menu</span>
                    <div
                        className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                        onClick={() => onToggle(false)}
                    >
                        <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                    </div>
                </button>
                <h2 className='text-xl font-medium opacity-90 uppercase border-b-2 border-gray-950 py-2 px-4'>Nhập sản phẩm</h2>
                <div className='flex px-8 py-2'>
                    <div className="my-4">
                        <img src={product.imgProduct} alt="Preview" className="md:w-44 md:h-60 lg:h-72 lg:w-52 border" />
                    </div>

                    <form className='pl-4 w-[80%]' id='formAddCinema' onSubmit='' action="">
                        <div className="relative my-4 flex justify-between">
                            <div className='w-2/5'>
                                <label
                                    htmlFor=""
                                    className="block text-lg font-medium leading-6 text-gray-900"
                                >
                                    Loại sản phẩm <span className='text-red-600'>*</span>
                                </label>
                                <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                    <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"Chọn loại sản phẩm"} />
                                </div>
                                {errors.foodType && <p className="text-red-600">{errors.foodType}</p>}
                            </div>
                            <div className='w-1/2'>
                                <label
                                    htmlFor=""
                                    className="block text-lg font-medium leading-6 text-gray-900"
                                >
                                    Tên sản phẩm <span className='text-red-600'>*</span>
                                </label>
                                <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                    <SelectMenu onSelectChange={handleSelectFood} items={listNameFood} content={"Chọn sản phẩm"} />
                                </div>
                                {errors.food && <p className="text-red-600">{errors.food}</p>}
                            </div>
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Số lượng <span className='text-red-600'>*</span>
                            </label>
                            <input
                                onChange={e => {
                                    setProduct({ ...product, quantity: e.target.value });
                                    clearError('quantity')
                                }}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            />
                            {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Giá nhập <span className='text-red-600'>*</span>
                            </label>
                            <input
                                onChange={e => {
                                    setProduct({ ...product, purchasePrice: e.target.value });
                                    clearError('purchasePrice')
                                }}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            />
                            {errors.purchasePrice && <p className="text-red-600">{errors.purchasePrice}</p>}
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Nhà cung cấp
                            </label>
                            <input
                                onChange={e => { setProduct({ ...product, supplier: e.target.value }); }}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className="w-1/4 text-[18px] mt-4 rounded-xl hover:bg-green-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                type='button'
                                disabled={loading}
                                onClick={handleStockEntry}
                            >
                                {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                &nbsp;<span>Nhập</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Inflow
