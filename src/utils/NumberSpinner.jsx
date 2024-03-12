import { useState, useEffect } from 'react'
import { XMarkIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import formatPrice from '../utils/ConvertStringFollowFormat'
import UserService from '../service/UserService'
// component number spiner
const NumberSpinner = ({ idPerItem, pricePerItem, listFoodBooking, setListFoodBooking, foods, setFoods }) => {
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { getFoodByIdApi } = UserService()
    const handleGetFoodById = async (foodId) => {
        let resFood = await getFoodByIdApi(foodId)
        if (resFood && resFood.data && resFood.data.result) {
            return resFood.data.result
        }
    }
    const decreaseQuantity = async () => {
        const newQuantity = quantity - 1
        if (newQuantity >= 0) {
            const indexToRemove = listFoodBooking.indexOf(idPerItem);
            let food = await handleGetFoodById(idPerItem)
            console.log("🚀 ~ decreaseQuantity ~ food:", food)
            const indexFoodToRemove = foods.findIndex(item => item.foodId === idPerItem);
            console.log("🚀 ~ decreaseQuantity ~ indexFoodToRemove:", indexFoodToRemove)
            setQuantity(newQuantity)
            setTotalPrice(newQuantity * pricePerItem)
            if (indexToRemove !== -1) {
                const updatedItems = [...listFoodBooking];
                updatedItems.splice(indexToRemove, 1);
                setListFoodBooking(updatedItems);
            }
            if (indexFoodToRemove !== -1) {
                const updatedFoods = [...foods];

                console.log("🚀 ~ decreaseQuantity ~ updatedFoods:", updatedFoods)
                updatedFoods.splice(indexFoodToRemove, 1);
                setFoods(updatedFoods);
            }
        }
    }
    const increaseQuantity = async () => {
        const newQuantity = quantity + 1
        console.log("New Quantity:", newQuantity); // Thêm dòng này để kiểm tra giá trị mới
        if (newQuantity >= 0) {
            setQuantity(newQuantity)
            setTotalPrice(newQuantity * pricePerItem)
            if (idPerItem) {
                setListFoodBooking((listFoodBooking) => [...listFoodBooking, idPerItem]);
                let food = await handleGetFoodById(idPerItem)
                foods.push(food)
                console.log("🚀 ~ increaseQuantity ~ foods:", foods)
                setFoods(foods)
            }
        }
    }
    return (
        <div className='w-3/5 sm:w-1/2 md:w-2/5'>
            <div className='p-3 sm:p-4 flex items-center'>
                <div className='flex w-2/3 sm:w-1/2 justify-center'>
                    <a onClick={decreaseQuantity} className='h-8 w-8 border-2 border-slate-900 rounded-full mx-2'>
                        <MinusSmallIcon />
                    </a>
                    <input className='h-8 w-8 bg-transparent text-center font-bold text-xl outline-none'
                        min={"0"}
                        type="text"
                        value={quantity}
                        readOnly
                    />
                    <a onClick={increaseQuantity} className='h-8 w-8 border-2 border-slate-900 rounded-full mx-2'>
                        <PlusSmallIcon />
                    </a>
                </div>
                <div className='ml-2 sm:ml-4 w-1/3 sm:w-1/2 text-right text-xs sm:text-2xl font-bold text-cyan-600'>
                    <span>{formatPrice(totalPrice)} <sup>đ</sup></span>

                </div>
            </div>
        </div>
    )
}
export default NumberSpinner