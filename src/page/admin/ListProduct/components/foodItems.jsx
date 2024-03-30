import React, { useState } from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import itemImg from '../../../../images/pepsi-can-bottle-ice.webp'
import format from "../../../../utils/ConvertStringFollowFormat"
import Modal from '../../../../utils/Modal'
import AdminService from '../../../../service/AdminService'
import { useNavigate } from 'react-router-dom'

const FoodItems = ({ listFood }) => {
    const { deleteFoodApi } = AdminService()

    const [modalStates, setModalStates] = useState({});
    const [allFood, setAllFood] = useState([])

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleOpenModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: true }));
    };
    const handleCloseModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: false }));
    };
    const handleDeleteFood = async (foodId) => {
        await deleteFoodApi(foodId);
        // handleGetItems(currentPage)
        const updatedFoods = allFood.filter((food) => food.foodId !== foodId);
        setModalStates((prevStates) => ({ ...prevStates, [foodId]: false }));
        setAllFood(updatedFoods);
    };
    // const handleGetItems = async (pageIndex) => {
    //     // setCurrentPage(pageIndex)
    //     setLoading("food", true)
    //     let resFood = await getFoodApi()
    //     setLoading("food", false)
    //     if (resFood && resFood.data && resFood.data.result) {
    //         setAllFood(resFood.data.result)
    //     }
    // }
    return (
        <>
            {
                listFood.map((item) => (
                    <div className='border-2 border-slate-400 rounded-xl w-full' >
                        <div className='p-1'>
                            <div className='flex'>
                                <div className='w-5/6 p-2 border-slate-300 border-2 rounded-sm'>
                                    <img className='h-28 w-full' src={item.image ? item.image : itemImg} alt="" />
                                </div>
                                <div className='w-1/6 pl-1'>
                                    <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/food/${item.foodId}`) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-cyan-100 cursor-pointer'>
                                        <PencilSquareIcon className='h-6 w-6 text-cyan-600' />
                                    </a>
                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.foodId) }} className='flex justify-center items-center w-full h-8 rounded-lg bg-red-100'>
                                        <TrashIcon className='h-6 w-6 text-red-600' />
                                    </button>
                                    <div>
                                        {modalStates[item.foodId] && (
                                            <Modal
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
                            </div>
                            <h3 className='font-bold text-lg text-gray-600 pt-4 cursor-default'>{item.name}</h3>
                            <p className='flex justify-between'>
                                <span className='text-slate-600 cursor-default'>SL: {item.quantity}</span>
                                <span className='text-slate-600 cursor-default'>{format(item.price)}<sup>đ</sup></span>
                            </p>
                        </div>
                    </div >
                ))
            }
        </>
    )
}

export default FoodItems
