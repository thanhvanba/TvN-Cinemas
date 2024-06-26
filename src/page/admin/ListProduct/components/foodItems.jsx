import React, { useContext, useState } from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import itemImg from '../../../../images/pepsi-can-bottle-ice.webp'
import format from "../../../../utils/ConvertStringFollowFormat"
import Modal from '../../../../utils/Modal'
import AdminService from '../../../../service/AdminService'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../../../context/LoginContext'

const FoodItems = ({ listFood }) => {
    const { user } = useContext(LoginContext)
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
    const handleChangeStatus = async (foodId) => {
        await deleteFoodApi(foodId);
        onChange()
    };
    return (
        <>
            {
                listFood.map((item) => (
                    <div className='border-2 border-slate-400 rounded-xl w-full' >
                        <div className='p-1 relative'>
                            <div className='flex'>
                                <div className='w-5/6 border-slate-300 border-2 rounded-md'>
                                    <img className='h-28 w-full rounded-md' src={item.image ? item.image : itemImg} alt="" />
                                </div>
                                {user.role === "ADMIN" &&
                                    <div className='w-1/6 pl-1'>
                                        <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/food/${item.foodId}`) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-cyan-100 cursor-pointer'>
                                            <PencilSquareIcon className='h-6 w-6 text-cyan-600' />
                                        </a>
                                        <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.foodId) }} className='flex justify-center items-center w-full h-8 rounded-lg bg-red-100'>
                                            <PowerIcon className='h-6 w-6 text-red-600' />
                                        </button>
                                        <div>
                                            {modalStates[item.foodId] && (
                                                <Modal
                                                    isOpen={modalStates[item.foodId]}
                                                    onClose={() => handleCloseModal(item.foodId)}
                                                    onConfirm={() => handleChangeStatus(item.foodId)}
                                                    onCancel={() => handleCloseModal(item.foodId)}
                                                    title={item.status ? 'Xóa sản phẩm' : 'Khôi phục sản phẩm'}
                                                    content={item.status ? 'Bạn có chắc chắn xóa sản phẩm này ???' : 'Bạn có chắc chắn khôi phục sản phẩm này ???'}
                                                    buttonName={item.status ? 'Xóa' : 'Khôi phục'}
                                                    buttonCancel='Thoát'
                                                />
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                            <h3 className='font-bold text-lg text-gray-600 pt-2 cursor-default'>{item.name}</h3>

                            <p className={`${user.role === "ADMIN" ? "absolute bottom-2 right-1" : "flex justify-between"}`}>
                                {user.role !== "ADMIN" && <span className='text-slate-600 cursor-default'>SL: {item.quantity}</span>}
                                <span className='text-slate-600 cursor-default text-end'>{format(item.price)}<sup>đ</sup></span>
                            </p>
                        </div>
                    </div >
                ))
            }
        </>
    )
}

export default FoodItems
